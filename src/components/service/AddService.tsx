import { createService } from "@/app/redux/actions/serviceSlice";
import { useState, useRef } from "react";
import { useDispatch,  useSelector, Provider  } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import store from '../../redux/store';

const AddService = () => {

    const dispatch = useDispatch();
    const formRef = useRef(null);

    const [service, setService] = useState({
        name: '',
        duration: 0,
        description: '',
        vacancy: 0,
        icon: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(service);

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
            try {

                const response = await dispatch(createService(service))
                console.log(response);
                // if (!response.payload.status.errors) {
                //     toast.success('Sign up successful');
                //     router.push('/');
                // } else {
                //     toast.error(response.payload.status.errors[0])
                // }


            } catch (error) {
                console.log('Error logging in:', error);
                toast.error('An error occurred while logging in. Please try again later.');
            }

        }
    }

    return (
        <>
        <ToastContainer />
            <form className='w-75 flex flex-wrap flex space-y-1 gap-2 m-auto p-5' onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='service_name'>
                    Name:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='service_name'
                        type="text"
                        name="service_name"
                        onChange={(e) => setService({ ...service, name: e.target.value })}
                        placeholder='Service Name..'
                    />
                    <small className='text-rose-500' id='service_name-error'></small>
                </label>
                <label htmlFor='service_duration'>
                    Duration:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='service_duration'
                        type="number"
                        name="service_duration"
                        onChange={(e) => {
                            setService({ ...service, duration: Number(e.target.value) })
                        }}
                        placeholder='Service Duration [month(s)]..'
                    />
                    <small className='text-rose-500' id='service_duration-error'></small>
                </label>
                <label htmlFor='service_description'>
                    Description:
                    <textarea
                        className='border rounded-md p-1 w-full'
                        id='service_description'
                        name="service_description"
                        onChange={(e) => setService({ ...service, description: e.target.value })}
                        placeholder='Service Description..'
                    />
                    <small className='text-rose-500' id='service_description-error'></small>
                </label>
                <label htmlFor='service_vacancy'>
                    Vacancy:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='service_vacancy'
                        type="number"
                        name="service_vacancy"
                        onChange={(e) => {
                            setService({ ...service, vacancy: Number(e.target.value) })
                        }}
                        placeholder='Service Vacancy'
                    />
                    <small className='text-rose-500' id='service_vacancy-error'></small>
                </label>
                <label htmlFor='service_icon'>
                    Icon:
                    <input
                        className='border rounded-md p-1 w-full'
                        id='service_icon'
                        type="file"
                        name="service_icon"
                        onChange={(e) => { setService({ ...service, icon: e.target.value }) }}
                        placeholder='Service Icon..'
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
