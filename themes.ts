const palette = {
  purple: "#5A31F4",
  green: "#0CA996",
  red: "#CD0E61",
  black: "#000",
  white: "#F0F2F3",
  grey: "#aeb1b5",
  blue: "#101D25",
  yellow: "#F5C418",
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.yellow,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    inactive: palette.grey,
    black: palette.black,
    white: palette.white,
  },
  spacing: { s: 8, sm: 12, m: 16, ml: 20, l: 24, xl: 32, xxl: 40 },
  size: { s: 8, sm: 12, m: 16, ml: 20, l: 24, xl: 32, xxl: 40 },
  textVariants: {
    header: {
      fontFamily: "ArchivoBlack",
      fontSize: 36,
      fontWeight: "bold",
    },
    body: {
      fontFamily: "Merriweather",
      fontSize: 16,
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.blue,
    foreground: palette.white,
  },
};
