export const COLORS = {
  // Brand
  primary: '#6200EE', // brand purple
  primaryDark: '#4700AE', // dark purple (input text)
  green: '#009588', // secondary / cash / accept

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  border: '#C6C6C6', // thumbnail / image borders
  borderLight: '#E2E2E2', // list-row borders
  borderInput: '#E9E9E9', // numeric input borders
  surfaceMuted: '#F2F2F2', // category / search background
  cardBg: '#F3F3E4', // map card background
  textMuted: '#444444',
  hairline: '#888888',
  dark: '#30262E',
  navy: '#062231',
  pink: '#B0228C', // numeric input text

  // Status
  danger: 'red',
  success: 'green',
  overlay: 'rgba(0,0,0,0.5)', // loading backdrop

  // Payment checkboxes (ModalReceiveOrder)
  checkboxPurpleUnfill: '#AFB5F5',
  checkboxGreenUnfill: '#CBF2D5',
  paymentOn: '#34EB83',
  paymentOff: '#EB4034',

  // QR switch (WorkerHomePage)
  switchTrackOff: '#767577',
  switchTrackOn: '#81B0FF',
  switchThumbOn: '#F5DD4B',
  switchThumbOff: '#F4F3F4',
  switchIosBg: '#3E3E3E',

  // Map marker + tab-icon glow
  markerRing: 'rgba(130,4,150, 0.3)',
  markerRingBorder: 'rgba(130,4,150, 0.5)',
  shadowGlowStart: '#EB9066D8',
  shadowGlowEnd: '#FF00FF10',
};

export const INPUT = {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
  color: COLORS.primaryDark,
  fontSize: 17,
};

export const purpleButton = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 46,
  borderRadius: 8,
  elevation: 3,
  backgroundColor: COLORS.primary,
  marginTop: 20,
};

export const greenButton = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 42,
  borderRadius: 8,
  elevation: 3,
  backgroundColor: COLORS.green,
  marginTop: 20,
};

// Shared style for a product price that may be discounted (strike-through when discounted).
export const discountedPriceStyle = hasDiscount => ({
  color: hasDiscount ? COLORS.danger : COLORS.primary,
  textDecorationLine: hasDiscount ? 'line-through' : 'none',
  textDecorationStyle: 'solid',
});
