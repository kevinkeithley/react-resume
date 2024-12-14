import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Typography, Button } from '@mui/material';
import PersonalInfoForm from './components/PersonalInfoForm';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import RoleManager from './components/RoleManager';
import ResumeSaver from './components/ResumeSaver';
import ResumeLoader from './components/ResumeLoader';
import ApplicationsManager from './components/ApplicationsManager';
import { downloadJson } from './utils/downloadJson';

// Newly created components:
import ComputerSkillsSection from './components/ComputerSkillsSection';
import SkillMatrixSection from './components/SkillMatrixSection';

export default function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [roles, setRoles] = useState([]);
  const [applications, setApplications] = useState([]);

  const [formData, setFormData] = useState({
    personal_information: {
      first_name: '',
      last_name: '',
      title: '',
      address_1: '',
      address_2: '',
      address_3: '',
      mobile: '',
      email: '',
      homepage: '',
      linkedin: '',
      github: '',
      gitlab: '',
    },
    education: [],
    experience: [],
    computer_skills: [],      // Added this
    skill_matrix: {           // Added this
      title: '',
      description: '',
      entries: []
    }
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDownload = () => {
    downloadJson(formData);
  };

  return (
    <Box
      sx={{
        width: '100%',
        p: 3,
        maxWidth: '100%',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      {/* Tabs Navigation */}
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Roles" />
        <Tab label="Resume" />
        <Tab label="Save/Load" />
        <Tab label="Applications" />
      </Tabs>

      {/* Tabs Content */}
      <Box sx={{ mt: 3 }}>
        {/* Roles Tab */}
        {currentTab === 0 && (
          <Box>
            <RoleManager roles={roles} setRoles={setRoles} />
          </Box>
        )}

        {/* Resume Tab */}
        {currentTab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Personal Info and Education Form in 2-column layout */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <PersonalInfoForm
                  personalInfo={formData.personal_information}
                  setPersonalInfo={(data) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      personal_information: data,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <EducationSection
                  educationData={formData.education}
                  setEducationData={(data) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      education: data,
                    }))
                  }
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <ExperienceSection
                experienceData={formData.experience}
                setExperienceData={(data) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    experience: data,
                  }))
                }
              />
            </Box>

            {/* New Sections for Computer Skills & Skill Matrix */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <ComputerSkillsSection
                  computerSkills={formData.computer_skills}
                  setComputerSkills={(data) =>
                    setFormData((prev) => ({ ...prev, computer_skills: data }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SkillMatrixSection
                  skillMatrix={formData.skill_matrix}
                  setSkillMatrix={(data) =>
                    setFormData((prev) => ({ ...prev, skill_matrix: data }))
                  }
                />
              </Grid>
            </Grid>

            {/* JSON Summary */}
            <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6">Current Form Data (JSON):</Typography>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Box>
          </Box>
        )}

        {/* Save/Load Tab */}
        {currentTab === 2 && (
          <Box>
            <ResumeSaver roles={roles} formData={formData} setRoles={setRoles} />
            <ResumeLoader roles={roles} setFormData={setFormData} />

            {/* Button to download JSON */}
            <Button variant="contained" color="primary" onClick={handleDownload} sx={{ mt: 2 }}>
              Download Current Data
            </Button>
          </Box>
        )}

        {/* Applications Tab */}
        {currentTab === 3 && (
          <Box>
            <ApplicationsManager
              applications={applications}
              setApplications={setApplications}
              roles={roles}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
