import React, { useState, useEffect } from 'react';
import { Box, TextField, Select, MenuItem, Button, Typography } from '@mui/material';
import { addApplication, getAllApplications } from '../utils/db'; // Import IndexedDB functions

export default function ApplicationsManager({ roles }) {
    const [applications, setApplications] = useState([]);
    const [newApplication, setNewApplication] = useState({
        job_title: '',
        company: '',
        date_applied: '',
        resume_version: '',
        selected_role: '',
    });

    // Load applications from IndexedDB when component mounts
    useEffect(() => {
        const loadApplications = async () => {
            const storedApplications = await getAllApplications();
            console.log("Loaded applications from IndexedDB:", storedApplications);
            setApplications(storedApplications);
        };
        loadApplications();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewApplication({
            ...newApplication,
            [name]: value,
        });
    };

    const handleAddApplication = async () => {
        if (!newApplication.job_title || !newApplication.company || !newApplication.date_applied) {
            alert('Please fill in all required fields.');
            return;
        }

        // Add the new application to the state
        const updatedApplications = [...applications, newApplication];
        setApplications(updatedApplications);

        // Save the application to IndexedDB
        await addApplication(newApplication);

        // Reset the form after adding
        setNewApplication({
            job_title: '',
            company: '',
            date_applied: '',
            resume_version: '',
            selected_role: '',
        });
    };

    // Log roles and check if resume_versions exists for each role
    console.log("Roles in ApplicationsManager:", roles);

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Add Job Application</Typography>

            {/* Job Title */}
            <TextField
                label="Job Title"
                name="job_title"
                value={newApplication.job_title}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            {/* Company */}
            <TextField
                label="Company"
                name="company"
                value={newApplication.company}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            {/* Date Applied */}
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
                    {/* Check if resume_versions exists */}
                    {roles
                        .find(role => role.role_name === newApplication.selected_role)
                        ?.resume_versions?.map((version, index) => (
                            <MenuItem key={index} value={version.version_number}>
                                {version.version_name || `Version ${version.version_number}`}
                            </MenuItem>
                        ))}
                </Select>
            )}

            {/* Add Application Button */}
            <Button variant="contained" color="primary" onClick={handleAddApplication}>
                Add Application
            </Button>

            {/* Applications List */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Applications List</Typography>
                <pre>{JSON.stringify(applications, null, 2)}</pre>
            </Box>
        </Box>
    );
}
