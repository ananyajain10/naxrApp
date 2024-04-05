import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:3000/api/v1/services';

interface Service {
    name: string;
    description: string;
    icon: string;
    duration: number;
    vacancy: number;
}

export const fetchServices = createAsyncThunk(
    'service/fetchService',
    async () => {
        const response = await fetch(`${BASE_URL}`)
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Failed to delete the Service');
    }
)

export const createService = createAsyncThunk(
    'service/createService',
    async (formData: FormData) => {
        console.log(formData);

        try {
            const response = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': Cookies.get('admin_token')
                },
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

export const deleteService = createAsyncThunk(
    'service/deleteService',
    async (serviceId) => {
        const response = await fetch(`http://localhost:3000/api/v1/services/${serviceId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return serviceId; // Return the ID of the deleted house
        }
        throw new Error('Failed to delete the Service');
    },
)

export const updateService = createAsyncThunk(
    'service/updateService',
    async ({ formData, id }: { formData: FormData; id: string }, { getState }) => {
       
        console.log(id, formData)
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': Cookies.get('admin_token')
            },
            body: formData
        })
        const data = await response.json();
        console.log(data)
        return data
    }
)

const initialState = {
    services: [],
    status: 'idle',
    error: '',
    loading: false
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true
                state.status = 'loading'
                console.log("fetching")
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.services = action.payload
                console.log("done fetching")
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
                console.log("failed fetching")
            })
            .addCase(createService.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.services = action.payload
            })
            .addCase(createService.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteService.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.services = state.services.filter((service) => service.attributes.id !== action.payload)
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default serviceSlice.reducer;
