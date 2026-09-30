// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const GH_USER = 'NitroQ';
// The site is published from the user page repo, so it is served from the
// domain root. Set SITE_REPO if you ever move it to a project repo — a project
// repo is served from a sub-path and `base` has to carry the repo name.
const REPO = process.env.SITE_REPO ?? `${GH_USER}.github.io`;

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
