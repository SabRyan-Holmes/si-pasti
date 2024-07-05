import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                inder: ["Inder"],
                kanit: ["Kanit"],
                signika: ["Signika Negative"],
                explora: ["Explora"],
            },
            backgroundImage: {
                // card: "url('/resources/assets/card.png')",
            },

            screens: {
                xs: "400px",
                // "2xl": "1320px",
                // "3xl": "1536px",
                "8xl": "2400px",
            },

        },
    },

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#2D95C9",

                    secondary: "#f97316",

                    accent: "#ffffff",

                    neutral: "#ffffff",

                    base: "#FBEDD7",

                    "base-100": "#e0f2fe",

                    info: "#cbd5e1",

                    success: "#50C878",

                    warning: "#dc2626",

                    error: "#ffffff",
                },
            },
        ],
    },

    plugins: [
        daisyui,
        forms
    ],
};
