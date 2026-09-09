import { describe, expect, it } from 'vitest';
import { getColorType, idcard_patter, phone_patter } from './utils';

describe('validation utilities', () => {
    it('validates mainland phone numbers', () => {
        expect(phone_patter.test('13812345678')).toBe(true);
        expect(phone_patter.test('12812345678')).toBe(false);
    });

    it('recognizes light and dark colors', () => {
        expect(getColorType('#ffffff')).toBe(true);
        expect(getColorType('#111111')).toBe(false);
    });

    it('rejects malformed identity numbers', () => {
        expect(idcard_patter('11010119900101123X')).toBe(false);
    });
});
