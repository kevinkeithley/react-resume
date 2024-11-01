import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';

export default function PersonalInfoForm({ personalInfo, setPersonalInfo }) {
    const [showOnlyWithValues, setShowOnlyWithValues] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({
            ...personalInfo,
            [name]: value,
        });
    };

    const toggleShowOnlyWithValues = () => {
        setShowOnlyWithValues(!showOnlyWithValues);
    };

    // Array of field configurations
    const fields = [
        {
            label: 'First Name',
            name: 'first_name',
            placeholder: '',
        },
        {
            label: 'Last Name',
            name: 'last_name',
            placeholder: '',
        },
        {
            label: 'Title',
            name: 'title',
            placeholder: 'Job Title or Position (e.g., Software Engineer)',
        },
        {
            label: 'Mobile',
            name: 'mobile',
            placeholder: '',
            isPhone: true, // Custom flag to identify phone fields
        },
        {
            label: 'Email',
            name: 'email',
            placeholder: '',
        },
        {
            label: 'Homepage',
            name: 'homepage',
            placeholder: '',
        },
        {
            label: 'LinkedIn',
            name: 'linkedin',
            placeholder: 'Username (e.g., johndoe)',
        },
        {
            label: 'GitHub',
            name: 'github',
            placeholder: 'Username (e.g., johndoe)',
        },
        {
            label: 'GitLab',
            name: 'gitlab',
            placeholder: 'Username (e.g., johndoe)',
        },
        {
            label: 'Address 1',
            name: 'address_1',
            placeholder: 'Number and Street',
        },
        {
            label: 'Address 2',
            name: 'address_2',
            placeholder: 'City and State',
        },
        {
            label: 'Address 3',
            name: 'address_3',
            placeholder: 'Country',
        },
    ];

    // Filter fields based on the toggle state
    const visibleFields = showOnlyWithValues
        ? fields.filter((field) => personalInfo[field.name] !== '')
        : fields;

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Personal Information
            </Typography>

            <Grid container spacing={2}>
                {visibleFields.map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        {field.isPhone ? (
                            <InputMask
                                mask="(999) 999-9999"
                                value={personalInfo[field.name]}
                                onChange={handleChange}
                            >
                                {(inputProps) => (
                                    <TextField
                                        {...inputProps}
                                        label={field.label}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        fullWidth
                                    />
                                )}
                            </InputMask>
                        ) : (
                            <TextField
                                label={field.label}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={personalInfo[field.name]}
                                onChange={handleChange}
                                fullWidth
                            />
                        )}
                    </Grid>
                ))}

                {/* Toggle Button at the Bottom */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        onClick={toggleShowOnlyWithValues}
                        sx={{ mt: 2 }}
                    >
                        {showOnlyWithValues ? 'Show All Fields' : 'Show Only Fields With Values'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
