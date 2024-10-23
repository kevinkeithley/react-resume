import React, { useState } from 'react';
import { Box, MenuItem, Select, Button } from '@mui/material';

export default function ResumeLoader({ roles, setFormData }) {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');

    const handleLoadResume = () => {
        if (!selectedRole || !selectedVersion) {
            alert('Please select a role and version.');
            return;
        }

        // Get the selected resume data
        const selectedResumeData = roles
            .find(role => role.role_name === selectedRole)
            .resume_versions.find(version => version.version_number === parseInt(selectedVersion))
            .resume_data;

        setFormData(selectedResumeData); // Load the form data with the selected version
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* Select Role Dropdown */}
            <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
            >
                <MenuItem value="" disabled>
                    Select Role to Load
                </MenuItem>
                {roles.map((role, index) => (
                    <MenuItem key={index} value={role.role_name}>
                        {role.role_name}
                    </MenuItem>
                ))}
            </Select>

            {/* Select Version Dropdown */}
            {selectedRole && (
                <Select
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="" disabled>
                        Select Version
                    </MenuItem>
                    {roles
                        .find(role => role.role_name === selectedRole)
                        .resume_versions.map((version, index) => (
                            <MenuItem key={index} value={version.version_number}>
                                {version.version_name || `Version ${version.version_number}`}
                            </MenuItem>
                        ))}
                </Select>
            )}

            {/* Load Resume Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleLoadResume}
            >
                Load Resume
            </Button>
        </Box>
    );
}
