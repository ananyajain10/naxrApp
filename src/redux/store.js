import { configureStore } from '@reduxjs/toolkit';
import authReducer from './actions/authSlice';
import serviceReducer from './actions/serviceSlice';
import applicationReducer from './actions/applicationSlice';
import feedbackReducer from './actions/feedbackSlice';


export default configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer,
        application: applicationReducer,
        feedback: feedbackReducer
    },
});
