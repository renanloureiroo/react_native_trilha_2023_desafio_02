const fontSizes = {
  /**
   * @returns 12px
   */
  sm: "12px",
  /**
   * @returns 14px
   */
  md: "14px",
  /**
   * @returns 16px
   */
  "x-md": "16px",
  /**
   * @returns 18px
   */
  lg: "18px",
  /**
   * @returns 24px
   */
  "x-lg": "24px",
  /**
   * @returns 32px
   */
  "2x-large": "32px",
};

const fonts = {
  nunitoSans: {
    /**
     * @returns NunitoSans_400Regular
     */
    regular: "NunitoSans_400Regular",
    /**
     * @returns NunitoSans_700Bold
     */
    bold: "NunitoSans_700Bold",
  },
};

export const typography = {
  primary: fonts.nunitoSans,
  fontSizes,
};

export type Weight = keyof typeof typography.primary;
