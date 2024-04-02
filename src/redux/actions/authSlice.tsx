import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:3000/admins';


export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async (admin) => {
        const response = await axios.post(`${BASE_URL}/sign_in`, admin)
        return response.data
    }
)

export const logoutAdmin = createAsyncThunk(
    'auth/logoutAdmin',
    async () => {
        const response = await fetch(`${BASE_URL}/sign_out`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('admin_token')
            }
        })

        Cookies.remove('admin_token')
        const data = await response.json();
        console.log(data)
        return data
    }
)

// Define a type or interface for the user object
interface Admin {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

// Create an async thunk for registering a user
export const registerAdmin = createAsyncThunk(
    'auth/registerAdmin',
    async (admin: Admin) => { // Type the user parameter
        const adminObject = {
            admin: {
                email: admin.email,
                password: admin.password,
                first_name: admin.first_name,
                last_name: admin.last_name,
            }
        };

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminObject)
        });

        if (!response.ok) {
            throw new Error('Failed to register Admin');
        }
        console.log(response.headers.get('Authorization'))
         await Cookies.set('admin_token', response.headers.get('Authorization'), { expires: 1 })

        const data = await response.json();
        return data;
    }
);

const initialState = {
    admin: null,
    status: 'idle',
    error: null,
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(registerAdmin.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.user = action.payload
                console.log(state)
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(logoutAdmin.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(logoutAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.status = action.payload
                state.user = null
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
}) 


export default authSlice.reducer;
