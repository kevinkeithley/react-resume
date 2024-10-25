import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Select, Button } from '@mui/material';
import { getAllRoles } from '../utils/db'; // Import the getAllRoles function from db.js

export default function ResumeLoader({ setFormData }) {
    const [roles, setRoles] = useState([]); // We'll fetch roles from IndexedDB
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');

    // Fetch roles from IndexedDB when the component mounts
    useEffect(() => {
        const fetchRoles = async () => {
            const allRoles = await getAllRoles();
            setRoles(allRoles);
        };
        fetchRoles();
    }, []);

    const handleLoadResume = () => {
        if (!selectedRole || !selectedVersion) {
            alert('Please select a role and version.');
            return;
        }

        // Get the selected role and version data
        const selectedRoleData = roles.find(role => role.role_name === selectedRole);
        const selectedVersionData = selectedRoleData.resume_versions.find(
            version => version.version_name === selectedVersion
        );

        if (!selectedVersionData) {
            alert('Selected version not found.');
            return;
        }

        setFormData(selectedVersionData.resume_data); // Load the form data with the selected version
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* Select Role Dropdown */}
            <Select
                value={selectedRole}
                onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setSelectedVersion(''); // Reset selected version when role changes
                }}
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
                        ?.resume_versions?.map((version, index) => (
                            <MenuItem key={index} value={version.version_name}>
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
