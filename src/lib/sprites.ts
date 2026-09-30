/**
 * Hand-authored pixel sprites. Each sprite is a grid of characters where every
 * non-`.` character indexes into that sprite's palette. Rendered by
 * `PixelSprite.astro` as `crispEdges` SVG so it stays sharp at any scale.
 */
export type Sprite = {
	rows: string[];
	palette: Record<string, string>;
};

export const SPRITES: Record<string, Sprite> = {
	coin: {
		palette: { '1': '#8a5200', '2': '#ffb43c', '3': '#fff3d0' },
		rows: [
			'..1111..',
			'.122221.',
			'12333221',
			'12333221',
			'12333221',
			'.122221.',
			'..1111..',
			'........',
		],
	},

	crab: {
		palette: { '1': '#7a0030', '2': '#ff4d8d', '4': '#f4efe2' },
		rows: [
			'..............',
			'.11........11.',
			'.1221....1221.',
			'..1221..1221..',
			'...122111221..',
			'..1222222221..',
			'..1244224421..',
			'..1222222221..',
			'...111111111..',
			'.1.1.1...1.1.1',
		],
	},

	ghost: {
		palette: { '1': '#2b2b47', '2': '#a98bff', '4': '#06060b' },
		rows: [
			'...1111...',
			'..122221..',
			'.12222221.',
			'.12442221.',
			'.12222221.',
			'.12222221.',
			'.12222221.',
			'.12222221.',
			'.12222221.',
			'1.1.1.1.1.',
		],
	},

	star: {
		palette: { '1': '#b26a00', '2': '#ffb43c' },
		rows: [
			'...11...',
			'..1221..',
			'.112211.',
			'11222211',
			'.112211.',
			'..1221..',
			'.1.11.1.',
			'.1.11.1.',
		],
	},

	heart: {
		palette: { '1': '#7a0a30', '2': '#ff4d8d' },
		rows: [
			'.11..11.',
			'12211221',
			'12222221',
			'12222221',
			'.122221.',
			'..1221..',
			'...11...',
		],
	},

	bolt: {
		palette: { '1': '#7a5a00', '2': '#ffd84d' },
		rows: [
			'...11.',
			'..11..',
			'.11...',
			'111111',
			'..11..',
			'.11...',
			'11....',
		],
	},

	chip: {
		palette: { '1': '#073b4a', '2': '#54e4ff', '4': '#f4efe2' },
		rows: [
			'11111111',
			'12222221',
			'12111121',
			'12144121',
			'12144121',
			'12111121',
			'12222221',
			'11111111',
		],
	},
};

export const SPRITE_NAMES = Object.keys(SPRITES);
