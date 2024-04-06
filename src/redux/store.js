import { configureStore } from '@reduxjs/toolkit';
import authReducer from './actions/authSlice';
import serviceReducer from './actions/serviceSlice';
import applicationReducer from './actions/applicationSlice'


export default configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer,
        application: applicationReducer
    },
});
