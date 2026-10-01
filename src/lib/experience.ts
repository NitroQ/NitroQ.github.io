/**
 * Experience records, transcribed from `resume_data.md` in the old
 * `personal-website` repo. Phone number and character references are
 * deliberately left out — this site is public.
 */

export type Experience = {
	org: string;
	role: string;
	period: string;
	location: string;
	summary: string;
	highlights: string[];
	stack: string[];
	sprite: 'coin' | 'crab' | 'ghost' | 'star' | 'heart' | 'bolt' | 'chip';
	accent: 'phos' | 'amber' | 'hot' | 'cyan' | 'violet';
	current?: boolean;
};

export const WORK: Experience[] = [
	{
		org: 'Veyoung Beauty',
		role: 'Part-Time Marketing Manager',
		period: 'Jun 2022 — present',
		location: 'Philippines',
		current: true,
		summary:
			'Run the company’s web presence and paid campaigns end to end — the site, the social accounts, and the numbers behind both.',
		highlights: [
			'Built and deploy the company website on Laravel, with search engine optimisation as a requirement rather than an afterthought.',
			'Run paid campaigns across Meta Business Suite and Google Ads (YouTube and Search).',
			'Read ad performance and target-market data, then turn it into promo recommendations instead of guessing.',
			'Produce the marketing materials and keep every channel posting.',
		],
		stack: ['Laravel 5.2 – 8', 'PHP', 'jQuery', 'MySQL', 'Bootstrap', 'Meta Ads', 'Google Ads', 'SEO'],
		sprite: 'heart',
		accent: 'hot',
	},
	{
		org: 'Studio 9 Lives Animation Studios',
		role: 'IT Intern → Part-Time IT Consultant',
		period: 'Dec 2023 — present',
		location: 'Philippines',
		current: true,
		summary:
			'The person who keeps a studio running. Networks, workstations, servers, and the hardware artists actually depend on.',
		highlights: [
			'Manage the studio network — wiring, setup and the switches that keep renders moving.',
			'Deploy workstations and drawing tablets, and repair machines when they die mid-project.',
			'Administer TrueNAS, OPNsense and Windows Server.',
			'Handle procurement: source and spec the equipment the studio needs next.',
		],
		stack: ['Networking', 'TrueNAS', 'OPNsense', 'Windows Server', 'Workstations', 'Hardware servicing'],
		sprite: 'chip',
		accent: 'phos',
	},
	{
		org: 'SM Retail Inc.',
		role: 'Web Application Development Intern',
		period: 'Mar — Jun 2024',
		location: 'Philippines',
		summary:
			'An experimental project to take case management off the IT department’s plate, built and justified from first principles.',
		highlights: [
			'Digitalised the case management process as an experimental project deliberately routed away from the IT department.',
			'Analysed the existing process and mapped it with swim-lane flow charts.',
			'Coordinated with the AVPs involved to verify the process, and with IT for server resources and a stack that would deploy easily.',
			'Built the Laravel application and deployed it on a local server for internal use.',
		],
		stack: ['Laravel 10', 'PHP', 'MariaDB', 'Tailwind CSS', 'JavaScript', 'Flow charting'],
		sprite: 'ghost',
		accent: 'violet',
	},
	{
		org: 'Freelance',
		role: 'Full Stack Web Developer',
		period: 'Jan 2022 — Dec 2023',
		location: 'Remote',
		summary:
			'Client work across the stack — build it, scope it, review it, and find the bug nobody else had time to chase.',
		highlights: [
			'Delivered projects for companies, thesis work and school projects, on turnaround times short enough to matter.',
			'Client coordination and thesis counselling, often as the person translating between a brief and whoever was building.',
			'Technical consultations, code reviews, penetration testing and bug hunting.',
			'Design work too: logos, websites, presentations and storyboards.',
		],
		stack: [
			'Full Stack',
			'Laravel',
			'PHP',
			'JavaScript',
			'Code review',
			'Penetration testing',
		],
		sprite: 'coin',
		accent: 'amber',
	},
	{
		org: 'Agora IT Solutions',
		role: 'Junior Web Developer',
		period: 'Mar — Dec 2021',
		location: 'Philippines',
		summary:
			'First professional web role — the full arc from a blank page to a client presentation.',
		highlights: [
			'Storyboarding and wireframing before a line of code.',
			'Full stack development on Laravel, plus quality assurance and deployment.',
			'Competitor research, client presentations and proposals.',
			'Write-ups and documentation — the part nobody teaches you and everybody needs.',
		],
		stack: ['Laravel', 'PHP', 'MySQL', 'Storyboarding', 'Wireframing', 'QA'],
		sprite: 'star',
		accent: 'cyan',
	},
	{
		org: 'Citigobal Real Estate and Development',
		role: 'IT Intern',
		period: 'Jan — Nov 2020',
		location: 'Philippines',
		summary:
			'Everything that keeps a small real estate office running, from the contractor database to the router in the back room.',
		highlights: [
			'Created the database of active contractors.',
			'Prepared legal documents and company forms — purchase orders, requests.',
			'Posted job openings across Facebook, Jobstreet, BestJobs and Indeed, and organised the applications.',
			'IT maintenance, wiring and router setup, computer diagnostics.',
		],
		stack: ['Database design', 'IT support', 'Networking', 'Documentation'],
		sprite: 'bolt',
		accent: 'amber',
	},
	{
		org: 'XDA Developers Forum',
		role: 'Senior Member — Android Hobbyist / QA Tester',
		period: 'Nov 2016 — inactive',
		location: 'Remote',
		summary:
			'Where it started. Customising, testing and eventually writing ROMs — the first place I broke other people’s phones on purpose.',
		highlights: [
			'Customised lock screens, boot logo animations and UI elements.',
			'Android ROM development: reproduce bugs, fix them, and publish patches.',
			'QA testing — finding the edge cases before users did.',
		],
		stack: ['Android', 'ROM development', 'QA testing', 'Customisation'],
		sprite: 'ghost',
		accent: 'violet',
	},
];

