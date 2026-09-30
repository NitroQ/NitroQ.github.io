// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const GH_USER = 'NitroQ';
const REPO = process.env.SITE_REPO ?? 'personal-site';

// A user/organisation repo (NitroQ.github.io) is served from the domain root.
// Every other repo is served from a sub-path, so `base` must carry the repo name.
const base =
	process.env.SITE_BASE ?? (REPO === `${GH_USER}.github.io` ? '/' : `/${REPO}/`);

const site = process.env.SITE_URL ?? `https://${GH_USER.toLowerCase()}.github.io`;

// https://astro.build/config
export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	build: { format: 'directory' },
	integrations: [sitemap()],
	vite: { plugins: [tailwindcss()] },
});
