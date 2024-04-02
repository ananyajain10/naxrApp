"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "./utils/cn";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { logoutAdmin } from '../redux/actions/authSlice'
import { useDispatch, useSelector} from 'react-redux';

function Navbar({ className }: { className?: string }) {
  

  const loggedIn = Cookies.get('admin_token');
  const [active, setActive] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logoutAdmin());
    toast.success('Logged out successful');
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Website Development</HoveredLink>
              <HoveredLink href="/interface-design">
                Interface Design
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>



          {/* <Link href={"/contact"}>
            <MenuItem
            setActive={setActive}
            active={active}
            item="Careers"
          >Explore Careers</MenuItem>
            </Link> */}
         
            <Link href={"/contact"}>
            <MenuItem
            setActive={setActive}
            active={active}
            item="Contact"
          >Contact Us</MenuItem>
            </Link>

            <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
            {loggedIn ? (
              <HoveredLink href="" onClick={(e) => handleLogout(e)}>Log out</HoveredLink>
            ) : (
              <>
                <HoveredLink href="/login">Log In</HoveredLink>
                <HoveredLink href="/signup">Sign up</HoveredLink>
              </>
            ) }
            </div>
          </MenuItem>
         
        
      </Menu>
    </div>
  );
}

export default Navbar;
