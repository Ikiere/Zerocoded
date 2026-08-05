interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://zerocoded.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function buildSEOMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
}: SEOMeta) {
  const fullTitle = title.includes('Zerocoded') ? title : `${title} | Zerocoded`;
  return { fullTitle, description, image, url, type };
}

export const defaultSEO: SEOMeta = {
  title: 'Zerocoded — Premium Digital Product Agency',
  description:
    'Zerocoded is a premium digital studio building websites, web apps, and mobile apps that help brands grow, stand out, and lead the future.',
  image: DEFAULT_IMAGE,
  url: SITE_URL,
  type: 'website',
};
