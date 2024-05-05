/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const InputField = ({ label, onChange, name }) => {
    const handleTextFieldChange = (e) => {
        // Extract name and value from the event target
        const { name, value } = e.target;
        // Call the passed onChange function with the extracted name and value
        onChange(name, value);
    };

    return (
        <Box
        >
            <TextField name={name} onChange={handleTextFieldChange} size='small' id="outlined-basic" label={label} variant="outlined" />
        </Box>
    );
}