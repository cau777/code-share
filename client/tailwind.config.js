/** @type {import("tailwindcss").Config} */
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
                    50: "#f6e6ff",
                    100: "#e8c1fe",
                    200: "#d996ff",
                    300: "#c969ff",
                    400: "#ba41fe",
                    500: "#aa1bf4",
                    600: "#971dee",
                    700: "#7b29d9",
                    800: "#6527d0",
                    900: "#5b20b9",
                },
                error: {
                    50: "#ffe6ef",
                    100: "#febfd7",
                    200: "#ff96bd",
                    300: "#ff69a0",
                    400: "#fe4789",
                    500: "#fe2873",
                    600: "#ec2c71",
                    700: "#d5296c",
                    800: "#bf2568",
                    900: "#991e5f",
                },
                font: {
                    1: "#FFFFFF",
                    2: "#c9c9c9"
                },
                analog: {
                    50: "#f6e6ff",
                    100: "#cac0ff",
                    200: "#a496ff",
                    300: "#7f6df4",
                    400: "#694ce2",
                    500: "#5626d0",
                    600: "#511ac5",
                    700: "#4904b8",
                    800: "#4300aa",
                    900: "#390092",
                },
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
