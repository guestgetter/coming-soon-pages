import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
    accent: "'Dancing Script', cursive",
  },
  colors: {
    brand: {
      // Exact colors from todo-plan.md
      cream: '#fbe7cc',
      darkBrown: '#6f3e13',
      mediumBrown: '#8a542e',
      lightBrown: '#5D5A54',
      white: 'rgba(255, 255, 255, 0.7)',
      lightGray: '#E5E1DC',
      black: 'rgba(0, 0, 0, 0.15)',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: 500,
        borderRadius: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
        _hover: {
          transform: 'translateY(-3px)',
          boxShadow: '0 15px 35px rgba(138, 84, 46, 0.3)',
        },
        _active: {
          transform: 'translateY(-1px)',
        },
      },
      variants: {
        primary: {
          bg: 'linear-gradient(135deg, #8a542e 0%, #6f3e13 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #6f3e13 0%, #8a542e 100%)',
          },
        },
      },
      sizes: {
        lg: {
          px: '2.5rem',
          py: '1rem',
          fontSize: '1rem',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontFamily: 'body',
          fontSize: '1rem',
          borderRadius: '12px',
          border: '2px solid',
          borderColor: 'brand.lightGray',
          bg: 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.3s ease',
          _focus: {
            borderColor: 'brand.mediumBrown',
            bg: 'rgba(255, 255, 255, 0.95)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(138, 84, 46, 0.1)',
          },
        },
      },
      sizes: {
        lg: {
          field: {
            px: '1.2rem',
            py: '1rem',
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'body',
      },
      variants: {
        tagline: {
          fontFamily: 'heading',
          fontStyle: 'italic',
          fontSize: { base: '1.2rem', md: '1.3rem', lg: '1.5rem' },
          color: 'brand.darkBrown',
          lineHeight: 1.4,
          fontWeight: 400,
        },
        description: {
          fontSize: { base: '1rem', lg: '1.1rem' },
          color: 'brand.lightBrown',
          lineHeight: 1.6,
          fontWeight: 300,
        },
        formTitle: {
          fontFamily: 'heading',
          fontSize: '1.3rem',
          color: 'brand.darkBrown',
          fontWeight: 600,
        },
        formSubtitle: {
          color: 'brand.mediumBrown',
          fontSize: '0.95rem',
        },
        location: {
          color: 'brand.mediumBrown',
          fontSize: '0.95rem',
        },
        highlight: {
          color: 'brand.mediumBrown',
          fontWeight: 500,
        },
      },
    },
    Box: {
      baseStyle: {
        transition: 'all 0.3s ease',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.cream',
        fontFamily: 'body',
        minHeight: '100vh',
        overflowX: 'hidden',
      },
      html: {
        textSizeAdjust: '100%',
        WebkitTextSizeAdjust: '100%',
      },
      'input[type="number"]': {
        appearance: 'textfield',
        MozAppearance: 'textfield',
      },
      'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
    },
  },
})

export default theme
