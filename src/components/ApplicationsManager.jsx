import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography } from '@mui/material';

export default function ApplicationsManager({ applications, setApplications, roles }) {
    const [newApplication, setNewApplication] = useState({
        job_title: '',
        company: '',
        date_applied: '',
        resume_version: '',
        selected_role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewApplication({
            ...newApplication,
            [name]: value,
        });
    };

    const handleAddApplication = () => {
        setApplications([...applications, newApplication]);
        setNewApplication({
            job_title: '',
            company: '',
            date_applied: '',
            resume_version: '',
            selected_role: '',
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Add Job Application</Typography>

            <TextField
                label="Job Title"
                name="job_title"
                value={newApplication.job_title}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Company"
                name="company"
                value={newApplication.company}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Date Applied"
                name="date_applied"
                type="date"
                value={newApplication.date_applied}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 2 }}
            />

            {/* Select Role */}
            <Select
                value={newApplication.selected_role}
                name="selected_role"
                onChange={handleChange}
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
            >
                <MenuItem value="" disabled>
                    Select Role for Resume
                </MenuItem>
                {roles.map((role, index) => (
                    <MenuItem key={index} value={role.role_name}>
                        {role.role_name}
                    </MenuItem>
                ))}
            </Select>

            {/* Select Resume Version */}
            {newApplication.selected_role && (
                <Select
                    value={newApplication.resume_version}
                    name="resume_version"
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="" disabled>
                        Select Resume Version
                    </MenuItem>
                    {roles
                        .find(role => role.role_name === newApplication.selected_role)
                        .resume_versions.map((version, index) => (
                            <MenuItem key={index} value={version.version_number}>
                                {version.version_name || `Version ${version.version_number}`}
                            </MenuItem>
                        ))}
                </Select>
            )}

            <Button variant="contained" color="primary" onClick={handleAddApplication}>
                Add Application
            </Button>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Applications List</Typography>
                <pre>{JSON.stringify(applications, null, 2)}</pre>
            </Box>
        </Box>
    );
}
