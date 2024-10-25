import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addRole, getAllRoles, updateRole, deleteRole } from '../utils/db'; // Import the IndexedDB functions

export default function RoleManager({ roles, setRoles }) {
    const [newRole, setNewRole] = useState('');
    const [editRoleIndex, setEditRoleIndex] = useState(null);
    const [editRoleValue, setEditRoleValue] = useState('');

    // Load roles from IndexedDB when the component mounts
    useEffect(() => {
        const loadRoles = async () => {
            const storedRoles = await getAllRoles();
            setRoles(storedRoles);
        };
        loadRoles();
    }, [setRoles]);

    const handleAddRole = async () => {
        if (newRole.trim() === '') {
            alert('Role name cannot be empty.');
            return;
        }

        const newRoleData = { role_name: newRole, resume_versions: [] };

        // Save the new role in IndexedDB
        await addRole(newRoleData);

        // Fetch all roles from IndexedDB to get the updated list (with the new role's ID)
        const updatedRoles = await getAllRoles();
        setRoles(updatedRoles);

        setNewRole('');  // Reset input field
    };


    const handleDeleteRole = async (index) => {
        const roleToDelete = roles[index];

        // Delete the role from IndexedDB
        await deleteRole(roleToDelete.id);

        // Fetch the updated list of roles from IndexedDB after deletion
        const updatedRoles = await getAllRoles();
        setRoles(updatedRoles);
    };


    const handleEditRole = (index) => {
        setEditRoleIndex(index);
        setEditRoleValue(roles[index].role_name);
    };

    const handleUpdateRole = async () => {
        const updatedRoles = [...roles];
        updatedRoles[editRoleIndex].role_name = editRoleValue;

        // Update the role in IndexedDB
        await updateRole(updatedRoles[editRoleIndex].id, updatedRoles[editRoleIndex]);

        // Fetch the updated list of roles from IndexedDB after updating
        const allRoles = await getAllRoles();
        setRoles(allRoles);

        setEditRoleIndex(null);
        setEditRoleValue('');  // Reset edit field
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
                            <span>{role.role_name}</span>  // Display the role_name
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
