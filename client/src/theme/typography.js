
const typography = {
  useNextVariants: true,
  fontFamily: [
    "Gilroy",
    "Poppins",
    "Arial",
    "sans-serif",
  ].join(","),
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  h1: {
    fontSize: "3.5rem",
    fontWeight: 600,
    '@media (max-width:959px)': {
      fontSize: '1.75rem',
    },
  },
  h2: {
    fontSize: "3.125rem",
    fontWeight: 600,
    '@media (max-width:959px)': {
      fontSize: '1.5rem',
    },
  },
  h3: {
    fontSize: "1.5625rem",
    fontWeight: 600,
    '@media (max-width:959px)': {
      fontSize: '1.25rem',
    },
  },
  h4: {
    fontSize: "1.375rem",
    fontWeight: 600,
    '@media (max-width:959px)': {
      fontSize: '1rem',
    },
  },
  h5: {
    fontSize: "1.125rem",
    fontWeight: 600,
    '@media (max-width:959px)': {
      fontSize: '0.88rem',
    },
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    '@media (max-width:959px)': {
      fontSize: '0.75rem',
    },
  },
  body1: {
    fontSize: 14
  },
  button: {
    textTransform: "none"
  }
};

export default typography;
