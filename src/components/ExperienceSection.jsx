import React, { useState } from 'react';
import {
    Button,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    IconButton,
    TextField,
    List,
    ListItem,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    Edit as EditIcon,
} from '@mui/icons-material';

export default function ExperienceSection({ experienceData, setExperienceData }) {
    const [newExperience, setNewExperience] = useState({
        start_year: '',
        end_year: '',
        job_title: '',
        employer: '',
        city: '',
        description: '',
        achievements: [{ text: '', subAchievements: [] }],
    });

    // State variables for editing experience entries
    const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);
    const [editedExperience, setEditedExperience] = useState(null);

    // Function to handle changes in the form inputs for new experience
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperience({
            ...newExperience,
            [name]: value,
        });
    };

    // Function to handle changes in the edited experience fields
    const handleEditedInputChange = (e) => {
        const { name, value } = e.target;
        setEditedExperience({
            ...editedExperience,
            [name]: value,
        });
    };

    // Function to add a new experience
    const addExperience = () => {
        setExperienceData([...experienceData, newExperience]);
        setNewExperience({
            start_year: '',
            end_year: '',
            job_title: '',
            employer: '',
            city: '',
            description: '',
            achievements: [{ text: '', subAchievements: [] }],
        });
    };

    // Function to initiate editing of an experience entry
    const handleEditExperience = (experienceIndex) => {
        setEditingExperienceIndex(experienceIndex);
        setEditedExperience({ ...experienceData[experienceIndex] });
    };

    // Function to save the edited experience entry
    const handleSaveEditedExperience = () => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[editingExperienceIndex] = editedExperience;
        setExperienceData(updatedExperiences);
        setEditingExperienceIndex(null);
        setEditedExperience(null);
    };

    // Function to cancel editing
    const handleCancelEditExperience = () => {
        setEditingExperienceIndex(null);
        setEditedExperience(null);
    };

    // Add Achievement
    const addAchievement = (experienceIndex) => {
        const updatedExperiences = [...experienceData];
        const updatedAchievements = [
            ...updatedExperiences[experienceIndex].achievements,
            { text: '', subAchievements: [] },
        ];
        updatedExperiences[experienceIndex] = {
            ...updatedExperiences[experienceIndex],
            achievements: updatedAchievements,
        };
        setExperienceData(updatedExperiences);
    };

    // Add Sub-Achievement
    const addSubAchievement = (experienceIndex, achievementIndex) => {
        const updatedExperiences = [...experienceData];
        const updatedSubAchievements = [
            ...updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements,
            { text: '' },
        ];
        updatedExperiences[experienceIndex].achievements[achievementIndex] = {
            ...updatedExperiences[experienceIndex].achievements[achievementIndex],
            subAchievements: updatedSubAchievements,
        };
        setExperienceData(updatedExperiences);
    };

    // Update Achievement Text
    const handleAchievementChange = (experienceIndex, achievementIndex, value) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[experienceIndex].achievements[achievementIndex].text = value;
        setExperienceData(updatedExperiences);
    };

    // Update Sub-Achievement Text
    const handleSubAchievementChange = (experienceIndex, achievementIndex, subIndex, value) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements[
            subIndex
        ].text = value;
        setExperienceData(updatedExperiences);
    };

    // Delete Achievement
    const deleteAchievement = (experienceIndex, achievementIndex) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[experienceIndex].achievements.splice(achievementIndex, 1);
        setExperienceData(updatedExperiences);
    };

    // Delete Sub-Achievement
    const deleteSubAchievement = (experienceIndex, achievementIndex, subIndex) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements.splice(
            subIndex,
            1
        );
        setExperienceData(updatedExperiences);
    };

    // Move Achievement Up
    const moveAchievementUp = (experienceIndex, achievementIndex) => {
        if (achievementIndex === 0) return;
        const updatedExperiences = [...experienceData];
        const achievements = updatedExperiences[experienceIndex].achievements;
        [achievements[achievementIndex - 1], achievements[achievementIndex]] = [
            achievements[achievementIndex],
            achievements[achievementIndex - 1],
        ];
        setExperienceData(updatedExperiences);
    };

    // Move Achievement Down
    const moveAchievementDown = (experienceIndex, achievementIndex) => {
        const updatedExperiences = [...experienceData];
        const achievements = updatedExperiences[experienceIndex].achievements;
        if (achievementIndex === achievements.length - 1) return;
        [achievements[achievementIndex + 1], achievements[achievementIndex]] = [
            achievements[achievementIndex],
            achievements[achievementIndex + 1],
        ];
        setExperienceData(updatedExperiences);
    };

    // Move Sub-Achievement Up
    const moveSubAchievementUp = (experienceIndex, achievementIndex, subIndex) => {
        if (subIndex === 0) return;
        const updatedExperiences = [...experienceData];
        const subAchievements =
            updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements;
        [subAchievements[subIndex - 1], subAchievements[subIndex]] = [
            subAchievements[subIndex],
            subAchievements[subIndex - 1],
        ];
        setExperienceData(updatedExperiences);
    };

    // Move Sub-Achievement Down
    const moveSubAchievementDown = (experienceIndex, achievementIndex, subIndex) => {
        const updatedExperiences = [...experienceData];
        const subAchievements =
            updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements;
        if (subIndex === subAchievements.length - 1) return;
        [subAchievements[subIndex + 1], subAchievements[subIndex]] = [
            subAchievements[subIndex],
            subAchievements[subIndex + 1],
        ];
        setExperienceData(updatedExperiences);
    };

    // Delete Experience
    const deleteExperience = (experienceIndex) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences.splice(experienceIndex, 1);
        setExperienceData(updatedExperiences);
    };

    // Move Experience Up
    const moveExperienceUp = (experienceIndex) => {
        if (experienceIndex === 0) return;
        const updatedExperiences = [...experienceData];
        [updatedExperiences[experienceIndex - 1], updatedExperiences[experienceIndex]] = [
            updatedExperiences[experienceIndex],
            updatedExperiences[experienceIndex - 1],
        ];
        setExperienceData(updatedExperiences);
    };

    // Move Experience Down
    const moveExperienceDown = (experienceIndex) => {
        if (experienceIndex === experienceData.length - 1) return;
        const updatedExperiences = [...experienceData];
        [updatedExperiences[experienceIndex + 1], updatedExperiences[experienceIndex]] = [
            updatedExperiences[experienceIndex],
            updatedExperiences[experienceIndex + 1],
        ];
        setExperienceData(updatedExperiences);
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Experience
            </Typography>

            {/* Form for adding new experience */}
            <Box component="form" sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    {/* Adjusted Grid items to include 'sm' props */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Job Title"
                            name="job_title"
                            value={newExperience.job_title}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Employer"
                            name="employer"
                            value={newExperience.employer}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={newExperience.city}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            label="Start Year"
                            name="start_year"
                            value={newExperience.start_year}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            label="End Year"
                            name="end_year"
                            value={newExperience.end_year}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            value={newExperience.description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>

                {/* Add Experience Button */}
                <Button variant="contained" color="primary" onClick={addExperience} sx={{ mt: 2 }}>
                    Add Experience
                </Button>
            </Box>

            {/* Display the list of experiences */}
            <Grid container spacing={3}>
                {experienceData.map((job, experienceIndex) => (
                    // **Add md={6} back to restore two-column layout**
                    <Grid item xs={12} md={6} key={experienceIndex}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={12} sm={9}>
                                        {/* Conditional Rendering for Editing */}
                                        {editingExperienceIndex === experienceIndex ? (
                                            <>
                                                {/* Editable Fields */}
                                                <TextField
                                                    fullWidth
                                                    label="Job Title"
                                                    name="job_title"
                                                    value={editedExperience.job_title}
                                                    onChange={handleEditedInputChange}
                                                    sx={{ mb: 1 }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Employer"
                                                    name="employer"
                                                    value={editedExperience.employer}
                                                    onChange={handleEditedInputChange}
                                                    sx={{ mb: 1 }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="City"
                                                    name="city"
                                                    value={editedExperience.city}
                                                    onChange={handleEditedInputChange}
                                                    sx={{ mb: 1 }}
                                                />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Start Year"
                                                            name="start_year"
                                                            value={editedExperience.start_year}
                                                            onChange={handleEditedInputChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="End Year"
                                                            name="end_year"
                                                            value={editedExperience.end_year}
                                                            onChange={handleEditedInputChange}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <TextField
                                                    fullWidth
                                                    label="Description"
                                                    name="description"
                                                    multiline
                                                    value={editedExperience.description}
                                                    onChange={handleEditedInputChange}
                                                    sx={{ mt: 2 }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {/* Display Fields */}
                                                <Typography variant="h6">{job.job_title}</Typography>
                                                <Typography variant="body1">
                                                    {job.employer}
                                                    {job.city && `, ${job.city}`}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {job.start_year} - {job.end_year}
                                                </Typography>
                                                {job.description && (
                                                    <Typography variant="body2" gutterBottom>
                                                        {job.description}
                                                    </Typography>
                                                )}
                                            </>
                                        )}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 1, sm: 0 } }}
                                    >
                                        <IconButton onClick={() => moveExperienceUp(experienceIndex)}>
                                            <ArrowUpwardIcon />
                                        </IconButton>
                                        <IconButton onClick={() => moveExperienceDown(experienceIndex)}>
                                            <ArrowDownwardIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteExperience(experienceIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        {/* Edit Button */}
                                        <IconButton onClick={() => handleEditExperience(experienceIndex)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                {/* Save and Cancel Buttons */}
                                {editingExperienceIndex === experienceIndex && (
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSaveEditedExperience}
                                            sx={{ mr: 1 }}
                                        >
                                            Save
                                        </Button>
                                        <Button variant="outlined" onClick={handleCancelEditExperience}>
                                            Cancel
                                        </Button>
                                    </Box>
                                )}

                                {/* Achievements */}
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Achievements:
                                </Typography>
                                <List>
                                    {job.achievements.map((achievement, achievementIndex) => (
                                        <ListItem
                                            key={achievementIndex}
                                            alignItems="flex-start"
                                            sx={{ paddingLeft: 0 }}
                                        >
                                            <Box sx={{ width: '100%' }}>
                                                <Grid container spacing={1} alignItems="center">
                                                    <Grid item xs={12} sm={10}>
                                                        <TextField
                                                            fullWidth
                                                            multiline
                                                            value={achievement.text}
                                                            onChange={(e) =>
                                                                handleAchievementChange(
                                                                    experienceIndex,
                                                                    achievementIndex,
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Achievement Text"
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={2}
                                                        sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 1, sm: 0 } }}
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                moveAchievementUp(experienceIndex, achievementIndex)
                                                            }
                                                        >
                                                            <ArrowUpwardIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() =>
                                                                moveAchievementDown(experienceIndex, achievementIndex)
                                                            }
                                                        >
                                                            <ArrowDownwardIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() =>
                                                                deleteAchievement(experienceIndex, achievementIndex)
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>

                                                {/* Sub-Achievements */}
                                                <List sx={{ pl: { xs: 2, sm: 4 } }}>
                                                    {achievement.subAchievements.map((sub, subIndex) => (
                                                        <ListItem
                                                            key={subIndex}
                                                            alignItems="flex-start"
                                                            sx={{ paddingLeft: 0 }}
                                                        >
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs={12} sm={10}>
                                                                    <TextField
                                                                        fullWidth
                                                                        multiline
                                                                        value={sub.text}
                                                                        onChange={(e) =>
                                                                            handleSubAchievementChange(
                                                                                experienceIndex,
                                                                                achievementIndex,
                                                                                subIndex,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="Sub-Achievement Text"
                                                                    />
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sm={2}
                                                                    sx={{
                                                                        textAlign: { xs: 'left', sm: 'right' },
                                                                        mt: { xs: 1, sm: 0 },
                                                                    }}
                                                                >
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            moveSubAchievementUp(
                                                                                experienceIndex,
                                                                                achievementIndex,
                                                                                subIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        <ArrowUpwardIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            moveSubAchievementDown(
                                                                                experienceIndex,
                                                                                achievementIndex,
                                                                                subIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        <ArrowDownwardIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            deleteSubAchievement(
                                                                                experienceIndex,
                                                                                achievementIndex,
                                                                                subIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
                                                        </ListItem>
                                                    ))}
                                                    <ListItem sx={{ paddingLeft: 0 }}>
                                                        <Button
                                                            onClick={() =>
                                                                addSubAchievement(experienceIndex, achievementIndex)
                                                            }
                                                            sx={{ ml: { xs: 0, sm: 2 } }}
                                                        >
                                                            Add Sub-Achievement
                                                        </Button>
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </ListItem>
                                    ))}
                                    <ListItem sx={{ paddingLeft: 0 }}>
                                        <Button onClick={() => addAchievement(experienceIndex)}>Add Achievement</Button>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
