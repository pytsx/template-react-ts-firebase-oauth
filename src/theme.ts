import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Space Grotesk, nato, arial',
    },
    button: {
      letterSpacing: '- 0.02rem',
      fontSize: '.9rem',

    },
    body1: {
    }
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#3d3d3d',
      default: '#2d2d2d'
    },
    primary: {
      main: '#0066cc'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#c9c9c9',
          background: '#2d2d2d',
          "&:hover": {
            background: '#1d1d1d',
          }
        }
      },
      defaultProps: {
        size: 'small'
      }
    }
  }

})

theme = responsiveFontSizes(theme)

export default theme