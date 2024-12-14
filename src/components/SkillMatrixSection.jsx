import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton, Grid } from '@mui/material';
import { Delete as DeleteIcon, ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

export default function SkillMatrixSection({ skillMatrix, setSkillMatrix }) {
    const [newCategory, setNewCategory] = useState('');
    const [newLevel, setNewLevel] = useState('');
    const [newName, setNewName] = useState('');
    const [newYears, setNewYears] = useState('');
    const [newComment, setNewComment] = useState('');

    const addSkillEntry = () => {
        if (!newName.trim()) return;
        setSkillMatrix((prev) => ({
            ...prev,
            entries: [
                ...prev.entries,
                {
                    category: newCategory,
                    level: parseInt(newLevel, 10) || 0,
                    name: newName,
                    years: parseInt(newYears, 10) || 0,
                    comment: newComment,
                },
            ],
        }));
        setNewCategory('');
        setNewLevel('');
        setNewName('');
        setNewYears('');
        setNewComment('');
    };

    const deleteSkillEntry = (index) => {
        setSkillMatrix((prev) => ({
            ...prev,
            entries: prev.entries.filter((_, i) => i !== index),
        }));
    };

    const moveEntryUp = (index) => {
        setSkillMatrix((prev) => {
            if (index === 0) return prev;
            const updatedEntries = [...prev.entries];
            [updatedEntries[index - 1], updatedEntries[index]] = [updatedEntries[index], updatedEntries[index - 1]];
            return { ...prev, entries: updatedEntries };
        });
    };

    const moveEntryDown = (index) => {
        setSkillMatrix((prev) => {
            if (index === prev.entries.length - 1) return prev;
            const updatedEntries = [...prev.entries];
            [updatedEntries[index + 1], updatedEntries[index]] = [updatedEntries[index], updatedEntries[index + 1]];
            return { ...prev, entries: updatedEntries };
        });
    };

    const handleTitleChange = (e) => {
        setSkillMatrix((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleDescriptionChange = (e) => {
        setSkillMatrix((prev) => ({ ...prev, description: e.target.value }));
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Skill Matrix
            </Typography>
            <TextField
                fullWidth
                label="Title"
                value={skillMatrix.title}
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Description"
                value={skillMatrix.description}
                onChange={handleDescriptionChange}
                sx={{ mb: 2 }}
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Level (0-5)"
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Skill Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        fullWidth
                        label="Years"
                        value={newYears}
                        onChange={(e) => setNewYears(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        fullWidth
                        label="Comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" onClick={addSkillEntry} sx={{ mb: 2 }}>
                Add Skill Entry
            </Button>

            <List>
                {skillMatrix.entries.map((entry, index) => (
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <strong>{entry.category || 'No Category'}</strong> - Level {entry.level}, {entry.name} ({entry.years} years){' '}
                            {entry.comment && ` - ${entry.comment}`}
                        </Box>
                        <Box>
                            <IconButton onClick={() => moveEntryUp(index)}>
                                <ArrowUpwardIcon />
                            </IconButton>
                            <IconButton onClick={() => moveEntryDown(index)}>
                                <ArrowDownwardIcon />
                            </IconButton>
                            <IconButton onClick={() => deleteSkillEntry(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
