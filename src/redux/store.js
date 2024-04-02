import { configureStore } from '@reduxjs/toolkit';
import authReducer from './actions/authSlice';
import serviceReducer from './actions/serviceSlice';


export default configureStore({
    reducer: {
        auth: authReducer,
        service: serviceReducer
    },
});
