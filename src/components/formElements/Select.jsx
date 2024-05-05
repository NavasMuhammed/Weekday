/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Select from 'react-select';

export const BasicSelect = ({ name, options, isClearable, isSearchable, onChange, multiSelect, width = 'max-content' }) => {
    return (
        <Box sx={{ width: 'max-content' }}>
            <FormControl fullWidth>
                <Select
                    className="basic-single"
                    placeholder={name}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    isMulti={multiSelect}
                    name={name}
                    options={options}
                    onChange={(selectedOption) => onChange(name, selectedOption ? selectedOption : [])}
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            height: '40px',
                            minWidth: width,
                        }),

                    }}
                />

            </FormControl>
        </Box>
    );
}
