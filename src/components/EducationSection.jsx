import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function EducationSection({ educationData, setEducationData }) {
    const [newEducation, setNewEducation] = useState({
        start_year: '',
        end_year: '',
        degree: '',
        institution: '',
        city: '',
        grade: '',
        description: '',
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setNewEducation({
            ...newEducation,
            [name]: value,
        });
    };

    const addEducation = () => {
        setEducationData([...educationData, newEducation]);
        setNewEducation({
            start_year: '',
            end_year: '',
            degree: '',
            institution: '',
            city: '',
            grade: '',
            description: '',
        });
    };

    const handleEditEducation = (index, updatedEducation) => {
        const updatedEducationData = educationData.map((edu, i) =>
            i === index ? updatedEducation : edu
        );
        setEducationData(updatedEducationData);
    };

    const moveEducationUp = (index) => {
        if (index === 0) return;
        const updatedEducation = [...educationData];
        [updatedEducation[index - 1], updatedEducation[index]] = [updatedEducation[index], updatedEducation[index - 1]];
        setEducationData(updatedEducation);
    };

    const moveEducationDown = (index) => {
        if (index === educationData.length - 1) return;
        const updatedEducation = [...educationData];
        [updatedEducation[index + 1], updatedEducation[index]] = [updatedEducation[index], updatedEducation[index + 1]];
        setEducationData(updatedEducation);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Education
            </Typography>

            {educationData.map((edu, index) => (
                <Box key={index} mb={2} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Year"
                                name="start_year"
                                value={edu.start_year}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, start_year: e.target.value })
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="End Year"
                                name="end_year"
                                value={edu.end_year}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, end_year: e.target.value })
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Degree"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, degree: e.target.value })
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Institution"
                                name="institution"
                                value={edu.institution}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, institution: e.target.value })
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                name="city"
                                value={edu.city}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, city: e.target.value })
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Grade"
                                name="grade"
                                value={edu.grade}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, grade: e.target.value })
                                }
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={edu.description}
                                onChange={(e) =>
                                    handleEditEducation(index, { ...edu, description: e.target.value })
                                }
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="space-between">
                            <Button
                                variant="contained"
                                onClick={() => moveEducationUp(index)}
                                disabled={index === 0}
                                sx={{ mr: 1 }}
                            >
                                Move Up
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => moveEducationDown(index)}
                                disabled={index === educationData.length - 1}
                            >
                                Move Down
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            ))}

            <Button
                variant="outlined"
                onClick={toggleFormVisibility}
                startIcon={isFormVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ mt: 2 }}
            >
                {isFormVisible ? 'Hide Add Education Form' : 'Show Add Education Form'}
            </Button>

            {isFormVisible && (
                <Box>
                    <TextField
                        label="Start Year"
                        name="start_year"
                        value={newEducation.start_year}
                        onChange={handleEducationChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="End Year"
                        name="end_year"
                        value={newEducation.end_year}
                        onChange={handleEducationChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Degree"
                        name="degree"
                        value={newEducation.degree}
                        onChange={handleEducationChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Institution"
                        name="institution"
                        value={newEducation.institution}
                        onChange={handleEducationChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={newEducation.city}
                        onChange={handleEducationChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Grade"
                        name="grade"
                        value={newEducation.grade}
                        onChange={handleEducationChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={newEducation.description}
                        onChange={handleEducationChange}
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addEducation}
                    >
                        Add Education
                    </Button>
                </Box>
            )}
        </Box>
    );
}
