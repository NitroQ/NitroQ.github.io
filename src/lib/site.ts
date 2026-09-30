export type PaletteItem = {
	label: string;
	href: string;
	group: string;
	meta?: string;
};

/** Prefix an internal path with Astro's `base` so links work on GitHub Pages. */
export const withBase = (path: string): string => {
	const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
	return `${base}${path.startsWith('/') ? path : `/${path}`}` || '/';
};

export const SITE = {
	title: 'FRANK GESMUNDO',
	shortTitle: 'NITROQ.DEV',
	handle: 'NitroQ',
	role: 'Full Stack Mobile & Web Developer',
	tagline: 'I build offline-first tools that keep your data on your machine.',
	description:
		'Portfolio and notebook of Frank Gesmundo — full stack mobile and web developer building Rust, Tauri, Laravel and TypeScript applications.',
	location: 'Rodriguez, Philippines',
	company: 'National University',
	githubUser: 'NitroQ',
	repo: 'personal-site',
	// Add more entries here and they appear in the header, footer and command palette.
	social: [
		{ label: 'GitHub', handle: 'NitroQ', href: 'https://github.com/NitroQ' },
		{ label: 'Twitter', handle: '@FrankGesmundo', href: 'https://twitter.com/FrankGesmundo' },
	],
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects/' },
		{ label: 'Blog', href: '/blog/' },
		{ label: 'About', href: '/about/' },
	],
} as const;

/** What the cabinet boots up to. Drives the hero, the marquee and the OG tags. */
export const HERO = {
	eyebrow: 'PLAYER ONE',
	lines: ['FRANK', 'GESMUNDO'],
	blurb:
		'Full stack mobile and web developer. I like offline-first architecture, local AI inference, and interfaces that feel like hardware.',
	stats: [
		{ label: 'Repos', value: '24' },
		{ label: 'Projects shipped', value: '10+' },
		{ label: 'Years coding', value: '9' },
	],
} as const;

export const MARQUEE = [
	'RUST',
	'TAURI',
	'LARAVEL',
	'REACT',
	'TYPESCRIPT',
	'PHP',
	'DART',
	'JAVA',
	'POSTGRES',
	'DOCKER',
	'LOCAL-FIRST',
	'AGPL',
] as const;

export const SKILLS = [
	{
		group: 'Systems',
		sprite: 'chip',
		items: ['Rust', 'Tauri 2', 'SQLite', 'PostgreSQL', 'Tokio', 'Python'],
	},
	{
		group: 'Web',
		sprite: 'ghost',
		items: ['TypeScript', 'React', 'Astro', 'Laravel', 'Blade', 'Tailwind'],
	},
	{
		group: 'Mobile',
		sprite: 'bolt',
		items: ['Dart', 'Flutter', 'Android', 'Kotlin', 'Swift'],
	},
	{
		group: 'Platform',
		sprite: 'star',
		items: ['Docker', 'GitHub Actions', 'Linux', 'Nginx', 'Composer'],
	},
] as const;

export const TIMELINE = [
	{
		period: '2023 — now',
		title: 'National University',
		body: 'Building internal tooling and web platforms. Shipping desktop applications in Rust and Tauri, plus Laravel services that stay boring and dependable.',
	},
	{
		period: '2021 — 2023',
		title: 'Full stack, freelance & school projects',
		body: 'A decade of shipping: Java Swing desk apps for school, Angular and Laravel client work, and the first Flutter experiments. Learned to scope, and to finish.',
	},
	{
		period: '2017 — start',
		title: 'First commit',
		body: 'Started with Java, moved through PHP and JavaScript, and kept landing on the same problem: making software that respects the person using it.',
	},
] as const;
