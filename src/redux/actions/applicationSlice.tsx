import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:3000/api/v1/applications';

interface Application {
    name: string;
    email: string;
    phone: string;
    institute: string;
    course: string;
    domain: string;
    goals: string;
    unique_skill: string;
    company_project: string;
    resume: File | null;
}

export const fetchApplications = createAsyncThunk(
    'application/fetchApplication',
    async () => {
        const response = await fetch(`${BASE_URL}`)
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Failed to fetch the Applications');
    }
)

export const createApplication = createAsyncThunk(
    'application/createApplication',
    async (formData: FormData) => {
        console.log(formData);

        try {
            const response = await fetch(`${BASE_URL}`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json();
            console.log(data)
            return data
        } catch (error) {
            throw new Error('Error adding service: ' + error);
        }
    }
)

export const deleteApplication = createAsyncThunk(
    'application/deleteApplication',
    async (applicationId) => {
        const response = await fetch(`http://localhost:3000/api/v1/applications/${applicationId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return applicationId; // Return the ID of the deleted house
        }
        throw new Error('Failed to delete the Application');
    },
)

const initialState = {
    applications: [],
    status: 'idle',
    error: '',
    loading: false
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createApplication.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.applications.push(action.payload)
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchApplications.pending, (state) => {
                state.loading = true
                state.status = 'loading'
                console.log("fetching")
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.applications = action.payload
                console.log("done fetching")
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
                console.log("failed fetching")
            })
            .addCase(deleteApplication.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(deleteApplication.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                console.log(action.payload);
                state.applications = state.applications.filter((application) => application.attributes.id !== action.payload)
            })
            .addCase(deleteApplication.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default applicationSlice.reducer;
