import React, { useState } from 'react';
import InputMask from 'react-input-mask'; // Import InputMask for phone number formatting
import { Button, TextField, Typography, Box, Grid } from '@mui/material';

export default function PersonalInfoForm({ personalInfo, setPersonalInfo }) {
    const [showOnlyWithValues, setShowOnlyWithValues] = useState(false); // Toggle for showing only fields with values

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({
            ...personalInfo,
            [name]: value,
        });
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({
            ...personalInfo,
            [name]: value,
        });
    };

    const toggleShowOnlyWithValues = () => {
        setShowOnlyWithValues(!showOnlyWithValues);
    };

    // Helper to determine if a field should be visible
    const shouldShowField = (value) => {
        return !showOnlyWithValues || value !== '';
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Personal Information
            </Typography>

            {/* Button to toggle showing only fields with values */}
            <Button
                variant="outlined"
                onClick={toggleShowOnlyWithValues}
                sx={{ mb: 2 }}
            >
                {showOnlyWithValues ? 'Show All Fields' : 'Show Only Fields With Values'}
            </Button>

            <Grid container spacing={2}>
                {/* First Name */}
                {shouldShowField(personalInfo.first_name) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            value={personalInfo.first_name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Last Name */}
                {shouldShowField(personalInfo.last_name) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="last_name"
                            value={personalInfo.last_name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Title */}
                {shouldShowField(personalInfo.title) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Title"
                            name="title"
                            placeholder="Job Title or Position (e.g., Software Engineer)"
                            value={personalInfo.title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Mobile with phone number formatting */}
                {shouldShowField(personalInfo.mobile) && (
                    <Grid item xs={12} sm={6}>
                        <InputMask
                            mask="(999) 999-9999"
                            value={personalInfo.mobile}
                            onChange={handlePhoneChange}
                        >
                            {() => (
                                <TextField
                                    label="Mobile"
                                    name="mobile"
                                    fullWidth
                                />
                            )}
                        </InputMask>
                    </Grid>
                )}

                {/* Email */}
                {shouldShowField(personalInfo.email) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={personalInfo.email}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Homepage */}
                {shouldShowField(personalInfo.homepage) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Homepage"
                            name="homepage"
                            value={personalInfo.homepage}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* LinkedIn with Placeholder */}
                {shouldShowField(personalInfo.linkedin) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="LinkedIn"
                            name="linkedin"
                            placeholder="Username (e.g., johndoe)"
                            value={personalInfo.linkedin}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* GitHub with Placeholder */}
                {shouldShowField(personalInfo.github) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="GitHub"
                            name="github"
                            placeholder="Username (e.g., johndoe)"
                            value={personalInfo.github}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* GitLab with Placeholder */}
                {shouldShowField(personalInfo.gitlab) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="GitLab"
                            name="gitlab"
                            placeholder="Username (e.g., johndoe)"
                            value={personalInfo.gitlab}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Address 1 - Custom Placeholder */}
                {shouldShowField(personalInfo.address_1) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address 1"
                            name="address_1"
                            placeholder="Number and Street"
                            value={personalInfo.address_1}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Address 2 - Custom Placeholder */}
                {shouldShowField(personalInfo.address_2) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address 2"
                            name="address_2"
                            placeholder="City and State"
                            value={personalInfo.address_2}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Address 3 - Custom Placeholder */}
                {shouldShowField(personalInfo.address_3) && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address 3"
                            name="address_3"
                            placeholder="Country"
                            value={personalInfo.address_3}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
