import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from '../../redux/store';
import { ToastContainer, toast } from 'react-toastify';
import { fetchFeedbacks, deleteFeedback } from '@/redux/actions/feedbackSlice';

const Applications = () => {
    const dispatch = useDispatch();
    const feedbacks = useSelector((state: any) => state.feedback.feedbacks);
    const loading = useSelector((state: any) => state.feedback.loading);

    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    const handleViewDetails = (feedBack: any) => {
        setSelectedFeedback(feedBack);
    };

    const handleCloseDetails = () => {
        setSelectedFeedback(null);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteFeedback(id));
            toast.success('Application deleted successfully');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <h1 className="text-center text-2xl font-bold m-2">Feedbacks</h1>
            {loading ? (
                <div>Loading</div>
            ) : (<>{
                feedbacks.map((feedback: any) => (
                    <div key={feedback.id} className="bg-gray-100 shadow-lg rounded-md p-4 mb-4 w-[70%]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{feedback.name}</h3>
                                <p className="text-gray-600">{feedback.email}</p>
                            </div>
                            <div>
                                <a href={`mailto:${feedback.email}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Email</a>
                                <button type='button' className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(feedback.id)}>Delete</button>
                            </div>
                        </div>
                        <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full" onClick={() => handleViewDetails(feedback)}>View Details</button>
                    </div>
                ))}
            </>
            )}


            {selectedFeedback && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">{selectedFeedback.name}</h2>
                        <p className="text-gray-700"><strong>Email:</strong> {selectedFeedback.email}</p>
                        <p className="text-gray-700"><strong>Message:</strong> {selectedFeedback.message}</p>
                       
                        <a href={`mailto:${selectedFeedback.email}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Email</a>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(selectedFeedback.id)}>Delete</button>



                        {/* Include other details here */}
                        <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md" onClick={handleCloseDetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const ApplicationList = () => {
    return (
        <Provider store={store}>
            <Applications />
        </Provider>
    );
}
export default ApplicationList;
