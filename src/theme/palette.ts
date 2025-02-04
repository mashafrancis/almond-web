import { PaletteMode } from '@mui/material';

export const light = {
	alternate: {
		// main: '#f7f9fc',
		main: '#f4f4f6',
		dark: '#edf1f7',
	},
	cardShadow: 'rgba(23, 70, 161, .11)',
	common: {
		black: '#191414',
		white: '#EEEEEF',
	},
	mode: 'light' as PaletteMode,
	primary: {
		light: '#5ea6ff',
		main: '#0078d4',
		dark: '#004da2',
		// main: '#2573b5',
		// light: '#62a1e8',
		// dark: '#004885',
		contrastText: '#fff',
	},
	secondary: {
		light: '#bdf74c',
		main: '#89c402',
		dark: '#559300',
		// light: '#cbffff',
		// main: '#97d2ff',
		// dark: '#64a1cc',
		// light: '#ffe98d',
		// main: '#F9B75D',
		// dark: '#c3872e',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	text: {
		primary: '#191414',
		secondary: '#646e73',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	background: {
		paper: '#ffffff',
		default: '#ffffff',
		level3: '#62a1e81f',
		level2: '#f5f5f5',
		level1: '#ffffff',
		contrast: 'rgba(255, 255, 255, 0.12)',
	},
};

export const dark = {
	alternate: {
		main: '#1a2138',
		dark: '#151a30',
	},
	cardShadow: 'rgba(0, 0, 0, .11)',
	common: {
		black: '#000',
		white: '#fff',
	},
	mode: 'dark' as PaletteMode,
	primary: {
		main: '#289bff',
		light: '#73cbff',
		dark: '#006dcb',
		contrastText: '#fff',
		// main: '#318162',
		// light: '#62b18f',
		// dark: '#005438',
		// contrastText: '#fff',
	},
	secondary: {
		light: '#bdf74c',
		main: '#89c402',
		dark: '#559300',
		// light: '#ffe98d',
		// main: '#F9B75D',
		// dark: '#c3872e',
		contrastText: 'rgba(0, 0, 0, 0.87)',
	},
	text: {
		primary: '#EEEEEF',
		secondary: '#AEB0B4',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	background: {
		paper: '#121212',
		default: '#121212',
		level3: '#62a1e81f',
		level2: '#333',
		level1: '#2D3748',
		contrast: 'rgba(255, 255, 255, 0.12)',
	},
};
