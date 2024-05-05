/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import './card.css';
import { Box, Modal } from '@mui/material';
import { formatExperience, getRandomNumber, toTitleCase } from '../../utils/helper';
import { RandomAvatars } from '../avararProvider/avatars';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],

    '&:hover': {
        transform: 'scale(1.01)',
    },
    ...(theme.components?.MuiCard?.styleOverrides?.jobCard ?? {})
}));


const ReferralButton = styled(Button)(({ theme }) => ({
    ...(theme.components?.MuiButton?.styleOverrides?.referral ?? {}),
}));

const ApplyButton = styled(Button)(({ theme }) => ({
    ...(theme.components?.MuiButton?.styleOverrides?.apply ?? {}),
}));

const PostedOnCard = styled(Card)(({ theme }) => ({
    ...(theme.components?.MuiTypography?.styleOverrides?.subtitle2 ?? {}),
    width: 'fit-content',
    padding: '2px 6px',
    borderRadius: 10,
    border: '1px solid #e0e0e0',
    boxShadow: '0 0 5px #e0e0e0',
}));


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 8,
};

const JobCard = ({ jobDetails }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <StyledCard>
            <CardContent sx={{ marginBottom: -2 }}>
                <Stack gap={2}>
                    <PostedOnCard>
                        <Typography variant="subtitle2">⌛ Posted {getRandomNumber(5, 30)} days ago</Typography>
                    </PostedOnCard>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            {/* <Stack justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%', height: '100%' }}
                        > */}
                            <img
                                src={jobDetails.logoUrl}
                                alt={`${jobDetails.companyName} Logo`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            {/* </Stack> */}
                        </Grid>
                        <Grid item xs={10} container direction="column" justifyContent="space-between">
                            <Typography variant="h6">{jobDetails.companyName}</Typography>
                            <Typography variant="subtitle1">{toTitleCase(jobDetails.jobRole)}</Typography>
                            <Typography variant="subtitle2">{toTitleCase(jobDetails.location)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">Estimated Salary: ₹{jobDetails.minJdSalary ? `${jobDetails.minJdSalary} - ` : ''}{jobDetails.maxJdSalary ? `${jobDetails.maxJdSalary}` : ''} LPA✅</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack gap={0.5}>
                                <Typography variant="h2">About Company:</Typography>
                                <Typography variant="h3">About us</Typography>
                            </Stack>
                            <Typography className='job-description' variant="body2">{jobDetails.jobDetailsFromCompany.substring(0, 450)}...</Typography>
                            <a className='show-description-btn' onClick={handleOpen}>Show more</a>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Stack>
                                    <Typography variant="h6">Minimum Experience</Typography>
                                    <Typography variant="subtitle1">
                                        {formatExperience(jobDetails.minExp, jobDetails.maxExp)}
                                    </Typography>
                                </Stack>
                                <Stack spacing={1}>
                                    <ApplyButton variant='apply' href={jobDetails.jdLink} target="_blank" rel="noopener noreferrer">
                                        ⚡ Easy Apply
                                    </ApplyButton>
                                    <ReferralButton variant='referal' href={jobDetails.jdLink} target="_blank" rel="noopener noreferrer">
                                        <Stack alignItems='center' direction='row' gap={2} spacing={2}>
                                            <RandomAvatars count={2} />
                                            Unlock referral asks
                                        </Stack>
                                    </ReferralButton>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>

            </CardContent>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Full Description
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {jobDetails.jobDetailsFromCompany}
                    </Typography>
                </Box>
            </Modal>
        </StyledCard>
    );
};

export default JobCard;