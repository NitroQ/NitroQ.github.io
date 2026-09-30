import { animate, hover, inView, scroll, stagger } from 'motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*+=<>';

/** Arcade easing: overshoots slightly, then settles. */
const SNAP = [0.16, 1, 0.3, 1] as const;

const reduced = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ boot */

/**
 * The cabinet powers on: a ROM-loading bar fills in hard steps, the status line
 * cycles, then the screen collapses away in stair-stepped slices.
 */
function boot() {
	const overlay = document.querySelector<HTMLElement>('[data-boot]');
	if (!overlay) return Promise.resolve();

	const fill = overlay.querySelector<HTMLElement>('[data-boot-fill]');
	const status = overlay.querySelector<HTMLElement>('[data-boot-status]');
	const lines = ['MOUNTING /dev/rom0', 'LOADING SPRITES', 'CALIBRATING CRT', 'READY'];

	if (reduced()) {
		overlay.remove();
		return Promise.resolve();
	}

	return new Promise<void>((resolve) => {
		let line = 0;
		const cycle = window.setInterval(() => {
			if (status) status.textContent = lines[line] ?? 'READY';
			line += 1;
			if (line >= lines.length) window.clearInterval(cycle);
		}, 190);

		animate(
			fill ?? [],
			{ scaleX: [0, 1] },
			{ duration: 0.78, ease: 'steps(12, end)' },
		).then(() => {
			window.clearInterval(cycle);
			if (status) status.textContent = 'READY';
			animate(
				overlay,
				{ clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'] },
				{ duration: 0.4, ease: 'steps(7, end)' },
			).then(() => {
				overlay.remove();
				resolve();
			});
		});
	});
}

/* ---------------------------------------------------------------- decode */

/** Attract-mode text scramble: glyphs flicker into place, left to right. */
function decode() {
	document.querySelectorAll<HTMLElement>('[data-decode]').forEach((el) => {
		const target = el.dataset.text ?? el.textContent ?? '';
		if (!target) return;
		if (reduced()) {
			el.textContent = target;
			return;
		}

		const duration = 780;
		const start = performance.now();

		const frame = (now: number) => {
			const p = Math.min(1, (now - start) / duration);
			const settled = Math.floor(target.length * p);
			let out = '';
			for (let i = 0; i < target.length; i++) {
				const ch = target[i] as string;
				out +=
					i < settled || ch === ' '
						? ch
						: GLYPHS[(Math.random() * GLYPHS.length) | 0];
			}
			el.textContent = out;
			if (p < 1) requestAnimationFrame(frame);
		};

		el.textContent = '';
		requestAnimationFrame(frame);
	});
}

/* --------------------------------------------------------------- reveals */

/** `[data-reveal]` fades up as it enters the viewport. */
function reveals() {
	// Nothing was hidden in the first place, so there is nothing to reveal.
	if (reduced()) {
		document.documentElement.classList.remove('js-motion');
		return;
	}

	// Fire as soon as any part of the element crosses the line, nudged slightly
	// late so the animation lands after the scroll rather than during it.
	const view = { amount: 'some' as const, margin: '0px 0px -8% 0px' };

	document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
		const kids = group.querySelectorAll<HTMLElement>('[data-reveal]');
		if (!kids.length) return;
		inView(
			group,
			() => {
				animate(
					kids,
					{ opacity: [0, 1], y: [20, 0] },
					{ duration: 0.45, delay: stagger(0.055), ease: SNAP },
				);
			},
			view,
		);
	});

	document
		.querySelectorAll<HTMLElement>('[data-reveal]:not([data-enter])')
		.forEach((el) => {
			if (el.closest('[data-reveal-group]')) return;
			inView(
				el,
				() => {
					animate(el, { opacity: [0, 1], y: [14, 0] }, { duration: 0.4, ease: SNAP });
				},
				view,
			);
		});
}

/** Above-the-fold elements that should animate on load, not on scroll. */
function enterOnLoad() {
	const els = document.querySelectorAll<HTMLElement>('[data-reveal][data-enter]');
	if (!els.length || reduced()) return;
	animate(
		els,
		{ opacity: [0, 1], y: [16, 0] },
		{ duration: 0.5, delay: stagger(0.07, { startDelay: 0.12 }), ease: SNAP },
	);
}

/** A phosphor line sweeps down the screen once the ROM is loaded. */
function sweep() {
	const line = document.querySelector<HTMLElement>('[data-sweep]');
	if (!line || reduced()) return;
	animate(
		line,
		{ transform: ['translateY(-10vh)', 'translateY(105vh)'], opacity: [0, 0.9, 0] },
		{ duration: 0.85, ease: 'easeInOut' },
	);
}

/* -------------------------------------------------------------- progress */

/** Hairline progress bar pinned under the header. */
function progress() {
	const bar = document.querySelector<HTMLElement>('[data-progress]');
	if (!bar) return;
	scroll((p) => {
		bar.style.transform = `scaleX(${p})`;
	});
}

/* ----------------------------------------------------------- card extras */

/** Stepped jitter on hover — a sprite "twitching" in place. */
function twitch() {
	if (reduced()) return;
	document.querySelectorAll<HTMLElement>('[data-twitch]').forEach((el) => {
		hover(el, () => {
			animate(
				el,
				{ transform: ['translateY(0)', 'translateY(-3px)', 'translateY(0)'] },
				{ duration: 0.22, ease: 'steps(3, end)' },
			);
		});
	});
}

/* ---------------------------------------------------------------- cursor */

/**
 * Optional block cursor. Off by default and only on fine-pointer devices —
 * hiding the native cursor is a preference, not something to impose.
 */
