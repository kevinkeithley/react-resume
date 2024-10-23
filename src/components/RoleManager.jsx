import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function RoleManager({ roles, setRoles }) {
    const [newRole, setNewRole] = useState('');
    const [editRoleIndex, setEditRoleIndex] = useState(null);
    const [editRoleValue, setEditRoleValue] = useState('');

    // Load roles from localStorage when the component mounts
    useEffect(() => {
        const savedRoles = JSON.parse(localStorage.getItem('roles'));
        if (savedRoles) {
            setRoles(savedRoles);
        }
    }, []);

    // Save roles to localStorage whenever the roles state changes
    useEffect(() => {
        localStorage.setItem('roles', JSON.stringify(roles));
    }, [roles]);

    const handleAddRole = () => {
        setRoles([...roles, newRole]);
        setNewRole('');
    };

    const handleDeleteRole = (index) => {
        setRoles(roles.filter((_, i) => i !== index));
    };

    const handleEditRole = (index) => {
        setEditRoleIndex(index);
        setEditRoleValue(roles[index]);
    };

    const handleUpdateRole = () => {
        const updatedRoles = [...roles];
        updatedRoles[editRoleIndex] = editRoleValue;
        setRoles(updatedRoles);
        setEditRoleIndex(null);
        setEditRoleValue('');
    };

    return (
        <Box>
            <TextField
                label="Add New Role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleAddRole} sx={{ mt: 2 }}>
                Add Role
            </Button>

            <List>
                {roles.map((role, index) => (
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {editRoleIndex === index ? (
                            <TextField
                                value={editRoleValue}
                                onChange={(e) => setEditRoleValue(e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <span>{role}</span>
                        )}

                        {editRoleIndex === index ? (
                            <Button onClick={handleUpdateRole} sx={{ ml: 2 }}>
                                Save
                            </Button>
                        ) : (
                            <>
                                <IconButton onClick={() => handleEditRole(index)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteRole(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
