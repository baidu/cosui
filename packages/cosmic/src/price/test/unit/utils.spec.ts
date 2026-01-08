import {formatPrice} from '../../util';

describe('formatPrice', () => {
    test('formats price correctly when price is less than 10000', () => {
        expect(formatPrice(500)).toBe(500);
    });

    test('formats price correctly when price is between 10000 and 100,000,000', () => {
        expect(formatPrice(50000)).toBe(5);
    });

    test('formats price correctly when price is greater than or equal to 100,000,000', () => {
        expect(formatPrice(150000000)).toBe(1.5);
    });

    test('formats price with ellipsis option', () => {
        expect(formatPrice(314159.2653, true)).toBe(31);
    });

    test('formats price with decimal adjustment', () => {
        expect(formatPrice(2.09)).toBe(2);
    });
});