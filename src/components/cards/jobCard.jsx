/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import './card.css';

import { Box, Modal } from '@mui/material';
import { formatExperience, toTitleCase } from '../../utils/helper';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'scale(1.02)',
    },
    minWidth: 275,
    minHeight: 275,
    borderRadius: 20,
    transition: 'all 0.3s',
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
            <CardContent>
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
                        <Typography variant="body2">Estimated Salary: {jobDetails.minJdSalary ? `$${jobDetails.minJdSalary} - ` : ''}{jobDetails.maxJdSalary ? `$${jobDetails.maxJdSalary}` : ''}✅</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className='job-description' variant="body2">{jobDetails.jobDetailsFromCompany.substring(0, 650)}...</Typography>
                        <a className='show-description-btn' onClick={handleOpen}>Show more</a>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Minimum Experience</Typography>
                        <Typography variant="subtitle1">
                            {formatExperience(jobDetails.minExp, jobDetails.maxExp)}
                        </Typography>
                        <Button component="a" href={jobDetails.jdLink} target="_blank" rel="noopener noreferrer">
                            Easy Apply
                        </Button>
                    </Grid>
                </Grid>
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