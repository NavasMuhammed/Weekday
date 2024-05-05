import { useState } from "react";
import { selectOptions } from "../../utils/constants";
import { BasicSelect } from "../formElements/select";
import { Stack } from "@mui/material";
import { InputField } from "../formElements/InputField";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/reducers/jobsSlice";

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
                <BasicSelect
                    name="remote"
                    options={selectOptions.remote}
                    isClearable={true}
                    onChange={handleChange}
                    multiSelect={true}
                />
                <BasicSelect
                    name="techStack"
                    options={selectOptions.techStack}
                    isClearable={true}
                    onChange={handleChange}
                    multiSelect={true}
                    width="150px"
                />
                <BasicSelect
                    name="role"
                    options={selectOptions.role}
                    isClearable={true}
                    onChange={handleChange}
                    multiSelect={true}
                    width="100px"
                />
                <BasicSelect
                    name="minimumBasePay"
                    options={selectOptions.miniBasePay}
                    isClearable={true}
                    onChange={handleChange}
                />
            </Stack>
        </form>
    );
};

export default FilterBar;