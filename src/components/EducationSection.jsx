import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    IconButton,
} from '@mui/material';
import {
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';

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

    // State variables for editing education entries
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedEducation, setEditedEducation] = useState({
        start_year: '',
        end_year: '',
        degree: '',
        institution: '',
        city: '',
        grade: '',
        description: '',
    });

    // Function to handle changes in the new education form inputs
    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setNewEducation({
            ...newEducation,
            [name]: value,
        });
    };

    // Function to add new education entry
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

    // Function to initiate editing of an education entry
    const handleEditEducation = (index) => {
        setEditingIndex(index);
        setEditedEducation({ ...educationData[index] });
    };

    // Function to handle changes in the edited education fields
    const handleEditedEducationChange = (e) => {
        const { name, value } = e.target;
        setEditedEducation({
            ...editedEducation,
            [name]: value,
        });
    };

    // Function to save the edited education entry
    const handleSaveEditedEducation = () => {
        const updatedEducationData = [...educationData];
        updatedEducationData[editingIndex] = editedEducation;
        setEducationData(updatedEducationData);
        setEditingIndex(null);
        setEditedEducation({
            start_year: '',
            end_year: '',
            degree: '',
            institution: '',
            city: '',
            grade: '',
            description: '',
        });
    };

    // Function to cancel editing
    const handleCancelEditEducation = () => {
        setEditingIndex(null);
        setEditedEducation({
            start_year: '',
            end_year: '',
            degree: '',
            institution: '',
            city: '',
            grade: '',
            description: '',
        });
    };

    // Function to move education entry up
    const moveEducationUp = (index) => {
        if (index === 0) return;
        const updatedEducation = [...educationData];
        [updatedEducation[index - 1], updatedEducation[index]] = [
            updatedEducation[index],
            updatedEducation[index - 1],
        ];
        setEducationData(updatedEducation);
    };

    // Function to move education entry down
    const moveEducationDown = (index) => {
        if (index === educationData.length - 1) return;
        const updatedEducation = [...educationData];
        [updatedEducation[index + 1], updatedEducation[index]] = [
            updatedEducation[index],
            updatedEducation[index + 1],
        ];
        setEducationData(updatedEducation);
    };

    // Function to delete education entry
    const deleteEducation = (index) => {
        const updatedEducation = [...educationData];
        updatedEducation.splice(index, 1);
        setEducationData(updatedEducation);
    };

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                Education
            </Typography>

            {/* Form for adding new education */}
            <Box component="form" sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                    {/* Degree */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Degree"
                            name="degree"
                            value={newEducation.degree}
                            onChange={handleEducationChange}
                            required
                        />
                    </Grid>
                    {/* Institution */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Institution"
                            name="institution"
                            value={newEducation.institution}
                            onChange={handleEducationChange}
                            required
                        />
                    </Grid>
                    {/* City */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={newEducation.city}
                            onChange={handleEducationChange}
                            required
                        />
                    </Grid>
                    {/* Start Year */}
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth
                            label="Start Year"
                            name="start_year"
                            value={newEducation.start_year}
                            onChange={handleEducationChange}
                            required
                        />
                    </Grid>
                    {/* End Year */}
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth
                            label="End Year"
                            name="end_year"
                            value={newEducation.end_year}
                            onChange={handleEducationChange}
                            required
                        />
                    </Grid>
                    {/* Grade */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Grade"
                            name="grade"
                            value={newEducation.grade}
                            onChange={handleEducationChange}
                        />
                    </Grid>
                    {/* Description */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={newEducation.description}
                            onChange={handleEducationChange}
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>

                {/* Add Education Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addEducation}
                    sx={{ mt: 2 }}
                >
                    Add Education
                </Button>
            </Box>

            {/* Display the list of education entries */}
            <Grid container spacing={3}>
                {educationData.map((edu, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent
                                sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item xs={12} md={8}>
                                        {editingIndex === index ? (
                                            <>
                                                {/* Editable Fields */}
                                                {/* Degree */}
                                                <TextField
                                                    fullWidth
                                                    label="Degree"
                                                    name="degree"
                                                    value={editedEducation.degree}
                                                    onChange={handleEditedEducationChange}
                                                    required
                                                    sx={{ mb: 1 }}
                                                />
                                                {/* Institution */}
                                                <TextField
                                                    fullWidth
                                                    label="Institution"
                                                    name="institution"
                                                    value={editedEducation.institution}
                                                    onChange={handleEditedEducationChange}
                                                    required
                                                    sx={{ mb: 1 }}
                                                />
                                                {/* City */}
                                                <TextField
                                                    fullWidth
                                                    label="City"
                                                    name="city"
                                                    value={editedEducation.city}
                                                    onChange={handleEditedEducationChange}
                                                    required
                                                    sx={{ mb: 1 }}
                                                />
                                                {/* Start Year and End Year */}
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="Start Year"
                                                            name="start_year"
                                                            value={editedEducation.start_year}
                                                            onChange={handleEditedEducationChange}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth
                                                            label="End Year"
                                                            name="end_year"
                                                            value={editedEducation.end_year}
                                                            onChange={handleEditedEducationChange}
                                                            required
                                                        />
                                                    </Grid>
                                                </Grid>
                                                {/* Grade */}
                                                <TextField
                                                    fullWidth
                                                    label="Grade"
                                                    name="grade"
                                                    value={editedEducation.grade}
                                                    onChange={handleEditedEducationChange}
                                                    sx={{ mt: 2 }}
                                                />
                                                {/* Description */}
                                                <TextField
                                                    fullWidth
                                                    label="Description"
                                                    name="description"
                                                    value={editedEducation.description}
                                                    onChange={handleEditedEducationChange}
                                                    multiline
                                                    rows={3}
                                                    sx={{ mt: 2 }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {/* Display Fields */}
                                                <Typography variant="h6">{edu.degree}</Typography>
                                                <Typography variant="body1">
                                                    {edu.institution}
                                                    {edu.city && `, ${edu.city}`}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {edu.start_year} - {edu.end_year}
                                                </Typography>
                                                {edu.grade && (
                                                    <Typography variant="body2">
                                                        Grade: {edu.grade}
                                                    </Typography>
                                                )}
                                                {edu.description && (
                                                    <Typography variant="body2" gutterBottom>
                                                        {edu.description}
                                                    </Typography>
                                                )}
                                            </>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        {editingIndex === index ? (
                                            <>
                                                {/* Save and Cancel Buttons */}
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSaveEditedEducation}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleCancelEditEducation}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Action Buttons */}
                                                <IconButton onClick={() => moveEducationUp(index)}>
                                                    <ArrowUpwardIcon />
                                                </IconButton>
                                                <IconButton onClick={() => moveEducationDown(index)}>
                                                    <ArrowDownwardIcon />
                                                </IconButton>
                                                <IconButton onClick={() => deleteEducation(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleEditEducation(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
