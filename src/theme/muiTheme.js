import { createTheme, keyframes } from '@mui/material';
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
// Step 1: Create your custom theme
export const theme = createTheme({
    typography: {
        fontFamily: 'Lexend', // Replace '__LexendFont_7838d2, __LexendFont_Fallback_7838d2' with 'Lexend, sans-serif'
        allVariants: {
            color: 'darkslategray',
        },
        h6: {
            fontSize: '13px',
            fontWeight: 600,
            color: '#8b8b8b',
            textAlign: 'left',
        },
        subtitle1: {
            fontSize: '14px',
            textAlign: 'left',
        },
        subtitle2: {
            fontSize: '11px',
            textAlign: 'left',
            fontWeight: 500,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            textAlign: 'left',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Example button styles
                    borderRadius: 8,
                    border: 0,
                    color: 'black',
                    height: 48,
                    padding: '8px 18px',
                    width: '100%',
                },
                apply: {
                    background: 'rgb(85, 239, 196)',
                    color: 'black',
                    '&:hover': {
                        background: '#00d1b2'
                    },
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '16px',
                },
                referral: {
                    background: '#4943da',
                    color: 'white',
                    '&:hover': {
                        background: '#4943da',
                    },
                    fontWeight: 300,
                    fontSize: '13px',
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                jobCard: {
                    maxWidth: 345,
                    minWidth: 275,
                    minHeight: 275,
                    borderRadius: 20,
                    transition: 'all 0.3s',
                    animation: `${slideUp} 0.3s ease-out forwards`,
                },
            },
        },
    },
});

