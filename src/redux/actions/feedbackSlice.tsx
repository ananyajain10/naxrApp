import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:3000/api/v1/feedbacks';

interface Feedback {
    name: string;
    email: string;
    message: string;
}

export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedback',
    async () => {
        const response = await fetch(`${BASE_URL}`)
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Failed to fetch the feedbacks');
    }
)

export const createFeedback = createAsyncThunk(
    'feedback/createFeedback',
    async (feedback: Feedback) => {
        const feedbackObj = {
            feedback: {
                name: feedback.name,
                email: feedback.email,
                message: feedback.message,
            },
        };

        console.log('Sending feedback:', feedbackObj);

        try {
            const response = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackObj),
            });

            if (!response.ok) {
                throw new Error('Failed to create feedback');
            }

            const data = await response.json();
            console.log('Received response:', data);
            return data;
        } catch (error) {
            console.error('Error creating feedback:', error);
            throw new Error('Error adding service: ' + error);
        }
    }
);


export const deleteFeedback = createAsyncThunk(
    'feedback/deleteFeedback',
    async (feedbackId) => {
        const response = await fetch(`http://localhost:3000/api/v1/feedbacks/${feedbackId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return feedbackId; // Return the ID of the deleted house
        }
        throw new Error('Failed to delete the Application');
    },
)

const initialState = {
    feedbacks: [],
    status: 'idle',
    error: '',
    loading: false
}

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFeedback.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(createFeedback.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.feedbacks.push(action.payload)
            })
            .addCase(createFeedback.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.feedbacks = action.payload
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteFeedback.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                console.log(action.payload);
                state.feedbacks = state.feedbacks.filter((feedback) => feedback.id !== action.payload)
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default feedbackSlice.reducer;
