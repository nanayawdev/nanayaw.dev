/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: 'class',
  theme: {
  	extend: {
  		colors: {
  			riptide: {
  				'50': '#f0fdfb',
  				'100': '#cef9f4',
  				'200': '#9cf3ea',
  				'300': '#73e8e0',
  				'400': '#33cec9',
  				'500': '#19b3b0',
  				'600': '#128f8f',
  				'700': '#127273',
  				'800': '#14595b',
  				'900': '#154b4c',
  				'950': '#052b2e'
  			}
  		},
  		fontFamily: {
  			sans: ['Manrope', 'system-ui', 'sans-serif']
  		},
  		maxWidth: {
  			container: 'var(--max-width)'
  		},
  		height: {
  			header: 'var(--header-height)',
  			footer: 'var(--footer-height)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'spin-slow': 'spin 8s linear infinite',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

