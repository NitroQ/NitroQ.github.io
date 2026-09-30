import cache from '../data/github.json';

export type RepoMeta = {
	stars: number;
	language: string | null;
	topics: string[];
	pushedAt: string | null;
	openIssues: number;
	license: string | null;
};

const repos = cache as Record<string, RepoMeta>;

/** Live repo stats, cached at build time by `scripts/sync-github.mjs`. */
export const repoMeta = (name: string): RepoMeta | null => repos[name] ?? null;
