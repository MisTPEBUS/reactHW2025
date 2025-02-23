/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				primary: '#d16639',
				'secondary': '#2A9D8F',
				'primary-light': '#e77a4e',
				'primary-dark': '#8c371d',
				'neutral-bg': '#f5ece9',

			},
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
					'2xl': '1296px',
				},
			},
			typography: {
				DEFAULT: {
					css: {
						h1: { fontSize: '2.25rem', fontWeight: '700', color: '#d16639' },
						h2: { fontSize: '1.875rem', fontWeight: '600', color: '#e77a4e' },
						h3: { fontSize: '1.5rem', fontWeight: '500', color: '#8c371d' },
						h4: { fontSize: '1.25rem', fontWeight: '500', color: '#8c371d' },
						h5: { fontSize: '1.125rem', fontWeight: '400', color: '#8c371d' },
						h6: { fontSize: '1rem', fontWeight: '400', color: '#8c371d' },
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}
