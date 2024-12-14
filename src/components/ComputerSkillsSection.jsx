import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon, ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

export default function ComputerSkillsSection({ computerSkills, setComputerSkills }) {
    const [newCategory, setNewCategory] = useState('');
    const [newSkills, setNewSkills] = useState('');

    const addSkill = () => {
        if (!newCategory.trim() || !newSkills.trim()) return;
        setComputerSkills((prev) => [...prev, { category: newCategory, skills: newSkills }]);
        setNewCategory('');
        setNewSkills('');
    };

    const deleteSkill = (index) => {
        setComputerSkills((prev) => prev.filter((_, i) => i !== index));
    };

    const moveSkillUp = (index) => {
        if (index === 0) return;
        setComputerSkills((prev) => {
            const updated = [...prev];
            [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
            return updated;
        });
    };

    const moveSkillDown = (index) => {
        setComputerSkills((prev) => {
            if (index === prev.length - 1) return prev;
            const updated = [...prev];
            [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
            return updated;
        });
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
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
