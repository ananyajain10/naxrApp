"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "./utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-5xl mx-auto z-50 flex flex-row justify-between", className)}
    >
<div>
<Logo/>
</div>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href={"/services"}>
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

          </Link>
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

          
        
      </Menu>
    </div>
  );
}

export default Navbar;
