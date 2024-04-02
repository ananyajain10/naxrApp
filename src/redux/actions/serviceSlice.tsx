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
    async (service: Service) => {

        const serviceObject = {
            service: {
                name: service.name,
                description: service.description,
                icon: service.icon,
                duration: Number(service.duration),
                vacancy: Number(service.vacancy)
            }
        }

        const response = await fetch(`${BASE_URL}`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('admin_token')
            },
            body: JSON.stringify(serviceObject)
        })
        const data = await response.json();
        console.log(data)
        return data
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
    async (service: Service, serviceId) => {
        const serviceObject = {
            service: {
                name: service.name,
                description: service.description,
                icon: service.icon,
                duration: service.duration,
                vacancy: service.vacancy
            }
        }
        const response = await fetch(`${BASE_URL}/${serviceId}`, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('admin_token')
            },
            body: JSON.stringify(serviceObject)
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
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.services = action.payload
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
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
                state.services = state.services.filter((service) => service.id !== action.payload )
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export default serviceSlice.reducer;
