import { useDispatch, useSelector, Provider } from "react-redux";
import { fetchServices, deleteService, updateService } from "../../redux/actions/serviceSlice";
import store from '../../redux/store';
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReactModal from "react-modal";

import { Editor } from 'primereact/editor';


const ServiceUpdateForm = ({ service }) => {
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>(null);

    const [updatedService, setUpdatedService] = useState({
        name: service.attributes.name,
        duration: service.attributes.duration,
        description: service.attributes.description,
        vacancy: service.attributes.vacancy,
        icon: null
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUpdatedService({ ...updatedService, icon: e.target.files[0] });
        }
    }

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(updatedService);

        const allInputHasValue = Object.entries(updatedService).every(([key, value]) => {
            const message = document.getElementById(`service_${key}-error`);
            if (value === '' || value === 0) {
                message!.innerText = `Please Enter ${key}`;
                return false
            }
            message!.innerText = '';
            return true;
        });

        if (allInputHasValue) {
            const formData = new FormData();

            formData.append('service[name]', updatedService.name);
            formData.append('service[duration]', updatedService.duration.toString());
            formData.append('service[description]', updatedService.description);
            formData.append('service[vacancy]', updatedService.vacancy.toString());
            if (updatedService.icon) {
                formData.append('service[icon]', e.target.icon.files[0]);
            }
            console.log(formData)
            try {
                const response = await dispatch(updateService({ formData: formData, id: service.attributes.id, }));
                console.log(response);
                toast.success('Service updated successfully');
            } catch (error) {
                console.error('Error updating service:', error);
            }
        }
    }

    return (
        <div className="w-75">
            <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-wrap flex-col space-y-1 gap-2 m-auto p-5 rounded-lg">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-lg font-semibold mb-1">Name</label>
                    <input type="text" name="name" placeholder="name" value={updatedService.name} onChange={(e) => setUpdatedService({ ...updatedService, name: e.target.value })} className="border rounded-md py-2 px-3 text-lg focus:outline-none focus:border-blue-500" />
                    <span id="service_name-error" className="text-red-500"></span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="duration" className="text-lg font-semibold mb-1">Duration</label>
                    <input type="number" name="duration" placeholder="Number" value={updatedService.duration} onChange={(e) => setUpdatedService({ ...updatedService, duration: parseInt(e.target.value) })} className="border rounded-md py-2 px-3 text-lg focus:outline-none focus:border-blue-500" />
                    <span id="service_duration-error" className="text-red-500"></span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg font-semibold mb-1">Description</label>
                    <Editor style={{ height: '320px' }} value={updatedService.description} onTextChange={(e) => setUpdatedService({ ...updatedService, description: e.htmlValue })} />
                    <span id="service_description-error" className="text-red-500"></span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="vacancy" className="text-lg font-semibold mb-1">Vacancy</label>
                    <input type="number" name="vacancy" value={updatedService.vacancy} placeholder="Vacancy" onChange={(e) => setUpdatedService({ ...updatedService, vacancy: parseInt(e.target.value) })} className="border rounded-md py-2 px-3 text-lg focus:outline-none focus:border-blue-500" />
                    <span id="service_vacancy-error" className="text-red-500"></span>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="icon" className="text-lg font-semibold mb-1">Icon</label>
                    <input type="file" name="icon" placeholder="Icon" onChange={handleFileChange} className="py-2 px-3 text-lg" />
                    <span id="service_icon-error" className="text-red-500"></span>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out">Update</button>
            </form>
        </div>

    )

}

const Services = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const services = useSelector((state) => state.service.services);
    const status = useSelector((state) => state.service.status);
    const loading = useSelector((state) => state.service.loading);

    console.log(status);


    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [serviceToUpdate, setServiceToUpdate] = useState(null);

    console.log(services);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteService(id));
            toast.success('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }

    const handleUpdate = (service) => {
        setServiceToUpdate(service);
        setShowUpdateForm(!showUpdateForm);
    }

    return (
        <>
            <ReactModal
                isOpen={showUpdateForm}
                onRequestClose={() => setShowUpdateForm(false)}
                contentLabel="Service Form"
            >
                <button
                    name="close"
                    type="button"
                    className="absolute top-0 right-0 m-4 p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
                    onClick={() => setShowUpdateForm(false)}
                >
                    Close
                </button>

                <ServiceUpdateForm service={serviceToUpdate} />

            </ReactModal>
            <ToastContainer />
            {
                loading ? <div> Loading...</div> : services.map((service) => {
                    let unwrappedDescription = service.attributes.description.replace(/<\/?[^>]+(>|$)/g, '');
                    return (
                        <div key={service.attributes.id + service.attributes.name} className='flex gap-4 rounded-lg shadow-lg m-2'>

                            <div className="flex items-center m-2">
                                <div className="mr-4 w-[30%]">
                                    <Image src={service.attributes.image_url} alt={service.attributes.name} width={500} height={500} className="w-full h-[150px] rounded-full shadow-lg" />
                                </div>
                                <div className=" w-[70%]">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{service.attributes.name}</h1>
                                    <p className="text-gray-600 mb-4">{unwrappedDescription}</p>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 10a5 5 0 1110 0 5 5 0 01-10 0z" clip-rule="evenodd" />
                                        </svg>

                                        <span className="text-sm text-gray-500 mr-4">{service.attributes.duration} months</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 10a5 5 0 1110 0 5 5 0 01-10 0z" clip-rule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-gray-500 mr-4">{service.attributes.vacancy} slots left</span>
                                        <button type="button" onClick={() => handleUpdate(service)} className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2">Edit</button>
                                        <button type="button" onClick={() => handleDelete(service.attributes.id)} className="text-sm text-white bg-red-500 hover:bg-red-600 rounded-full px-4 py-2 ml-2">Delete</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
                )
            }
        </>
    )
}

const ServiceList = () => (
    <Provider store={store}>
        <Services />
    </Provider>
)

export default ServiceList;
