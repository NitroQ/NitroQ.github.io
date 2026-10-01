import type { APIRoute } from 'astro';

/**
 * Generated rather than a static file so the sitemap URL always matches the
 * configured `site` — a hardcoded one silently breaks when the domain changes.
 */
export const GET: APIRoute = ({ site }) => {
	const origin = (site ?? new URL('https://nitroq.github.io')).origin;
	const sitemap = new URL('sitemap-index.xml', `${origin}/`).href;

	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${sitemap}`,
		'',
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};