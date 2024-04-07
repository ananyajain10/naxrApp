'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, Provider } from "react-redux";
import '../../src/app/globals.css';
import Join from '../../src/assets/images/join.jpg';
import Meet from '../../src/assets/images/meet.jpg';
import Footer from '../../src/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import Link from 'next/link';
import store from '../../src/redux/store';
import { FidgetSpinner } from 'react-loader-spinner';
import { FaRegCheckCircle } from "react-icons/fa";
import { createApplication } from '@/redux/actions/applicationSlice';
import Navbar from '../../src/components/Navbar';

interface FormValues {
    name: string;
    email: string;
    phone: string;
    institute: string;
    course: string;
    domain: string;
    goals: string;
    unique_skill: string;
    company_project: string;
    resume: File | null;
}


const SubmissionSuccess: React.FC = () => {
    return (
        <div className="p-5 min-h-screen z-100 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <FaRegCheckCircle className="h-60 w-60 text-green-500" />
            <h1 className="text-2xl text-center font-bold">Application Submitted Successfully!</h1>
          </div>
          <p className="text-lg text-gray-700 mb-8">Thank you for submitting your application. We&apos;ll review it and get back to you as soon as possible.</p>
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">Back to Home</button>
          </Link>
        </div>
      );
  };

const ApplicationForm: React.FC = () => {

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.application.loading);
    const [submitted, setSubmitted] = useState(false)

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        phone: '',
        institute: '',
        course: '',
        domain: '',
        goals: '',
        unique_skill: '',
        company_project: '',
        resume: null,
    });

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFormValues(prevState => ({
            ...prevState,
            resume: file || null,
        }));
    };

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

        const email = e.target.value;

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const span = document.getElementById('email-error');

        const isEmailValid = emailRegex.test(email);

        if (isEmailValid) {
            handleChange(e)
            span!.innerText = '';
        } else if (email === '') {
            setFormValues(prevState => ({
                ...prevState,
                [email]: '',
            }));
            span!.innerText = '';
        } else if (!isEmailValid) {
            span!.innerText = 'Invalid email';
        }
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateEmail(e);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        const allInputHasValue = Object.entries(formValues).every(([key, value]) => {
            const message = document.getElementById(`${key}-error`);
            if (value === '' || value === null) {
                message!.innerText = `Please Enter ${key}`;
                toast.error(`Please Enter ${key}`);
                return false
            }
            message!.innerText = '';
            return true;
        });

        if (allInputHasValue) {
            const formData = new FormData();
            formData.append('application[name]', formValues.name);
            formData.append('application[email]', formValues.email);
            formData.append('application[phone]', formValues.phone);
            formData.append('application[institute]', formValues.institute);
            formData.append('application[course]', formValues.course);
            formData.append('application[domain]', formValues.domain);
            formData.append('application[goals]', formValues.goals);
            formData.append('application[unique_skill]', formValues.unique_skill);
            formData.append('application[company_project]', formValues.company_project);
            if (formValues.resume){
            formData.append('application[resume]', formValues.resume);
            }

            const response = await dispatch(createApplication(formData));

            if (response.error) {
                toast.error('Form not submitted');
            } else {
                setSubmitted(true)
            }
            
        }
    };

    return (
        <>
            <ToastContainer />
            <main>
                
                {submitted && <SubmissionSuccess />}
                {loading ? (
                    <div className='flex flex-col absolute w-full h-full bg-white justify-center items-center'>
                        <FidgetSpinner />
                        <h4 className='font-bold'>Submitting Application ...</h4>
                    </div>) : (
                    <>
                        <Navbar />
                        <section>

                            <Image
                                src={Join}
                                alt="Join us banner"
                                height={300}
                                width={500}
                                className="sm:block md:block lg:hidden xl:hidden m-auto"
                            />
                            <Image
                                src={Meet}
                                alt="Join us banner"
                                className="sm:hidden md:hidden lg:block xl:block"
                            />
                            <form id="registration-form" className="w-90  md:w-3/4 lg:[70.666667%] xl:[70.666667%] mx-2 flex md:m-auto flex-col pt-4 mt-4 p-4 rounded-lg bg-gray-200 shadow-lg lg:relative lg:grid lg:grid-cols-2 lg:gap-4 lg:pt-16 lg:ml-auto" onSubmit={handleSubmit}>
                                <h1 className="text-2xl font-bold text-gray-700 text-center mb-4 lg:absolute lg:top-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:col-span-4 ">Register</h1>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="name" className="font-semibold text-base text-gray-700 lg:text-sm">Name: <span className="text-red-400">*</span></label>
                                    <input type="text" id="name" name="name" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' placeholder="Full name" value={formValues.name} onChange={handleChange} />
                                    <small className="text-red-400" id='name-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="email" className="font-semibold text-base text-gray-700 lg:text-sm">Email:<span className="text-red-400">*</span></label>
                                    <input type="text" id="email" name="email" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' placeholder="e.g user@email.co" onChange={handleEmail} />
                                    <small className="text-red-400" id='email-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="phone" className="font-semibold text-base text-gray-700 lg:text-sm">Phone: <span className="text-red-400">*</span></label>
                                    <input type="tel" id="phone" name="phone" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' placeholder="e.g +222 xxxx xxxx xxx" value={formValues.phone} onChange={handleChange} />
                                    <small className="text-red-400" id='phone-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="institute" className="font-semibold text-base text-gray-700 lg:text-sm">Institute: <span className="text-red-400">*</span></label>
                                    <input type="text" id="institute" name="institute" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' placeholder="Your Institute" value={formValues.institute} onChange={handleChange} />
                                    <small className="text-red-400" id='institute-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="course" className="font-semibold text-base text-gray-700 lg:text-sm">Course and Specialization: <span className="text-red-400">*</span></label>
                                    <input type="text" id="course" name="course" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' placeholder="e.g Computer Science" value={formValues.course} onChange={handleChange} />
                                    <small className="text-red-400" id='course-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="domain" className="font-semibold text-base text-gray-700 lg:text-sm">Which position(s) are you interested in?<span className="text-red-400">*</span></label>
                                    <select title="Domain" name="domain" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' id="domain" value={formValues.domain} onChange={handleChange}>
                                        <option value="">Domains</option>
                                        <option value="Web Developer">Web Developer</option>
                                        <option value="Software Developer">Software Developer</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="UI/UX Designer">UI/UX Designer</option>
                                        <option value="Creative Developer">Creative Developer</option>
                                        <option value="AI Developer">AI Developer</option>
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Blockchain">Blockchain</option>
                                        <option value="Data Analyst">Data Analyst</option>
                                        <option value="UI/UX Designer">UI/UX Designer</option>
                                        <option value="Design &amp; Creative">Design &amp; Creative</option>
                                        <option value="Graphic Designer">Graphic Designer</option>
                                        <option value="Video Editor">Video Editor</option>
                                        <option value="Social Market Manager">Social Market Manager</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Human Resource">Human Resource</option>
                                        <option value="Sales &amp; Communication">Sales &amp; Communication</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="Costumer Services">Costumer Services</option>
                                        <option value="Business Development">Business Development</option>
                                    </select>
                                    <small className="text-red-400" id='domain-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="goals" className="font-semibold text-base text-gray-700 lg:text-sm">How do you see your career goals aligning with the opportunities at TechDice? <span className="text-red-400">*</span></label>
                                    <textarea id="goals" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' name="goals" rows={2} cols={40} value={formValues.goals} onChange={handleChange}></textarea>
                                    <small className="text-red-400" id='goals-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="unique_skill" className="font-semibold text-base text-gray-700 lg:text-sm">What unique qualities or skills do you bring that would be an asset to our company?<span className="text-red-400">*</span></label>
                                    <textarea id="unique_skill" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' name="unique_skill" rows={2} cols={40} value={formValues.unique_skill} onChange={handleChange}></textarea>
                                    <small className="text-red-400" id='unique_skill-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="company_project" className="font-semibold text-base text-gray-700 lg:text-sm">Describe a specific project or initiative at our company that excites you and why?<span className="text-red-400">*</span></label>
                                    <textarea id="company_project" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md' name="company_project" rows={2} cols={40} value={formValues.company_project} onChange={handleChange}></textarea>
                                    <small className="text-red-400" id='company_project-error'></small>
                                </div>

                                <div className="flex flex-col field mb-2">
                                    <label htmlFor="resume" className="font-semibold text-base text-gray-700 lg:text-sm">Upload your resume: <span className="text-red-400">*</span></label>
                                    <input type="file" id="resume" className='w-full px-4 py-3 lg:py-1 mt-2 border border-gray-300 rounded-md text-blue-600' name="resume" onChange={handleFileChange} />
                                    <small className="text-red-400" id='resume-error'></small>
                                </div>

                                <input type="submit" className="w-full bg-green-600 text-white py-3 lg:py-1 px-6 my-2 border-none rounded-md cursor-pointer hover:bg-green-700 transition duration-300 ease-in-out lg:absolute lg:right-[22px] lg:bottom-0 lg:w-[27%]" value="Submit" />
                            </form>
                        </section>
                        <section>
                            {isClient ? <Footer /> : 'loading'}
                        </section>
                    </>
                )}
            </main>
        </>

    );
};


const RegistrationForm = () => (
    <Provider store={store}>
        <ApplicationForm />
    </Provider>
)

export default RegistrationForm;
