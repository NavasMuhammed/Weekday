import { Button, Card, styled } from "@mui/material";

// Styled components
export const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],

    '&:hover': {
        transform: 'scale(1.01)',
    },
    ...(theme.components?.MuiCard?.styleOverrides?.jobCard ?? {})
}));


export const ReferralButton = styled(Button)(({ theme }) => ({
    ...(theme.components?.MuiButton?.styleOverrides?.referral ?? {}),
}));

export const ApplyButton = styled(Button)(({ theme }) => ({
    ...(theme.components?.MuiButton?.styleOverrides?.apply ?? {}),
}));

export const PostedOnCard = styled(Card)(({ theme }) => ({
    ...(theme.components?.MuiTypography?.styleOverrides?.subtitle2 ?? {}),
    width: 'fit-content',
    padding: '2px 6px',
    borderRadius: 10,
    border: '1px solid #e0e0e0',
    boxShadow: '0 0 5px #e0e0e0',
}));


export const DescriptionBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 8,
};