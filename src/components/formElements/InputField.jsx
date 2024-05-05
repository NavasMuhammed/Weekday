/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
};

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
            <TextField name={name} onChange={debounce(handleTextFieldChange, 1000)} size='small' id="outlined-basic" label={label} variant="outlined" />
        </Box>
    );
}