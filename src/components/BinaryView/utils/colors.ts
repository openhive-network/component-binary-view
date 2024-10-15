export type Color = { r: number; g: number; b: number; a: number };

// Normalize a number to a range
const normalizeToRange = (value: number, range: number): number => {
  return Math.abs(value % range);
}

const MAX_RGB_VALUE = 255;

/// Function to generate random non-invasive background colors with transparency
const generateRandomBackgroundColor = (seed: Color): Color => {
  const bgColorAllowedRange = 150;

  // Normalize values
  const rComponent = normalizeToRange(seed.r, bgColorAllowedRange);
  const gComponent = normalizeToRange(seed.g, bgColorAllowedRange);
  const bComponent = normalizeToRange(seed.b, bgColorAllowedRange);

  // Generate a random light color in the range of 100–255 for RGB
  const r = rComponent + (MAX_RGB_VALUE - bgColorAllowedRange);
  const g = gComponent + (MAX_RGB_VALUE - bgColorAllowedRange);
  const b = bComponent + (MAX_RGB_VALUE - bgColorAllowedRange);
  const a = 0.05; // Ensuring semi-transparency

  return { r, g, b, a };
};

/// Function to adjust colors based on the base black background color
const blendWithBlack = (color: Color): Color => {
  const blendedR = Math.round(color.r * color.a);
  const blendedG = Math.round(color.g * color.a);
  const blendedB = Math.round(color.b * color.a);
  return { r: blendedR, g: blendedG, b: blendedB, a: 1 };
};

/// Function to generate a readable random text color based on background color
const generateReadableTextColor = (bgColor: Color, seed: Color): Color => {
  // First blend the background color with black
  const effectiveBgColor = blendWithBlack(bgColor);

  // Calculate perceived brightness of the background
  // The constants `0.299`, `0.587`, and `0.114` are coefficients that represent the relative luminance of the red, green, and blue components of a color,
  // respectively, based on human perception. These values are derived from the Rec. 601 luma formula used in television and digital media,
  // which accounts for the fact that the human eye is more sensitive to green light, less sensitive to red, and even less sensitive to blue.
  // Source: https://www.w3.org/TR/AERT/#color-contrast
  const brightness = (effectiveBgColor.r * 0.299) + (effectiveBgColor.g * 0.587) + (effectiveBgColor.b * 0.114);

  const fgColorAllowedRange = 128;

  // Normalize values
  const rComponent = normalizeToRange(seed.r, fgColorAllowedRange);
  const gComponent = normalizeToRange(seed.g, fgColorAllowedRange);
  const bComponent = normalizeToRange(seed.b, fgColorAllowedRange);

  // Generate a contrasting color
  // If the background is bright, choose a dark color; otherwise, choose a bright color.
  const textColor = brightness > (MAX_RGB_VALUE / 2)
    ? { r: rComponent, g: gComponent, b: bComponent, a: 1 }
    : { r: (MAX_RGB_VALUE - fgColorAllowedRange) + rComponent, g: (MAX_RGB_VALUE - fgColorAllowedRange) + gComponent, b: (MAX_RGB_VALUE - fgColorAllowedRange) + bComponent, a: 1 };

  return textColor;
};

/// Generates an rgb value from a string. RGB values need to be normalized before usage
const hashStringToRGB = (input: string): Color => {
  // Simple hash function
  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  // Get a hash of the input string
  const fullHash = simpleHash(input);

  // Separate the full hash into parts for r, g, and b
  const r = (fullHash & 0xFF0000) >> 16;
  const g = (fullHash & 0x00FF00) >> 8;
  const b = (fullHash & 0x0000FF);

  return { r, g, b, a: 1 };
};

export type TGenerateRandomColorCssValue = {
  'background-color': string;
  color: string;
}

export type TGenerateRandomColorSpaceOutput = {
  backgroundColor: Color;
  color: Color;
  css: TGenerateRandomColorCssValue;
}

/// Generates new color space (foreground and background) based on a seed string and an optional previous background color (applies given background). Outputs raw color values and CSS values
export const generateRandomColorSpace = (seed: string, previousBackgroundColor?: Color): TGenerateRandomColorSpaceOutput => {
  const seedColor = hashStringToRGB(seed);

  const backgroundColor = previousBackgroundColor ?? generateRandomBackgroundColor(seedColor);
  const color = generateReadableTextColor(backgroundColor, seedColor);

  return {
    backgroundColor,
    color,
    css: {
      'background-color': `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
      color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    }
  };
};
