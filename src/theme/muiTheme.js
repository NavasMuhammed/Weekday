import { createTheme } from '@mui/material';

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
});
