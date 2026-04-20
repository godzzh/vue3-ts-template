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
                  900: '#172554',
                },
                success: {
                  DEFAULT: '#10B981',
                  light: '#ECFDF5',
                },
                warning: {
                  DEFAULT: '#F59E0B',
                  light: '#FFFBEB',
                },
                error: {
                  DEFAULT: '#EF4444',
                  light: '#FEF2F2',
                },
                info: {
                  DEFAULT: '#6366F1',
                  light: '#EEF2FF',
                },
                gray: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    150: '#EAEEF2',
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
                'xs': '4px',
                'sm': '6px',
                'DEFAULT': '8px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
                '2xl': '20px',
            },
            boxShadow: {
                // 高级卡片阴影
                'card': '0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)',
                'card-hover': '0 8px 24px rgba(15, 23, 42, 0.08), 0 4px 8px rgba(15, 23, 42, 0.04)',
                'card-premium': '0 4px 20px rgba(15, 23, 42, 0.06)',
                // 面板阴影
                'panel': '0 4px 20px rgba(15, 23, 42, 0.06)',
                // 主题阴影
                'primary': '0 4px 14px 0 rgba(37, 99, 235, 0.15)',
                'primary-lg': '0 8px 24px 0 rgba(37, 99, 235, 0.2)',
                // 下拉菜单
                'dropdown': '0 10px 40px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)',
                // 悬浮效果
                'lifted': '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 20px 25px -5px rgba(15, 23, 42, 0.06)',
                // 轻量阴影
                'neu': '0 1px 3px rgba(15, 23, 42, 0.05)',
                'neu-sm': '0 1px 2px rgba(15, 23, 42, 0.04)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '250': '250ms',
                '300': '300ms',
                '400': '400ms',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            backgroundImage: {
                'gradient': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%)',
                'gradient-surface': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fadeIn 300ms ease-out forwards',
                'slide-in-right': 'slideInRight 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeInUp: {
                  from: { opacity: '0', transform: 'translateY(16px)' },
                  to: { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                  from: { opacity: '0' },
                  to: { opacity: '1' },
                },
                slideInRight: {
                  from: { opacity: '0', transform: 'translateX(16px)' },
                  to: { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
}
