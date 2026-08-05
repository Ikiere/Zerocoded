import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Github, Link as LinkIcon, MapPin, Users, Folder, Cpu, FileText } from 'lucide-react';
import api from '@/lib/axios';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface GithubCVData {
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  publicRepos: number;
  blog: string;
  htmlUrl: string;
  topLanguages: string[];
  projects: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    url: string;
    language: string;
  }[];
}

interface AppSettings {
  github_username: string;
  use_github_cv: boolean;
  custom_cv_url: string;
  business_cert_url: string;
}

export default function CV() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [cvData, setCvData] = useState<GithubCVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Fetch settings
        const settingsRes = await api.get('/api/settings');
        const activeSettings = settingsRes.data?.data as AppSettings;
        setSettings(activeSettings);

        // 2. Fetch GitHub data if configured to use GitHub CV
        if (activeSettings?.use_github_cv) {
          const cvRes = await api.get(`/api/cv/github?username=${activeSettings.github_username}`);
          setCvData(cvRes.data?.data);
        }
      } catch (err: any) {
        console.error('Error fetching CV details:', err);
        setError('Failed to load CV information.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const showCustomCVOnly = settings && !settings.use_github_cv;

  return (
    <>
      <Helmet>
        <title>Curriculum Vitae — Zerocoded</title>
        <meta name="description" content="View and download professional CV and developer credentials dynamically compiled from GitHub." />
      </Helmet>

      <section className="section-padding bg-surface dark:bg-slate-950 min-h-screen">
        <div className="container-custom max-w-4xl">
          
          {/* Header Action Bar */}
          <div className="flex justify-between items-center mb-8 gap-4 border-b border-border pb-6 print:hidden">
            <div>
              <h1 className="text-2xl font-bold text-secondary dark:text-white">Curriculum Vitae</h1>
              <p className="text-xs text-muted">Dynamically updated credentials</p>
            </div>
            <div className="flex gap-3">
              {settings?.custom_cv_url && (
                <a href={settings.custom_cv_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <FileText size={14} />
                    Download PDF CV
                  </Button>
                </a>
              )}
              {settings?.use_github_cv && cvData && (
                <Button variant="primary" size="sm" onClick={handlePrint} className="flex items-center gap-1.5">
                  <Download size={14} />
                  Print CV
                </Button>
              )}
            </div>
          </div>

          {/* Render Custom PDF CV Alert/Frame */}
          {showCustomCVOnly && (
            <AnimatedSection>
              <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-8 text-center shadow-soft">
                <FileText size={48} className="text-primary mx-auto mb-4" />
                <h2 className="text-xl font-bold text-secondary dark:text-white mb-2">Custom CV Available</h2>
                <p className="text-sm text-muted mb-6 max-w-md mx-auto">
                  A professional, customized Curriculum Vitae is available for download. Click the button below to view or save the PDF.
                </p>
                {settings?.custom_cv_url ? (
                  <a href={settings.custom_cv_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto shadow-primary">
                      <Download size={16} />
                      Download Curriculum Vitae (PDF)
                    </Button>
                  </a>
                ) : (
                  <p className="text-xs text-danger">No custom CV file URL configured by admin.</p>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Render dynamic GitHub CV */}
          {settings?.use_github_cv && cvData && (
            <AnimatedSection className="bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-soft p-8 md:p-12 print:shadow-none print:border-none print:p-0">
              {/* Header profile info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-border pb-8 mb-8">
                {cvData.avatarUrl && (
                  <img
                    src={cvData.avatarUrl}
                    alt={cvData.name}
                    className="w-24 h-24 rounded-2xl border border-border bg-slate-100 object-cover shrink-0 shadow-sm"
                  />
                )}
                <div className="text-center md:text-left flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-1.5">{cvData.name}</h2>
                  <p className="text-sm font-semibold text-primary mb-3">Senior Software Engineer & Tech Architect</p>
                  <p className="text-sm text-muted leading-relaxed mb-4 max-w-xl">{cvData.bio}</p>
                  
                  {/* Details strip */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-primary" />
                      {cvData.location}
                    </span>
                    {cvData.blog && (
                      <a href={cvData.blog.startsWith('http') ? cvData.blog : `https://${cvData.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <LinkIcon size={13} className="text-primary" />
                        {cvData.blog}
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-primary" />
                      {cvData.followers} Followers
                    </span>
                    <a href={cvData.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Github size={13} className="text-primary" />
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Languages / Skills */}
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <Cpu size={14} />
                  Top Technical Expertise (GitHub)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cvData.topLanguages.map((lang) => (
                    <Badge key={lang} variant="primary" size="md">{lang}</Badge>
                  ))}
                  {cvData.topLanguages.length === 0 && (
                    <span className="text-xs text-muted">Languages information not found.</span>
                  )}
                </div>
              </div>

              {/* Repositories / Projects */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <Folder size={14} />
                  Highlighted Open Source Repositories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.projects.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-xl border border-border bg-surface dark:bg-slate-950 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-bold text-secondary dark:text-white group-hover:text-primary transition-colors truncate pr-2">
                          {repo.name}
                        </h4>
                        <span className="text-2xs font-semibold px-2 py-0.5 rounded bg-primary/8 text-primary uppercase tracking-wide">
                          {repo.language}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3 h-8">
                        {repo.description}
                      </p>
                      <div className="flex gap-4 text-2xs text-muted">
                        <span>★ {repo.stars} Stars</span>
                        <span>⑂ {repo.forks} Forks</span>
                      </div>
                    </a>
                  ))}
                  {cvData.projects.length === 0 && (
                    <p className="text-xs text-muted col-span-2">No public projects found.</p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}

          {error && (
            <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 text-center mt-6">
              <p className="text-sm text-danger">{error}</p>
              {settings?.custom_cv_url && (
                <a href={settings.custom_cv_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3">
                  <Button variant="outline" size="sm">Download Custom PDF CV</Button>
                </a>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
