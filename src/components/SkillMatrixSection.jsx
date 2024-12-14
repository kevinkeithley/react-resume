import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton, Grid } from '@mui/material';
import {
    Delete as DeleteIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    Edit as EditIcon
} from '@mui/icons-material';

export default function SkillMatrixSection({ skillMatrix, setSkillMatrix }) {
    const [newCategory, setNewCategory] = useState('');
    const [newLevel, setNewLevel] = useState('');
    const [newName, setNewName] = useState('');
    const [newYears, setNewYears] = useState('');
    const [newComment, setNewComment] = useState('');

    // Editing states for entries
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedEntry, setEditedEntry] = useState({
        category: '',
        level: '',
        name: '',
        years: '',
        comment: ''
    });

    const addSkillEntry = () => {
        if (!newName.trim()) return;
        const newEntry = {
            category: newCategory,
            level: parseInt(newLevel, 10) || 0,
            name: newName,
            years: parseInt(newYears, 10) || 0,
            comment: newComment,
        };
        setSkillMatrix({
            ...skillMatrix,
            entries: [...skillMatrix.entries, newEntry]
        });
        setNewCategory('');
        setNewLevel('');
        setNewName('');
        setNewYears('');
        setNewComment('');
    };

    const deleteSkillEntry = (index) => {
        const updatedEntries = [...skillMatrix.entries];
        updatedEntries.splice(index, 1);
        setSkillMatrix({ ...skillMatrix, entries: updatedEntries });
    };

    const moveEntryUp = (index) => {
        if (index === 0) return;
        const updatedEntries = [...skillMatrix.entries];
        [updatedEntries[index - 1], updatedEntries[index]] = [updatedEntries[index], updatedEntries[index - 1]];
        setSkillMatrix({ ...skillMatrix, entries: updatedEntries });
    };

    const moveEntryDown = (index) => {
        if (index === skillMatrix.entries.length - 1) return;
        const updatedEntries = [...skillMatrix.entries];
        [updatedEntries[index + 1], updatedEntries[index]] = [updatedEntries[index], updatedEntries[index + 1]];
        setSkillMatrix({ ...skillMatrix, entries: updatedEntries });
    };

    const handleTitleChange = (e) => {
        setSkillMatrix({ ...skillMatrix, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setSkillMatrix({ ...skillMatrix, description: e.target.value });
    };

    const handleEditEntry = (index) => {
        const entry = skillMatrix.entries[index];
        setEditingIndex(index);
        setEditedEntry({
            category: entry.category || '',
            level: entry.level.toString(),
            name: entry.name || '',
            years: entry.years.toString(),
            comment: entry.comment || ''
        });
    };

    const handleSaveEditedEntry = () => {
        const updatedEntries = [...skillMatrix.entries];
        updatedEntries[editingIndex] = {
            category: editedEntry.category,
            level: parseInt(editedEntry.level, 10) || 0,
            name: editedEntry.name,
            years: parseInt(editedEntry.years, 10) || 0,
            comment: editedEntry.comment
        };
        setSkillMatrix({ ...skillMatrix, entries: updatedEntries });
        setEditingIndex(null);
        setEditedEntry({ category: '', level: '', name: '', years: '', comment: '' });
    };

    const handleCancelEditEntry = () => {
        setEditingIndex(null);
        setEditedEntry({ category: '', level: '', name: '', years: '', comment: '' });
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
                    <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        {editingIndex === index ? (
                            // Edit mode
                            <Box sx={{ width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Category"
                                            value={editedEntry.category}
                                            onChange={(e) => setEditedEntry({ ...editedEntry, category: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Level (0-5)"
                                            value={editedEntry.level}
                                            onChange={(e) => setEditedEntry({ ...editedEntry, level: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Skill Name"
                                            value={editedEntry.name}
                                            onChange={(e) => setEditedEntry({ ...editedEntry, name: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Years"
                                            value={editedEntry.years}
                                            onChange={(e) => setEditedEntry({ ...editedEntry, years: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Comment"
                                            value={editedEntry.comment}
                                            onChange={(e) => setEditedEntry({ ...editedEntry, comment: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleSaveEditedEntry} sx={{ mr: 1 }}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" onClick={handleCancelEditEntry}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            // Display mode
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <strong>{entry.category || 'No Category'}</strong> - Level {entry.level}, {entry.name} ({entry.years} years)
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
                                    <IconButton onClick={() => handleEditEntry(index)}>
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
