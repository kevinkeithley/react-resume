import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Typography } from '@mui/material';
import PersonalInfoForm from './components/PersonalInfoForm';
import EducationSection from './components/EducationSection';
import RoleManager from './components/RoleManager';
import ResumeSaver from './components/ResumeSaver';
import ResumeLoader from './components/ResumeLoader';
import ApplicationsManager from './components/ApplicationsManager';

export default function App() {
  const [currentTab, setCurrentTab] = useState(0);
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
  });
  const [roles, setRoles] = useState([]); // Roles for resumes
  const [applications, setApplications] = useState([]); // Job applications

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 3, maxWidth: '100%', boxSizing: 'border-box', margin: '0 auto' }}>
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
                    setFormData({ ...formData, personal_information: data })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                <EducationSection
                  educationData={formData.education}
                  setEducationData={(data) =>
                    setFormData({ ...formData, education: data })
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
