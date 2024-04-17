import { createService, fetchServices } from "../../redux/actions/serviceSlice";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useDispatch,  useSelector, Provider  } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import store from '../../redux/store';
import '../../../src/app/globals.css';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Editor } from 'primereact/editor';


const AddService = () => {

    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>(null);

    const [service, setService] = useState({
        name: '',
        duration: 0,
        description: '',
        vacancy: 0,
        icon: null
    })


    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setService({ ...service, icon: e.target.files[0] });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const allInputHasValue = Object.entries(service).every(([key, value]) => {
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


            formData.append('service[name]', service.name);
            formData.append('service[duration]', service.duration.toString());
            formData.append('service[description]', service.description);
            formData.append('service[vacancy]', service.vacancy.toString());
            if (service.icon) {
                formData.append('service[icon]', e.target.icon.files[0]);
            }
            try {
                const response = await dispatch(createService(formData));
                e.target.reset();
                await dispatch(fetchServices(formData));


                toast.success('Service added successfully');
            } catch (error) {
                console.error('Error adding service:', error);
                toast.error('An error occurred while adding the service. Please try again later.');
            }
        }

        
    }

    return (
        <>
        <ToastContainer />
            <form className='w-50 flex flex-wrap flex-col space-y-1 gap-2 m-auto p-5 rounded-lg' ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='name'>
                    Name:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='name'
                        type="text"
                        name="name"
                        onChange={(e) => setService({ ...service, name: e.target.value })}
                        placeholder='Service Name..'
                    />
                    <small className='text-rose-500' id='service_name-error'></small>
                </label>
                <label htmlFor='duration'>
                    Duration:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='duration'
                        type="number"
                        name="duration"
                        onChange={(e) => {
                            setService({ ...service, duration: Number(e.target.value) })
                        }}
                        placeholder='Service Duration [month(s)]..'
                    />
                    <small className='text-rose-500' id='service_duration-error'></small>
                </label>
                <label htmlFor='description'>
                    Description:
                    <Editor style={{ height: '320px' }} onTextChange={(e) => setService({ ...service, description: e.htmlValue })} />
                    <small className='text-rose-500' id='service_description-error'></small>
                </label>

                <label htmlFor='vacancy'>
                    Vacancy:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='vacancy'
                        type="number"
                        name="vacancy"
                        onChange={(e) => {
                            setService({ ...service, vacancy: Number(e.target.value) })
                        }}
                        placeholder='Service Vacancy'
                    />
                    <small className='text-rose-500' id='service_vacancy-error'></small>
                </label>
                <label htmlFor='icon'>
                    Icon:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='icon'
                        type="file"
                        name="icon"
                        onChange={(e) => handleFileChange(e)}
                        accept="image/*"
                    />
                    <small className='text-rose-500' id='service_icon-error'></small>
                </label>

                <input
                    className='border w-[150px] h-[40px]  rounded-lg m-auto hover:bg-slate-800 hover:text-white font-bold '
                    type="submit"
                    value="Add"
                />
            </form>
        </>
    )
}

const addServiceForm = () =>  (
        <Provider store={store}>
            <AddService />
        </Provider>
    )


export default addServiceForm;
