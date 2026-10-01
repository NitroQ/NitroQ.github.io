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
	fullName: 'Frank Vincent Gesmundo',
	shortTitle: 'NITROQ.DEV',
	handle: 'NitroQ',
	role: 'Full Stack Web & Mobile Developer',
	tags: ['UI/UX Design', 'IT Administration'],
	tagline: 'I build offline-first tools that keep your data on your machine.',
	description:
		'Portfolio of Frank Vincent Gesmundo — full stack web and mobile developer, UI/UX designer and IT administrator, building with Laravel, Flutter, Java and the web platform.',
	location: 'Quezon City, Philippines',
	email: 'frankvgesmundo@gmail.com',
	githubUser: 'NitroQ',
	repo: 'NitroQ.github.io',
	// Add more entries here and they appear in the header, footer and command palette.
	social: [
		{ label: 'GitHub', handle: 'NitroQ', href: 'https://github.com/NitroQ' },
		{ label: 'Twitter', handle: '@FrankGesmundo', href: 'https://twitter.com/FrankGesmundo' },
		{ label: 'Email', handle: 'frankvgesmundo@gmail.com', href: 'mailto:frankvgesmundo@gmail.com' },
	],
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects/' },
		{ label: 'Experience', href: '/experience/' },
		{ label: 'Blog', href: '/blog/' },
		{ label: 'About', href: '/about/' },
	],
} as const;

/** What the cabinet boots up to. Drives the hero, the marquee and the OG tags. */
export const HERO = {
	eyebrow: 'PLAYER ONE',
	lines: ['FRANK', 'GESMUNDO'],
	blurb:
		'Full stack web and mobile developer, UI/UX designer and IT administrator. Ten years of shipping — Laravel, Flutter, Java and the network plumbing underneath.',
	stats: [
		{ label: 'Years coding', value: `${new Date().getFullYear() - 2016}` },
		{ label: 'Roles held', value: '7' },
		{ label: 'Projects', value: '15+' },
	],
} as const;

export const MARQUEE = [
	'LARAVEL',
	'PHP',
	'REACT',
	'FLUTTER',
	'JAVASCRIPT',
	'TYPESCRIPT',
	'ANGULAR',
	'NODE.JS',
	'PYTHON',
	'JAVA',
	'MYSQL',
	'MONGODB',
	'DOCKER',
	'FIGMA',
	'UI/UX',
] as const;

export const SKILLS = [
	{
		group: 'Backend',
		sprite: 'chip',
		items: [
			'PHP',
			'Laravel',
			'Java',
			'Spring Boot',
			'Node.js',
			'Express',
			'Python',
			'Django',
			'ASP.NET MVC',
			'REST APIs',
		],
	},
	{
		group: 'Frontend',
		sprite: 'ghost',
		items: [
			'JavaScript',
			'TypeScript',
			'React',
			'Vue',
			'Svelte',
			'Angular',
			'Vite',
			'Redux',
			'Blade',
			'Tailwind CSS',
			'Bootstrap',
			'jQuery',
		],
	},
	{
		group: 'Mobile',
		sprite: 'bolt',
		items: ['Dart', 'Flutter', 'Java', 'Kotlin', 'Android', 'Swift'],
	},
	{
		group: 'Data',
		sprite: 'coin',
		items: [
			'MySQL',
			'MariaDB',
			'PostgreSQL',
			'SQL Server',
			'SQLite',
			'MongoDB',
			'Redis',
			'Firebase',
		],
	},
	{
		group: 'Design',
		sprite: 'heart',
		items: [
			'Figma',
			'Photoshop',
			'Illustrator',
			'After Effects',
			'Premiere Pro',
			'Canva',
			'Wireframing',
			'Storyboarding',
		],
	},
	{
		group: 'Platform',
		sprite: 'star',
		items: [
			'Docker',
			'NGINX',
			'Apache',
			'AWS',
			'Azure',
			'cPanel',
			'Git',
			'GitHub Actions',
			'GitLab CI',
		],
	},
] as const;
