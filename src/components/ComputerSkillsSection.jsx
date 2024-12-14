import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton, Grid } from '@mui/material';
import {
    Delete as DeleteIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    Edit as EditIcon
} from '@mui/icons-material';

export default function ComputerSkillsSection({ computerSkills, setComputerSkills }) {
    const [newCategory, setNewCategory] = useState('');
    const [newSkills, setNewSkills] = useState('');

    // Editing states
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedSkill, setEditedSkill] = useState({ category: '', skills: '' });

    const addSkill = () => {
        if (!newCategory.trim() || !newSkills.trim()) return;
        setComputerSkills([...computerSkills, { category: newCategory, skills: newSkills }]);
        setNewCategory('');
        setNewSkills('');
    };

    const deleteSkill = (index) => {
        const updated = [...computerSkills];
        updated.splice(index, 1);
        setComputerSkills(updated);
    };

    const moveSkillUp = (index) => {
        if (index === 0) return;
        const updated = [...computerSkills];
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
        setComputerSkills(updated);
    };

    const moveSkillDown = (index) => {
        if (index === computerSkills.length - 1) return;
        const updated = [...computerSkills];
        [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
        setComputerSkills(updated);
    };

    const handleEditSkill = (index) => {
        setEditingIndex(index);
        setEditedSkill({ ...computerSkills[index] });
    };

    const handleSaveEditedSkill = () => {
        const updated = [...computerSkills];
        updated[editingIndex] = editedSkill;
        setComputerSkills(updated);
        setEditingIndex(null);
        setEditedSkill({ category: '', skills: '' });
    };

    const handleCancelEditSkill = () => {
        setEditingIndex(null);
        setEditedSkill({ category: '', skills: '' });
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Computer Skills
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label="Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Skills (comma separated)"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={addSkill}>
                    Add Computer Skill
                </Button>
            </Box>
            <List>
                {computerSkills.map((item, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        {editingIndex === index ? (
                            // Edit mode
                            <Box sx={{ width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Category"
                                            value={editedSkill.category}
                                            onChange={(e) => setEditedSkill({ ...editedSkill, category: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Skills"
                                            value={editedSkill.skills}
                                            onChange={(e) => setEditedSkill({ ...editedSkill, skills: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleSaveEditedSkill} sx={{ mr: 1 }}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" onClick={handleCancelEditSkill}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            // Display mode
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <strong>{item.category}:</strong> {item.skills}
                                </Box>
                                <Box>
                                    <IconButton onClick={() => moveSkillUp(index)}>
                                        <ArrowUpwardIcon />
                                    </IconButton>
                                    <IconButton onClick={() => moveSkillDown(index)}>
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteSkill(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleEditSkill(index)}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