function pixelCursor() {
	const toggle = document.querySelector<HTMLButtonElement>('[data-cursor-toggle]');
	if (!toggle || !window.matchMedia('(pointer: fine)').matches || reduced()) return;

	const STORAGE = 'nitroq:cursor';
	const apply = (on: boolean) => {
		document.documentElement.classList.toggle('has-pixel-cursor', on);
		toggle.setAttribute('aria-pressed', String(on));
		toggle.textContent = on ? 'CURSOR: PIXEL' : 'CURSOR: SYSTEM';
		localStorage.setItem(STORAGE, String(on));
		document.querySelector('[data-cursor-el]')?.remove();
		if (!on) return;

		const el = document.createElement('div');
		el.className = 'pixel-cursor';
		el.dataset.cursorEl = '';
		document.body.appendChild(el);

		let x = window.innerWidth / 2;
		let y = window.innerHeight / 2;
		let tx = x;
		let ty = y;

		addEventListener('pointermove', (e) => {
			tx = e.clientX;
			ty = e.clientY;
		});
		const frame = () => {
			x += (tx - x) * 0.4;
			y += (ty - y) * 0.4;
			el.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
			requestAnimationFrame(frame);
		};
		requestAnimationFrame(frame);
	};

	apply(localStorage.getItem(STORAGE) === 'true');
	toggle.addEventListener('click', () =>
		apply(!document.documentElement.classList.contains('has-pixel-cursor')),
	);
}

/* ------------------------------------------------------------------- crt */

/** Scanline toggle, remembered between visits. */
function crtToggle() {
	const btn = document.querySelector<HTMLButtonElement>('[data-crt-toggle]');
	if (!btn) return;

	const STORAGE = 'nitroq:crt';
	const apply = (on: boolean) => {
		document.documentElement.dataset.crt = on ? 'on' : 'off';
		btn.setAttribute('aria-pressed', String(on));
		btn.textContent = on ? 'CRT: ON' : 'CRT: OFF';
		localStorage.setItem(STORAGE, String(on));
	};

	apply(localStorage.getItem(STORAGE) !== 'false');
	btn.addEventListener('click', () =>
		apply(document.documentElement.dataset.crt !== 'on'),
	);
}

/* --------------------------------------------------------------- palette */

type PaletteItem = { label: string; href: string; group: string; meta?: string };

/** Arrow-key navigable command palette. Also the fastest way to reach a project. */
function palette() {
	const root = document.querySelector<HTMLElement>('[data-palette]');
	const source = document.querySelector<HTMLScriptElement>('#palette-data');
	if (!root || !source) return;

	let items: PaletteItem[] = [];
	try {
		items = JSON.parse(source.textContent ?? '[]') as PaletteItem[];
	} catch {
		return;
	}
	if (!items.length) return;

	const list = root.querySelector<HTMLElement>('[data-palette-list]')!;
	const input = root.querySelector<HTMLInputElement>('[data-palette-input]')!;
	let filtered = items;
	let cursor = 0;
	let lastFocus: HTMLElement | null = null;

	const render = () => {
		list.innerHTML = '';
		filtered.forEach((item, i) => {
			const row = document.createElement('a');
			row.href = item.href;
			row.className = 'palette-item';
			row.setAttribute('aria-selected', String(i === cursor));
			row.innerHTML =
				`<span class="palette-item__group muted">${item.group}</span>` +
				`<span class="palette-item__label">${item.label}</span>` +
				(item.meta ? `<span class="palette-item__meta muted">${item.meta}</span>` : '');
			row.addEventListener('mouseenter', () => {
				cursor = i;
				sync();
			});
			list.appendChild(row);
		});
	};

	const sync = () => {
		list.querySelectorAll('[aria-selected]').forEach((el, i) =>
			el.setAttribute('aria-selected', String(i === cursor)),
		);
		list.children[cursor]?.scrollIntoView({ block: 'nearest' });
	};

	const filter = () => {
		const q = input.value.trim().toLowerCase();
		filtered = q
			? items.filter((i) => `${i.group} ${i.label}`.toLowerCase().includes(q))
			: items;
		cursor = 0;
		render();
	};

	const open = () => {
		lastFocus = document.activeElement as HTMLElement;
		root.hidden = false;
		input.value = '';
		filter();
		input.focus();
		animate(
			list.children,
			{ opacity: [0, 1], x: [-8, 0] },
			{ duration: 0.2, delay: stagger(0.018), ease: SNAP },
		);
	};

	const close = () => {
		root.hidden = true;
		lastFocus?.focus();
	};

	document
		.querySelectorAll<HTMLElement>('[data-palette-open]')
		.forEach((btn) => btn.addEventListener('click', open));

	root.addEventListener('click', (e) => {
		if (e.target === root) close();
	});

	input.addEventListener('input', filter);

	addEventListener('keydown', (e) => {
		if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			root.hidden ? open() : close();
			return;
		}
		if (root.hidden) return;

		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowDown') {
			e.preventDefault();
			cursor = (cursor + 1) % filtered.length;
			sync();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			cursor = (cursor - 1 + filtered.length) % filtered.length;
			sync();
		} else if (e.key === 'Enter' && filtered[cursor]) {
			e.preventDefault();
			window.location.href = filtered[cursor]!.href;
		}
	});

	render();
}

/* ------------------------------------------------------------------ init */

export function initArcade() {
	if (reduced()) {
		document.documentElement.classList.remove('js-motion');
		document.documentElement.classList.add('no-motion');
	}

	reveals();
	progress();
	twitch();
	crtToggle();
	pixelCursor();
	palette();

	// The cabinet has to finish booting before anything on the screen is worth
	// animating — otherwise the whole overture plays behind the overlay.
	boot().then(() => {
		decode();
		enterOnLoad();
		sweep();
	});
}
