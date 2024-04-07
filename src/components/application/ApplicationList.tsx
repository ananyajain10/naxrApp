import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from '../../redux/store';
import { IoDocumentTextOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { fetchApplications, deleteApplication } from '@/redux/actions/applicationSlice';

const Applications = () => {
    const dispatch = useDispatch();
    const applications = useSelector((state: any) => state.application.applications);
    const loading = useSelector((state: any) => state.application.loading);

    const [selectedApplication, setSelectedApplication] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchApplications());
    }, [dispatch]);

    const handleViewDetails = (application: any) => {
        setSelectedApplication(application);
    };

    const handleCloseDetails = () => {
        setSelectedApplication(null);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteApplication(id));
            toast.success('Application deleted successfully');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <h1 className="text-center text-2xl font-bold m-2">Applications</h1>
            {loading ? (
                <div>Loading</div>
            ) : (<>{
                applications.map((application: any) => (
                    <div key={application.id} className="bg-gray-100 shadow-lg rounded-md p-4 mb-4 w-[70%]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{application.attributes.name}</h3>
                                <p className="text-gray-600">{application.attributes.email}</p>
                                <p className="text-gray-600">{application.attributes.phone}</p>
                            </div>
                            <div>
                                <a href={`mailto:${application.attributes.email}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Email</a>
                                <button type='button' className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(application.id)}>Delete</button>
                            </div>
                        </div>
                        <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full" onClick={() => handleViewDetails(application)}>View Details</button>
                    </div>
                ))}
            </>
            )}


            {selectedApplication && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">{selectedApplication.attributes.name}</h2>
                        <p className="text-gray-700"><strong>Email:</strong> {selectedApplication.attributes.email}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {selectedApplication.attributes.phone}</p>
                        <p className="text-gray-700"><strong>Institute:</strong> {selectedApplication.attributes.institute}</p>
                        <p className="text-gray-700"><strong>Course:</strong> {selectedApplication.attributes.course}</p>
                        <p className="text-gray-700"><strong>Domain:</strong> {selectedApplication.attributes.domain}</p>
                        <p className="text-gray-700"><strong>Goals:</strong> {selectedApplication.attributes.goals}</p>
                        <p className="text-gray-700"><strong>Unique Skill:</strong> {selectedApplication.attributes.unique_skill}</p>
                        <p className="text-gray-700"><strong>Company Project:</strong> {selectedApplication.attributes.company_project}</p>

                        <div className="mt-4">
                            <IoDocumentTextOutline className="inline-block mr-2" />
                            <a href={selectedApplication.attributes.resume_url} target="_blank" rel="noreferrer">View Resume</a>
                        </div>


                        <a href={`mailto:${selectedApplication.attributes.email}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Email</a>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(selectedApplication.id)}>Delete</button>



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