export type Education = {
	school: string;
	degree: string;
	location: string;
	period: string;
	honours: string[];
	notes: string[];
};

export const EDUCATION: Education[] = [
	{
		school: 'National University — Manila',
		degree: 'BS Information Technology',
		location: 'Major in Mobile and Web Applications',
		period: '2024',
		honours: ['SM Foundation Scholar', 'Magna Cum Laude'],
		notes: [
			'Dean’s Lister every year from 2020 to 2024.',
			'Thesis: the National University Research and Development Information System — led a team of five and supported 120+ users across NU Philippines.',
		],
	},
	{
		school: 'Asian Institute of Computer Studies — Commonwealth',
		degree: 'Senior High School — TVL Information Communication Technologies',
		location: 'Philippines',
		period: '2020',
		honours: ['Valedictorian'],
		notes: [
			'Publication Recognition from the Research Advisory Board, 2023.',
			'Science Student Writer for the school paper, Wordsmiths, 2019.',
		],
	},
];

export type Award = {
	title: string;
	issuer: string;
	year: string;
	note?: string;
};

export const AWARDS: Award[] = [
	{
		title: 'Top 7 Finalist',
		issuer: 'ADMU Bluehacks — DRRM 48-hour Hackathon',
		year: '2021',
		note: 'CodeJuan, a disaster risk reduction information system.',
	},
	{
		title: 'Consistent Dean’s Lister',
		issuer: 'National University — Manila',
		year: '2020 — 2024',
	},
	{
		title: 'Valedictorian',
		issuer: 'Asian Institute of Computer Studies — Commonwealth',
		year: '2020',
	},
	{
		title: 'Organizational Recognition — President',
		issuer: 'NU Junior Philippine Computer Society',
		year: '2022',
	},
	{
		title: 'Publication Recognition',
		issuer: 'Asian Institute of Computer Studies — Research Advisory Board',
		year: '2023',
	},
	{
		title: 'Participation Recognition — Science Student Writer',
		issuer: 'Wordsmiths School Paper',
		year: '2019',
	},
];

/** Roles currently held, for the summary counters on /experience/. */
export const CURRENT_ROLES = WORK.filter((w) => w.current).length;

/** Career span, anchored to the earliest role in the resume. */
export const SINCE = 2016;