import { openDB } from 'idb';

// Open the database, create stores if they don't exist
const dbPromise = openDB('resume-builder-db', 1, {
    upgrade(db) {
        // Create the object stores if they don't exist yet
        if (!db.objectStoreNames.contains('roles')) {
            db.createObjectStore('roles', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('resume')) {
            db.createObjectStore('resume', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('applications')) {
            db.createObjectStore('applications', { keyPath: 'id', autoIncrement: true });
        }
    },
});

//
// Role-related functions
//

// Add a new role
export const addRole = async (roleData) => {
    const db = await dbPromise;
    return db.add('roles', roleData);
};

// Get all roles
export const getAllRoles = async () => {
    const db = await dbPromise;
    return db.getAll('roles');
};

// Update a role
export const updateRole = async (id, roleData) => {
    const db = await dbPromise;
    return db.put('roles', { ...roleData, id });
};

// Delete a role
export const deleteRole = async (id) => {
    const db = await dbPromise;
    return db.delete('roles', id);
};

//
// Resume-related functions
//

// Add a new resume
export const addResume = async (resumeData) => {
    const db = await dbPromise;
    return db.add('resume', resumeData);
};

// Get all resumes
export const getAllResumes = async () => {
    const db = await dbPromise;
    return db.getAll('resume');
};

// Delete a resume
export const deleteResume = async (id) => {
    const db = await dbPromise;
    return db.delete('resume', id);
};

//
// Application-related functions
//

// Add a new application
export const addApplication = async (applicationData) => {
    const db = await dbPromise;
    return db.add('applications', applicationData);
};

// Get all applications
export const getAllApplications = async () => {
    const db = await dbPromise;
    return db.getAll('applications');
};

// Delete an application
export const deleteApplication = async (id) => {
    const db = await dbPromise;
    return db.delete('applications', id);
};
