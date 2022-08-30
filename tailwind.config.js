/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                back: {
                    1: "#212121",
                    2: "#323232",
                    3: "#505050",
                },
                primary: {
                    200: "#d996ff",
                    300: "#c969ff",
                    400: "#ba41fe",
                    500: "#aa1bf4",
                    600: "#971dee",
                },
                error:{
                    200: "#ff96bd",
                    300: "#ff69a0",
                    400: "#fe4789",
                    500: "#fe2873"
                },
                font: {
                    1: "#FFFFFF",
                    2: "#c9c9c9"
                }
            },

            container: {
                padding: {
                    DEFAULT: "1rem",
                    lg: "10rem",
                },
                center: true,
            },
        },
    },
    plugins: [],
}
