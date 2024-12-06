/** @type {import('tailwindcss').Config} */
const defaultTheme = require('@tailwindcss/defaultTheme')
const animate = require('tailwindcss-animate')
const typography = require('@tailwindcss/typography')
const scrollbar = require('tailwind-scrollbar')

module.exports = {
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
  			heading: ['Lufga', 'sans-serif'],
  			body: ['Satoshi', 'sans-serif'],
  		},
  		fontSize: {
  			'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
  			'h2': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
  			'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
  			'h4': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
  			'body-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }],
  			'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
  			'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
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
  		fontWeight: {
  			normal: 400,
  			medium: 500,
  			bold: 700,
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					'code::before': {
  						content: '""'
  					},
  					'code::after': {
  						content: '""'
  					},
  					'blockquote p:first-of-type::before': {
  						content: '""'
  					},
  					'blockquote p:last-of-type::after': {
  						content: '""'
  					},
  					pre: {
  						backgroundColor: '#f3f4f6',
  						color: '#1f2937',
  						padding: '1rem',
  						borderRadius: '0.5rem',
  						margin: '1rem 0'
  					},
  					code: {
  						backgroundColor: '#f3f4f6',
  						color: '#1f2937',
  						padding: '0.25rem',
  						borderRadius: '0.25rem',
  						fontWeight: '400'
  					},
  					'pre code': {
  						backgroundColor: 'transparent',
  						padding: '0'
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [
    animate,
    typography,
    scrollbar({ nocompatible: true })
  ],
}

