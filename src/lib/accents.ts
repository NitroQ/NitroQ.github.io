/**
 * Accent colour lookup. Class names are written out in full so Tailwind's
 * scanner can see them — never build these strings dynamically.
 */
export const ACCENTS = {
	phos: {
		text: 'text-phos',
		border: 'border-phos',
		bg: 'bg-phos',
		glow: 'shadow-[0_0_0_1px_rgba(76,255,145,0.35)]',
	},
	amber: {
		text: 'text-amber',
		border: 'border-amber',
		bg: 'bg-amber',
		glow: 'shadow-[0_0_0_1px_rgba(255,180,60,0.35)]',
	},
	hot: {
		text: 'text-hot',
		border: 'border-hot',
		bg: 'bg-hot',
		glow: 'shadow-[0_0_0_1px_rgba(255,77,141,0.35)]',
	},
	cyan: {
		text: 'text-cyan',
		border: 'border-cyan',
		bg: 'bg-cyan',
		glow: 'shadow-[0_0_0_1px_rgba(84,228,255,0.35)]',
	},
	violet: {
		text: 'text-violet',
		border: 'border-violet',
		bg: 'bg-violet',
		glow: 'shadow-[0_0_0_1px_rgba(169,139,255,0.35)]',
	},
} as const;

export type Accent = keyof typeof ACCENTS;
