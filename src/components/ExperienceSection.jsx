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
    ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ExperienceSection({ experienceData, setExperienceData }) {
    const [newExperience, setNewExperience] = useState({
        start_year: '',
        end_year: '',
        job_title: '',
        employer: '',
        city: '',
        description: '',
        achievements: [{ text: '', subAchievements: [] }]
    });

    // Function to handle changes in the form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperience({
            ...newExperience,
            [name]: value,
        });
    };

    // Add Achievement
    const addAchievement = (experienceIndex) => {
        const updatedExperiences = [...experienceData];
        const updatedAchievements = [
            ...updatedExperiences[experienceIndex].achievements,
            { text: '', subAchievements: [] }
        ];
        updatedExperiences[experienceIndex] = {
            ...updatedExperiences[experienceIndex],
            achievements: updatedAchievements,
        };
        setExperienceData(updatedExperiences);
    };

    // Add sub-achievement
    const addSubAchievement = (experienceIndex, achievementIndex) => {
        const updatedExperiences = [...experienceData];
        const updatedSubAchievements = [
            ...updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements,
            { text: '' }
        ];
        updatedExperiences[experienceIndex].achievements[achievementIndex] = {
            ...updatedExperiences[experienceIndex].achievements[achievementIndex],
            subAchievements: updatedSubAchievements,
        };
        setExperienceData(updatedExperiences);
    };

    // Update experience
    const addExperience = () => {
        setExperienceData([...experienceData, newExperience]);
        setNewExperience({
            start_year: '',
            end_year: '',
            job_title: '',
            employer: '',
            city: '',
            description: '',
            achievements: [{ text: '', subAchievements: [] }]
        });
    };

    // Update Achievement text
    const handleAchievementChange = (experienceIndex, achievementIndex, value) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[experienceIndex].achievements[achievementIndex].text = value;
        setExperienceData(updatedExperiences);
    };

    // Update Sub-Achievement text
    const handleSubAchievementChange = (experienceIndex, achievementIndex, subIndex, value) => {
        const updatedExperiences = [...experienceData];
        updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements[subIndex].text = value;
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
        updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements.splice(subIndex, 1);
        setExperienceData(updatedExperiences);
    };

    // Move Achievement Up
    const moveAchievementUp = (experienceIndex, achievementIndex) => {
        if (achievementIndex === 0) return;
        const updatedExperiences = [...experienceData];
        const achievements = updatedExperiences[experienceIndex].achievements;
        [achievements[achievementIndex - 1], achievements[achievementIndex]] = [achievements[achievementIndex], achievements[achievementIndex - 1]];
        setExperienceData(updatedExperiences);
    };

    // Move Achievement Down
    const moveAchievementDown = (experienceIndex, achievementIndex) => {
        const updatedExperiences = [...experienceData];
        const achievements = updatedExperiences[experienceIndex].achievements;
        if (achievementIndex === achievements.length - 1) return;
        [achievements[achievementIndex + 1], achievements[achievementIndex]] = [achievements[achievementIndex], achievements[achievementIndex + 1]];
        setExperienceData(updatedExperiences);
    };

    // Move Sub-Achievement Up
    const moveSubAchievementUp = (experienceIndex, achievementIndex, subIndex) => {
        if (subIndex === 0) return;
        const updatedExperiences = [...experienceData];
        const subAchievements = updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements;
        [subAchievements[subIndex - 1], subAchievements[subIndex]] = [subAchievements[subIndex], subAchievements[subIndex - 1]];
        setExperienceData(updatedExperiences);
    };

    // Move Sub-Achievement Down
    const moveSubAchievementDown = (experienceIndex, achievementIndex, subIndex) => {
        const updatedExperiences = [...experienceData];
        const subAchievements = updatedExperiences[experienceIndex].achievements[achievementIndex].subAchievements;
        if (subIndex === subAchievements.length - 1) return;
        [subAchievements[subIndex + 1], subAchievements[subIndex]] = [subAchievements[subIndex], subAchievements[subIndex + 1]];
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
        [updatedExperiences[experienceIndex - 1], updatedExperiences[experienceIndex]] = [updatedExperiences[experienceIndex], updatedExperiences[experienceIndex - 1]];
        setExperienceData(updatedExperiences);
    };

    // Move Experience Down
    const moveExperienceDown = (experienceIndex) => {
        if (experienceIndex === experienceData.length - 1) return;
        const updatedExperiences = [...experienceData];
        [updatedExperiences[experienceIndex + 1], updatedExperiences[experienceIndex]] = [updatedExperiences[experienceIndex], updatedExperiences[experienceIndex + 1]];
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Job Title"
                            name="job_title"
                            value={newExperience.job_title}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Employer"
                            name="employer"
                            value={newExperience.employer}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={newExperience.city}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth
                            label="Start Year"
                            name="start_year"
                            value={newExperience.start_year}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth
                            label="End Year"
                            name="end_year"
                            value={newExperience.end_year}
                            onChange={handleInputChange}
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addExperience}
                    sx={{ mt: 2 }}
                >
                    Add Experience
                </Button>
            </Box>

            {/* Display the list of experiences */}
            <Grid container spacing={3}>
                {experienceData.map((job, experienceIndex) => (
                    <Grid item xs={12} md={6} key={experienceIndex}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h6">{job.job_title}</Typography>
                                        <Typography variant="body1">
                                            {job.employer}, {job.city}
                                        </Typography>
                                        <Typography variant="body2">
                                            {job.start_year} - {job.end_year}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => moveExperienceUp(experienceIndex)}>
                                            <ArrowUpwardIcon />
                                        </IconButton>
                                        <IconButton onClick={() => moveExperienceDown(experienceIndex)}>
                                            <ArrowDownwardIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteExperience(experienceIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Typography variant="body2" gutterBottom>
                                    {job.description}
                                </Typography>

                                {/* Achievements */}
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Achievements:
                                </Typography>
                                <List>
                                    {job.achievements.map((achievement, achievementIndex) => (
                                        <ListItem key={achievementIndex} alignItems="flex-start">
                                            <Box sx={{ width: '100%' }}>
                                                <Grid container spacing={1} alignItems="center">
                                                    <Grid item xs>
                                                        <TextField
                                                            fullWidth
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
                                                    <Grid item>
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

                                                {/* Sub-achievements */}
                                                <List sx={{ pl: 4 }}>
                                                    {achievement.subAchievements.map((sub, subIndex) => (
                                                        <ListItem key={subIndex} alignItems="flex-start">
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs>
                                                                    <TextField
                                                                        fullWidth
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
                                                                <Grid item>
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
                                                    <ListItem>
                                                        <Button
                                                            onClick={() =>
                                                                addSubAchievement(experienceIndex, achievementIndex)
                                                            }
                                                        >
                                                            Add Sub-Achievement
                                                        </Button>
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <Button onClick={() => addAchievement(experienceIndex)}>
                                            Add Achievement
                                        </Button>
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