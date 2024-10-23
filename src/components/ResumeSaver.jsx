import React, { useState } from 'react';
import { Button, Box, MenuItem, Select, TextField } from '@mui/material';

export default function ResumeSaver({ roles, formData, setRoles }) {
    const [selectedRole, setSelectedRole] = useState('');
    const [versionName, setVersionName] = useState('');

    const handleSaveResume = () => {
        if (!selectedRole) {
            alert('Please select a role.');
            return;
        }

        // Find the selected role and append a new version
        const updatedRoles = roles.map((role) => {
            if (role.role_name === selectedRole) {
                const newVersionNumber = role.resume_versions.length + 1;
                return {
                    ...role,
                    resume_versions: [
                        ...role.resume_versions,
                        {
                            version_number: newVersionNumber,
                            version_name: versionName || `Version ${newVersionNumber}`,
                            date: new Date().toISOString().split('T')[0],
                            resume_data: formData,
                        },
                    ],
                };
            }
            return role;
        });

        setRoles(updatedRoles);
        setVersionName('');  // Reset version name after saving
        alert('Resume version saved successfully!');
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
                    Select Role for Resume
                </MenuItem>
                {roles.map((role, index) => (
                    <MenuItem key={index} value={role.role_name}>
                        {role.role_name}
                    </MenuItem>
                ))}
            </Select>

            {/* Input for New Version Name */}
            <TextField
                label="Version Name (Optional)"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />

            {/* Save Resume Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveResume}
            >
                Save Resume
            </Button>
        </Box>
    );
}