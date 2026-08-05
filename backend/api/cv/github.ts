import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../src/lib/supabase';

// Simple in-memory cache to stay within GitHub's rate limits
interface CacheEntry {
  data: any;
  timestamp: number;
}
const cache: Record<string, CacheEntry> = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // 1. Get username from query or retrieve active configured github_username from DB
  let username = req.query.username as string | undefined;

  try {
    if (!username) {
      const { data } = await supabase
        .from('app_settings')
        .select('github_username')
        .eq('id', 1)
        .single();
      username = data?.github_username || 'ikiere';
    }

    if (!username) {
      return res.status(400).json({ success: false, message: 'No GitHub username configured' });
    }

    const cleanUsername = username.trim().toLowerCase();

    // Check in-memory cache
    const cached = cache[cleanUsername];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.status(200).json({ success: true, data: cached.data });
    }

    // Prepare request headers (include user agent as required by GitHub API)
    const headers: Record<string, string> = {
      'User-Agent': 'Zerocoded-Agency-CV-Generator',
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user profile from GitHub
    const profileRes = await fetch(`https://api.github.com/users/${cleanUsername}`, { headers });
    if (!profileRes.ok) {
      throw new Error(`Failed to fetch GitHub profile: ${profileRes.statusText}`);
    }
    const profile = (await profileRes.json()) as any;

    // Fetch public repos from GitHub
    const reposRes = await fetch(`https://api.github.com/users/${cleanUsername}/repos?per_page=100`, { headers });
    let repos: any[] = [];
    if (reposRes.ok) {
      repos = (await reposRes.json()) as any[];
    }

    // Calculate language frequencies
    const languageCounts: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    // Sort languages by count
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang)
      .slice(0, 8); // Top 8 languages

    // Map projects (repositories)
    const featuredProjects = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
      .slice(0, 6) // Top 6 repositories
      .map((repo) => ({
        name: repo.name,
        description: repo.description || 'No description provided.',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        language: repo.language || 'Code',
      }));

    const parsedData = {
      name: profile.name || profile.login,
      avatarUrl: profile.avatar_url,
      bio: profile.bio || 'Professional Developer and craftsperson.',
      location: profile.location || 'Remote',
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
      blog: profile.blog || '',
      htmlUrl: profile.html_url,
      topLanguages,
      projects: featuredProjects,
    };

    // Store in cache
    cache[cleanUsername] = {
      data: parsedData,
      timestamp: Date.now(),
    };

    return res.status(200).json({ success: true, data: parsedData });
  } catch (err: any) {
    console.error('[github-cv] Error generating CV:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate CV from GitHub profile data. Please verify your username.',
    });
  }
}
