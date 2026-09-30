/**
 * Pulls live stats for every repo referenced by a project entry and caches them
 * to `src/data/github.json`, so builds stay fast and rate-limit safe.
 *
 * Set `GITHUB_TOKEN` (a public, no-scope token is enough) to raise the rate
 * limit from 60 to 5000 requests an hour. Any failure is non-fatal: the build
 * falls back to whatever is already cached.
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(import.meta.dirname, '..');
const PROJECTS_DIR = path.join(ROOT, 'src', 'content', 'projects');
const OUT = path.join(ROOT, 'src', 'data', 'github.json');
const OWNER = 'NitroQ';

async function referencedRepos() {
	if (!existsSync(PROJECTS_DIR)) return [];

	const files = (await readdir(PROJECTS_DIR)).filter((f) => f.endsWith('.md'));
	const names = new Set();

	for (const file of files) {
		const text = await readFile(path.join(PROJECTS_DIR, file), 'utf8');
		const match = text.match(/^repo:\s*["']?([\w.-]+)["']?\s*$/m);
		if (match?.[1]) names.add(match[1]);
	}

	return [...names];
}

const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const headers = {
	Accept: 'application/vnd.github+json',
	'User-Agent': 'nitroq-personal-site',
	...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const cached = existsSync(OUT)
	? JSON.parse(await readFile(OUT, 'utf8'))
	: {};
const next = { ...cached };

for (const name of await referencedRepos()) {
	try {
		const res = await fetch(`https://api.github.com/repos/${OWNER}/${name}`, { headers });

		if (!res.ok) {
			console.warn(`  github: ${name} -> HTTP ${res.status}`);
			continue;
		}

		const repo = await res.json();
		next[name] = {
			stars: repo.stargazers_count ?? 0,
			language: repo.language ?? null,
			topics: repo.topics ?? [],
			pushedAt: repo.pushed_at ?? null,
			openIssues: repo.open_issues_count ?? 0,
			license: repo.license?.spdx_id ?? null,
		};
	} catch (error) {
		console.warn(`  github: ${name} -> ${error.message}`);
	}
}

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(next, null, '\t')}\n`);

console.log(`github: cached ${Object.keys(next).length} repo(s)`);
