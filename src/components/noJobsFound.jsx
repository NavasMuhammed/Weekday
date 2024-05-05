import { Stack, Typography } from "@mui/material"

const NotFound = () => {
    return (
        <Stack gap={4} height='80vh' display='flex' alignItems='center' padding={2}>
            <img style={{
                width: '200px',
            }} src="/assets/noJobFound.png" alt="no job found" />
            <Typography variant="h3">No Jobs available for this category at the moment</Typography>
        </Stack>
    )
}

export default NotFound
