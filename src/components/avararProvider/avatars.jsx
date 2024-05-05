/* eslint-disable react/prop-types */
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const RandomAvatars = ({ count }) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3380'];
    const initials = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getStatusColor = () => Math.random() < 0.5 ? '#63dd90' : '#dd6363';

    const avatars = Array.from({ length: count }, (_, index) => (
        <Box key={index} sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <Avatar
                sx={{
                    bgcolor: getRandomElement(colors),
                    width: 26,
                    height: 26,
                    filter: 'blur(1.5px)',
                    border: '2px solid #ffffff4f',
                }}
            >
                {getRandomElement(initials)}
            </Avatar>
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(),
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    filter: 'blur(1.5px)',
                    border: '2px solid #ffffff4f',
                }}
            />
        </Box>
    ));

    return (
        <Stack direction="row" spacing={1}>
            {avatars}
        </Stack>
    );
};