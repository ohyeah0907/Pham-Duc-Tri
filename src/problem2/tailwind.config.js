/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            // primary: '#056282',
            // secondary: '#368da1',
            primary: '#141b2b',
            secondary: '#1f2c46',
            white: '#ffffff',
            black: '#000000',
            gray: '#7c85a2',
            blue: {
                dark: '#1f2c46',
                medium: '#304169',
                semi: '#304169',
                light: '#4c82fb',
            },
        },
    },
    plugins: [],
}
