import {COLORS, discountedPriceStyle} from './index';

describe('discountedPriceStyle', () => {
  it('strikes through and uses the danger color when discounted', () => {
    expect(discountedPriceStyle(true)).toEqual({
      color: COLORS.danger,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    });
  });

  it('uses the primary color and no strike-through when not discounted', () => {
    expect(discountedPriceStyle(false)).toEqual({
      color: COLORS.primary,
      textDecorationLine: 'none',
      textDecorationStyle: 'solid',
    });
  });
});
