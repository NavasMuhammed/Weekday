import { useState } from "react";
import { selectOptions } from "../../utils/constants";
import { BasicSelect } from "../formElements/select";
import { Stack } from "@mui/material";
import { InputField } from "../formElements/InputField";

const FilterBar = () => {
    // Initialize state for form fields
    const [formValues, setFormValues] = useState({
        experience: {},
        companyName: '',
        location: [],
        remote: '',
        techStack: '',
        role: '',
        minBasePay: '',
    });



    // Handle changing form fields
    const handleChange = (fieldName, selectedValue) => {
        setFormValues(prevState => ({
            ...prevState,
            [fieldName]: selectedValue,
        }));
        console.log('Form Values:', { ...formValues, [fieldName]: selectedValue });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Values:', formValues);
    };

    return (
        <form className="filter-bar-container" onSubmit={handleSubmit}>
            {/* Example select field for role */}
            <Stack spacing={2} direction='row' flexWrap='wrap'>
                <BasicSelect
                    name="experience"
                    options={selectOptions.experience}
                    isClearable={true}
                    onChange={handleChange}
                />
                <InputField onChange={handleChange} name='companyName' label='Search Company Name' />
                <BasicSelect
                    name="location"
                    options={selectOptions.location}
                    isClearable={true}
                    onChange={handleChange}
                    width="150px"
                    multiSelect={true}
                />
            </Stack>
            {/* Submit button */}
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default FilterBar;