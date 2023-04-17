// color design tokens export
export const colorTokens = {
  // straight grey bro
  // grey: {
  //   0: "#FFFFFF",
  //   10: "#F6F6F6",
  //   50: "#F0F0F0",
  //   100: "#E0E0E0",
  //   200: "#C2C2C2",
  //   300: "#A3A3A3",
  //   400: "#858585",
  //   500: "#666666",
  //   600: "#4D4D4D",
  //   700: "#333333",
  //   800: "#1A1A1A",
  //   900: "#0A0A0A",
  //   1000: "#000000",
  // },
  // purple-y hue
  // grey: {
  //   0: "#FFFFFF",
  //   10: "#F6F6F6",
  //   50: "#F0F0F0",
  //   100: "#E0E0E0",
  //   200: "#C2C2C2",
  //   300: "#A3A3A3",
  //   400: "#918991",
  //   500: "#7E7E9C",
  //   600: "#6A6A8C",
  //   700: "#52527A",
  //   800: "#3B3B69",
  //   900: "#252548",
  //   1000: "#0A0A0A",
  // },
  // blue-ish hue
  grey: {
    0: "#FFFFFF",
    10: "#F7F7FA",
    50: "#F0F2F5",
    100: "#E0E4EA",
    200: "#C2C7D4",
    300: "#A4AABF",
    400: "#8F95AE",
    500: "#7A809D",
    600: "#666B8B",
    700: "#4D536E",
    800: "#333A50",
    900: "#1A2033",
    1000: "#000A16",
  },
  // cyan
  // primary: {
  //   50: "#E6FBFF",
  //   100: "#CCF7FE",
  //   200: "#99EEFD",
  //   300: "#66E6FC",
  //   400: "#33DDFB",
  //   500: "#00D5FA",
  //   600: "#00A0BC",
  //   700: "#006B7D",
  //   800: "#00353F",
  //   900: "#001519",
  // },
  // tangerine
  primary: {
    50: "#FFF5E6",
    100: "#FFEACC",
    200: "#FFD299",
    300: "#FFB966",
    400: "#FFA633",
    500: "#FF9400",
    600: "#CC7400",
    700: "#995500",
    800: "#663300",
    900: "#331900",
  },
  // really red
  // primary: {
  //   50: "#FFE6E6",
  //   100: "#FFCCCC",
  //   200: "#FF9999",
  //   300: "#FF6666",
  //   400: "#FF3333",
  //   500: "#FF0000",
  //   600: "#CC0000",
  //   700: "#990000",
  //   800: "#660000",
  //   900: "#330000",
  // },
  // indigo
  // primary: {
  //   50: "#E6E6FF",
  //   100: "#CCCCFF",
  //   200: "#9999FF",
  //   300: "#6666FF",
  //   400: "#3333FF",
  //   500: "#0000FF",
  //   600: "#0000CC",
  //   700: "#000099",
  //   800: "#000066",
  //   900: "#000033",
  // },
  // electric indigo
  // primary: {
  //   50: "#F1E7FC",
  //   100: "#D7C0F9",
  //   200: "#BA96F6",
  //   300: "#9D6DF2",
  //   400: "#8120EF",
  //   500: "#6A00F0",
  //   600: "#5D00D7",
  //   700: "#4F00BF",
  //   800: "#4100A6",
  //   900: "#34008E",
  // },
  // chill purple
  // primary: {
  //   50: "#F5F3FF",
  //   100: "#EAE5FF",
  //   200: "#BFB2FF",
  //   300: "#9981FF",
  //   400: "#7C62FF",
  //   500: "#653DFF",
  //   600: "#5229CC",
  //   700: "#3D1C99",
  //   800: "#2B1266",
  //   900: "#180733",
  // },
  // Pastelle Yellow
  // primary: {
  //   50: "#FFFBE6",
  //   100: "#FFF8CC",
  //   200: "#FFF3B3",
  //   300: "#FFEDA3",
  //   400: "#FFE493",
  //   500: "#FFDD82",
  //   600: "#FFD06B",
  //   700: "#FFC453",
  //   800: "#FFB83C",
  //   900: "#FFAB24",
  // }
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: colorTokens.primary[ 200 ],
            main: colorTokens.primary[ 500 ],
            light: colorTokens.primary[ 800 ],
          },
          neutral: {
            dark: colorTokens.grey[ 100 ],
            main: colorTokens.grey[ 200 ],
            mediumMain: colorTokens.grey[ 300 ],
            medium: colorTokens.grey[ 400 ],
            light: colorTokens.grey[ 700 ],
          },
          background: {
            default: colorTokens.grey[ 900 ],
            alt: colorTokens.grey[ 800 ],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[ 700 ],
            main: colorTokens.primary[ 500 ],
            light: colorTokens.primary[ 50 ],
          },
          neutral: {
            dark: colorTokens.grey[ 700 ],
            main: colorTokens.grey[ 500 ],
            mediumMain: colorTokens.grey[ 400 ],
            medium: colorTokens.grey[ 300 ],
            light: colorTokens.grey[ 50 ],
          },
          background: {
            default: colorTokens.grey[ 10 ],
            alt: colorTokens.grey[ 0 ],
          },
        }),
    },
    typography: {
      fontFamily: [ "Poppins", "sans-serif" ].join(","),
      fontSize: 12,
      h1: {
        fontFamily: [ "Poppins", "sans-serif" ].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: [ "Poppins", "sans-serif" ].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: [ "Poppins", "sans-serif" ].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: [ "Poppins", "sans-serif" ].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: [ "Poppins", "sans-serif" ].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: [ "Poppins", "sans-serif" ].join(","),
        fontSize: 14,
      },
    },
  };
};