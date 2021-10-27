const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: theme => ({
				"screen": "calc(100vh - 93px)",
				"screen/2": "calc(100vh - 185px)",
			}),
			colors: {
				sky: colors.sky,
				teal: colors.teal,
				rose: colors.rose,
				colab: '#282828',
				editor: '#4c4c4c',
				taskbar: '#262c2f',
				taskbar_hober: '#2D2F3B'
			}
		}
	},
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/aspect-ratio'),]
};

module.exports = config;
