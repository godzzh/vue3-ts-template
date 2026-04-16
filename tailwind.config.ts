/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB',
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#2563EB',
                    600: '#1D4ED8',
                    700: '#1E40AF',
                    800: '#1E3A8A',
                    900: '#1E3A8A',
                },
                success: '#059669',
                warning: '#D97706',
                error: '#DC2626',
                gray: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                }
            },
            fontFamily: {
                sans: ['Fira Sans', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            borderRadius: {
                'sm': '6px',
                'DEFAULT': '8px',
                'md': '8px',
                'lg': '12px',
            },
            boxShadow: {
                'card': '0 1px 2px rgba(0, 0, 0, 0.05)',
                'card-hover': '0 4px 12px rgba(37, 99, 235, 0.1)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
            }
        },
    },
    plugins: [],
}

