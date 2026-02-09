/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                medical: {
                    50: '#f0f9fa',
                    100: '#d1f0f2',
                    200: '#a3e1e6',
                    300: '#67cbd4',
                    400: '#34aebc',
                    500: '#1a91a0',
                    600: '#157584',
                    700: '#155f6c',
                    800: '#164f59',
                    900: '#17424d',
                    950: '#0a2b33',
                },
            }
        },
    },
    plugins: [],
}
