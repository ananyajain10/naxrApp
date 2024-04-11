import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
import { MdMiscellaneousServices, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { RiLayout6Line } from "react-icons/ri";
import Cookies from 'js-cookie';
import '../../src/app/globals.css';
import Image from "next/image";
import homebg from '../../src/assets/logo2.png';
import AddService from '../../src/components/service/AddService';
import 'react-toastify/dist/ReactToastify.css';
import { logoutAdmin } from '../../src/redux/actions/authSlice';
import ServiceList from "@/components/service/ServiceList";
import ApplicationList from "@/components/application/ApplicationList";
import { useDispatch, Provider } from "react-redux";
import store from '../../src/redux/store';
import ReactModal from 'react-modal';

const Board = () => {
    const [currentPage, setCurrentPage] = useState('Applications');
    const [addService, setAddService] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const loggedIn = Cookies.get('admin_token');
    const dispatch = useDispatch();

    const renderPage = () => {
        switch (currentPage) {
            case 'Applications':
                return <><div ><ApplicationList /></div></>;
            case 'Services':
                return <>
                    <div className="text-center text-2xl font-bold m-2">
                        Services
                    </div>
                    <div>
                        <ServiceList />
                        <div>
                            <button type="button" className=" border border-gray-400 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-md transition-colors duration-300" onClick={() => setModalIsOpen(true)}>Add Service</button>
                            <ReactModal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                contentLabel="Service Form"
                            >
                            <button
                                name="close"
                                type="button"
                                className="absolute top-0 right-0 m-4 p-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none" 
                                onClick={() => setModalIsOpen(false)}
                            >
                                Close
                            </button>
                                <AddService />

                            </ReactModal>
                        </div>
                    </div>
                </>;
            case 'AboutUs':
                return <div className="text-center text-2xl font-bold m-2">About us</div>;
            case 'Careers':
                return <div className="text-center text-2xl font-bold m-2">Careers</div>;
            case 'Product':
                return <div className="text-center text-2xl font-bold m-2">Product</div>;
            case 'Layout':
                return <div className="text-center text-2xl font-bold m-2">Layout</div>;
            default:
                return null;
        }
    };

    const router = useRouter();

    useEffect(() => {
        if (!loggedIn) {
            router.push('/not_found');
        }
    }, [loggedIn]);

    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch(logoutAdmin());
        setTimeout(() => {
            router.push('/');
        }, 1000);
    };

    return (
        <>
            <main className="flex">
                <section className="bg-[#dddddd] w-[200px] p-4 fixed left-0 top-0">
                    <span className="flex w-full items-center gap-2">
                        <Image
                            src={homebg}
                            alt="homebg"
                            className="rounded-2xl flex items-center z-20 "
                            width={50}
                            height={50}
                        />
                        <h1 className="mx-4">Tech-Dice</h1>
                    </span>
                    <br />
                    <span className="flex w-full items-center gap-2">
                        <Image
                            src={homebg}
                            alt="homebg"
                            className="rounded-2xl flex items-center z-20 "
                            width={50}
                            height={50}
                        />
                        <h1 className="">Daniel Ochuba</h1>
                    </span>

                    <nav className="mt-[110px]">
                        <span className="text-left">Contents</span>
                        <ul className="mt-4">
                            <li
                                className={`flex m-3 p-2 rounded-md hover:bg-gray-200 items-center gap-2 cursor-pointer ${currentPage === 'Applications' ? 'bg-gray-500 text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage('Applications')}
                            >
                                <GrNotes /> <p>Applications</p>
                            </li>
                            <li
                                className={`flex m-3 p-2 rounded-md hover:bg-gray-200 items-center gap-2 cursor-pointer ${currentPage === 'Services' ? 'bg-gray-500 text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage('Services')}
                            >
                                <MdMiscellaneousServices /> <p>Services </p>
                            </li>
                            <li
                                className={`flex m-3 p-2 rounded-md hover:bg-gray-200 items-center gap-2 cursor-pointer ${currentPage === 'AboutUs' ? 'bg-gray-500 text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage('AboutUs')}
                            >
                                <FaInfoCircle /> <p>About us</p>
                            </li>

                            <li
                                className={`flex m-3 p-2 rounded-md hover:bg-gray-200 items-center gap-2 cursor-pointer ${currentPage === 'Careers' ? 'bg-gray-500 text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage('Careers')}
                            >
                                <IoPeople /> <p>Career</p>
                            </li>

                            <li
                                className={`flex m-3 p-2 rounded-md hover:bg-gray-200 items-center gap-2 cursor-pointer ${currentPage === 'Product' ? 'bg-gray-500 text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage('Product')}
                            >
                                <MdOutlineProductionQuantityLimits /> <p>Product</p>
                            </li>
                            <li
                                className={`flex m-3 p-2 rounded-md hover:bg-gray-200 items-center gap-2 cursor-pointer ${currentPage === 'Layout' ? 'bg-gray-500 text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage('Layout')}
                            >
                                <RiLayout6Line /> <p>Layout</p>
                            </li>
                        </ul>
                    </nav>
                </section>

                <section className="w-[80%] ml-[205px] p-4">
                    <div>
                        <div className="flex justify-between w-full bg-green-200 items-center rounded-lg">
                            <p className="text-gray px-3"> Tech-dice Website - Admin Panel </p>
                            <button type="button" onClick={handleLogout} className="bg-[#dddddd] p-2 rounded-md m-2">
                                Logout
                            </button>
                        </div>
                                                
                    </div>
                    <main className="">{renderPage()}</main>
                </section>
            </main>
        </>
    );
};

const Dashboard = () => {
    return (
        <Provider store={store}>
            <Board />
        </Provider>
    );
};

export default Dashboard;

