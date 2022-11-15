import React from "react";
import Link from "next/link";
import Image from "next/image";
import { logo } from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className=" mx-8 pt-10 pb-1 border-b-2 ">
      <Link href="/">
        <h1 className="font-semibold text-xl lg:text-2xl">Rean2Rean Blog</h1>
      </Link>
    </div>
  );
};

export default Navbar;
