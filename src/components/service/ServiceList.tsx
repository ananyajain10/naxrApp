import { useDispatch, useSelector, Provider } from "react-redux";
import { fetchServices, deleteService, updateService } from "../../redux/actions/serviceSlice";
import store from '../../redux/store';
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const handleSubmit = async (e) => {
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
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={updatedService.name} onChange={(e) => setUpdatedService({ ...updatedService, name: e.target.value })} />
            <span id="service_name-error" className="text-red-500"></span>

            <label htmlFor="duration">Duration</label>
            <input type="number" name="duration" value={updatedService.duration} onChange={(e) => setUpdatedService
                ({ ...updatedService, duration: parseInt(e.target.value) })} />
            <span id="service_duration-error" className="text-red-500"></span>

            <label htmlFor="description">Description</label>
            <textarea name="description" value={updatedService.description} onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })} />
            <span id="service_description-error" className="text-red-500"></span>

            <label htmlFor="vacancy">Vacancy</label>
            <input type="number" name="vacancy" value={updatedService.vacancy} onChange={(e) => setUpdatedService({ ...updatedService, vacancy: parseInt(e.target.value) })} />
            <span id="service_vacancy-error" className="text-red-500"></span>

            <label htmlFor="icon">Icon</label>
            <input type="file" name="icon" onChange={handleFileChange} />
            <span id="service_icon-error" className="text-red-500"></span>

            <button type="submit">Update</button>
        </form>
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
         <ToastContainer />
            {showUpdateForm && <ServiceUpdateForm service={serviceToUpdate} />}
            {
                loading ? <div> Loading...</div> : services.map((service) => (
                    <div key={service.attributes.id + service.attributes.name} className='flex gap-4'>
                        <div>
                            <img src={service.attributes.image_url} alt={service.attributes.name} className="w-20 h-20" />
                        </div>
                        <div>
                            <h1>{service.attributes.name}</h1>
                            <p>{service.attributes.description}</p>
                            <span>{service.attributes.duration}</span>
                            <span>{service.attributes.vacancy}</span>
                            <span>
                                <button type="button" onClick={() => handleUpdate(service)}>Edit</button>
                            </span>
                            <span>
                                <button type="button" onClick={() => handleDelete(service.attributes.id)}>Delete</button>
                            </span>
                        </div>
                    </div>
                ))
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
