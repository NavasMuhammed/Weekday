import { useState } from "react";
import { selectOptions } from "../../utils/constants";
import { Stack } from "@mui/material";
import { InputField } from "../formElements/InputField";

import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/reducers/jobsSlice";
import './filterBar.css';
import { BasicSelect } from "../formElements/selectComponent";
const FilterBar = () => {
    // Initialize state for form fields
    const [formValues, setFormValues] = useState({
        experience: {},
        companyName: '',
        location: [],
        remote: [],
        techStack: [],
        role: [],
        minBasePay: {},
    });

    const dispatch = useDispatch();


    // Handle changing form fields
    const handleChange = (fieldName, selectedValue) => {
        setFormValues(prevState => ({
            ...prevState,
            [fieldName]: selectedValue,
        }));
        console.log('Form Values:', { ...formValues, [fieldName]: selectedValue });
        dispatch(setFilters({ ...formValues, [fieldName]: selectedValue }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Values:', formValues);
    };

    return (
        <form className="filter-bar-container" onSubmit={handleSubmit}>
            {/* Example select field for role */}
            <Stack rowGap={2} gap={1} direction='row' flexWrap='wrap'>
                <BasicSelect
                    name="experience"
                    options={selectOptions.experience}
                    isClearable={true}
                    onChange={handleChange}
                    label='Experience'
                />
                <InputField onChange={handleChange} name='companyName' label='Search Company Name' />
                <BasicSelect
                    name="location"
                    options={selectOptions.location}
                    isClearable={true}
                    onChange={handleChange}
                    width="150px"
                    multiSelect={true}
                    isSearchable
                    label='Location'
                />
                <BasicSelect
                    name="remote"
                    options={selectOptions.remote}
                    isClearable={true}
                    onChange={handleChange}
                    label='Remote'

                />
                <BasicSelect
                    name="techStack"
                    options={selectOptions.techStack}
                    isClearable={true}
                    onChange={handleChange}
                    multiSelect={true}
                    width="150px"
                    isSearchable
                    label='Tech Stack'
                />
                <BasicSelect
                    name="role"
                    options={selectOptions.role}
                    isClearable={true}
                    onChange={handleChange}
                    multiSelect={true}
                    width="100px"
                    label='Role'
                />
                <BasicSelect
                    name="minimumBasePay"
                    options={selectOptions.miniBasePay}
                    isClearable={true}
                    onChange={handleChange}
                    label='Minimum Base Pay'
                />
            </Stack>
        </form>
    );
};

export default FilterBar;