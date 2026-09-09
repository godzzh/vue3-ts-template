import autoprefixer from 'autoprefixer';
import type { Plugin } from 'postcss';
import tailwindcss from 'tailwindcss';

const ROOT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 12;
const remPattern = /(-?\d*\.?\d+)rem\b/g;
const pixelPattern = /^(-?\d*\.?\d+)px$/;
const convertRem = (value: string) =>
    value.replace(remPattern, (_, number: string) => {
        const pixels = Number(number) * ROOT_FONT_SIZE;
        return `${Number(pixels.toFixed(4))}px`;
    });

const remToPixel = (): Plugin => ({
    postcssPlugin: 'project-rem-to-pixel',
    Declaration(declaration) {
        if (declaration.value.includes('rem')) declaration.value = convertRem(declaration.value);
        if (declaration.prop !== 'font-size') return;
        const match = declaration.value.trim().match(pixelPattern);
        if (!match) return;
        const normalizedSize = Math.max(MIN_FONT_SIZE, Math.round(Number(match[1])));
        declaration.value = `${normalizedSize}px`;
    },
    AtRule(atRule) {
        if (atRule.params.includes('rem')) atRule.params = convertRem(atRule.params);
    },
});

export default {
    plugins: [tailwindcss(), autoprefixer(), remToPixel()],
};
