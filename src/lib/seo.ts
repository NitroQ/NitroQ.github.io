import { SITE } from './site';
import { WORK } from './experience';

/**
 * JSON-LD graph builders. Everything returns plain objects so pages can compose
 * them into a single `@graph` — one script tag, one parse, consistent entities
 * across the site.
 */

export type Crumb = { name: string; href?: string };

/** Used to label path segments in auto-generated breadcrumbs. */
const SEGMENT_LABELS: Record<string, string> = {
	projects: 'Projects',
	blog: 'Notebook',
	experience: 'Experience',
	about: 'About',
};

export const personSchema = (url: string) => ({
	'@type': 'Person',
	'@id': `${url}#person`,
	name: SITE.fullName,
	alternateName: SITE.handle,
	jobTitle: SITE.role,
	description: SITE.description,
	url,
	sameAs: SITE.social.map((s) => s.href),
	email: `mailto:${SITE.email}`,
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Quezon City',
		addressCountry: 'PH',
	},
	alumniOf: [
		{ '@type': 'CollegeOrUniversity', name: 'National University — Manila' },
		{ '@type': 'CollegeOrUniversity', name: 'Asian Institute of Computer Studies — Commonwealth' },
	],
	hasCredential: [
		{
			'@type': 'EducationalOccupationalCredential',
			name: 'BS Information Technology, Major in Mobile and Web Applications',
			credentialCategory: 'degree',
			dateCreated: '2024',
			recognizedBy: { '@type': 'CollegeOrUniversity', name: 'National University — Manila' },
		},
	],
	knowsAbout: [
		'Laravel',
		'PHP',
		'Java',
		'JavaScript',
		'TypeScript',
		'React',
		'Angular',
		'Svelte',
		'Flutter',
		'Dart',
		'Kotlin',
		'Node.js',
		'Express',
		'Python',
		'Django',
		'ASP.NET MVC',
		'Spring Boot',
		'PostgreSQL',
		'MySQL',
		'MariaDB',
		'SQLite',
		'MongoDB',
		'Firebase',
		'Redis',
		'Tailwind CSS',
		'UI/UX design',
		'Figma',
		'Adobe Photoshop',
		'Docker',
		'NGINX',
		'AWS',
		'Azure',
		'CI/CD',
		'Search engine optimisation',
		'Network administration',
		'Android ROM development',
	],
});

export const websiteSchema = (url: string) => ({
	'@type': 'WebSite',
	'@id': `${url}#website`,
	name: SITE.shortTitle,
	alternateName: SITE.title,
	description: SITE.description,
	url,
	language: 'en',
	// The person is the author of everything here, so credit them at the root.
	author: { '@id': `${url}#person` },
});

export const profilePageSchema = (url: string) => {
	const roles = WORK.map((entry, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		item: {
			'@type': 'OrganizationRole',
			roleName: entry.role,
			organization: { '@type': 'Organization', name: entry.org },
			description: entry.summary,
		},
	}));

	return {
		'@type': 'ProfilePage',
		'@id': `${url}#webpage`,
		url,
		name: `${SITE.fullName} — Experience`,
		isPartOf: { '@id': `${url}#website` },
		about: { '@id': `${url}#person` },
		mainEntity: { '@type': 'ItemList', itemListElement: roles },
	};
};

export const breadcrumbSchema = (url: string, crumbs: Crumb[]) => ({
	'@type': 'BreadcrumbList',
	'@id': `${url}#breadcrumb`,
	itemListElement: crumbs.map((crumb, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: crumb.name,
		...(crumb.href ? { item: new URL(crumb.href, url).href } : {}),
	})),
});

export const blogPostingSchema = (
	url: string,
	post: { title: string; description: string; pubDate: Date; updatedDate?: Date; tags: string[]; words: number },
) => ({
	'@type': 'BlogPosting',
	'@id': `${url}#post`,
	headline: post.title,
	description: post.description,
	datePublished: post.pubDate.toISOString(),
	dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
	wordCount: post.words,
	keywords: post.tags.join(', '),
	inLanguage: 'en',
	mainEntityOfPage: { '@type': 'WebPage', '@id': url },
	author: { '@id': `${url}#person` },
	publisher: { '@id': `${url}#person` },
	image: new URL('/og.jpg', url).href,
	isPartOf: { '@id': `${url}#website` },
});

export const projectSchema = (
	url: string,
	project: { title: string; summary: string; repo: string; stack: string[]; year: number },
) => ({
	'@type': 'SoftwareSourceCode',
	'@id': `${url}#source`,
	name: project.title,
	description: project.summary,
	programmingLanguage: project.stack,
	dateCreated: String(project.year),
	codeRepository: `https://github.com/${SITE.githubUser}/${project.repo}`,
	url,
	author: { '@id': `${url}#person` },
});

/**
 * Derive a breadcrumb trail from the current path. The last crumb is the page
 * itself and carries no href, matching how Google expects a trail to terminate.
 */
export const crumbsFromPath = (
	pathname: string,
	base: string,
): Crumb[] => {
	const path = pathname.replace(base, '/').replace(/^\/|\/$/g, '');
	if (!path) return [];

	const parts = path.split('/');
	return parts.map((part, i) => {
		const href = `/${parts.slice(0, i + 1).join('/')}/`;
		const name = SEGMENT_LABELS[part] ??
			part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
		return { name, href };
	});
};