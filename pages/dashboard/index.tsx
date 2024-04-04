// 

import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdMiscellaneousServices, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { RiLayout6Line } from "react-icons/ri";
import '../../src/app/globals.css';
import Image from "next/image";
import homebg from '../../src/assets/logo2.png'
import AddService from '../../src/components/service/AddService'
import 'react-toastify/dist/ReactToastify.css';
// import AboutUs from '../../src/components/AboutUs';
// import Services from '../../src/components/Services';
// import Careers from '../../src/components/Careers';
// import Applications from '../../src/components/Applications';
// import Product from '../../src/components/Product';
// import Layout from '../../src/components/Layout';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState('AboutUs');
    const [addService, setAddService] = useState(true);

    const renderPage = () => {
        switch (currentPage) {
            case 'AboutUs':
                return <div>About us</div>;
            case 'Services':
                return <div>Services</div>;
            case 'Careers':
                return <div>Careers</div>;
            case 'Applications':
                return <div>Applications</div>;
            case 'Product':
                return <div>Product</div>;
            case 'Layout':
                return <div>Layout</div>;
            default:
                return null;
        }
    };

    return (
        <>
            <main className='flex'>
                <section className="bg-[#dddddd] h-[100vh] w-[200px] p-4">
                    <span className='flex w-full items-center gap-2'>
                        <Image
                            src={homebg}
                            alt="homebg"
                            className="rounded-2xl flex items-center z-20 "
                            width={50}
                            height={50}
                        />
                        <h1 className="mx-4">Tech-Dice</h1>
                    </span>
                    <span className='flex w-full items-center gap-2'>
                        <Image
                            src={homebg}
                            alt="homebg"
                            className="rounded-2xl flex items-center z-20 "
                            width={50}
                            height={50}
                        />
                        <h1 className="">Daniel Ochuba</h1>
                    </span>

                    <div className='w-full text-left mt-[110px]'>
                        <span> Contents </span>
                        <div className='w-full '>
                            <span className='flex m-3 items-center gap-2' onClick={() => setCurrentPage('AboutUs')}><FaInfoCircle /> <p>About us</p></span>
                            <span className='flex m-3 items-center gap-2' onClick={() => setCurrentPage('Services')}><MdMiscellaneousServices /> <p>Services</p></span>
                            <span className='flex m-3 items-center gap-2' onClick={() => setCurrentPage('Careers')}><IoPeople /> <p>Career</p></span>
                            <span className='flex m-3 items-center gap-2' onClick={() => setCurrentPage('Applications')}><GrNotes /> <p>Applications</p></span>
                            <span className='flex m-3 items-center gap-2' onClick={() => setCurrentPage('Product')}><MdOutlineProductionQuantityLimits /> <p>Product</p></span>
                            <span className='flex m-3 items-center gap-2' onClick={() => setCurrentPage('Layout')}><RiLayout6Line /> <p>Layout</p></span>
                        </div>
                    </div>
                </section>

                <section>
                    <div>
                        <p className='text-gray px-3'> Tech-dice Website - Admin Panel </p>
                        <button type="button" onClick={() => setAddService(!addService)} className='bg-[#dddddd] p-2 rounded-md m-2'>Add Service</button>
                        {addService && <AddService />

                        }
                    </div>
                    <main className=''>
                        {renderPage()}
                    </main>

                </section>

            </main>
        </>
    )
}

export default Dashboard;
