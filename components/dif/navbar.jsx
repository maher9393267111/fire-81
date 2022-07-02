import React from "react";
import { useAuth } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  console.log("💯💯💯", router.pathname);
  const [active, setActive] = useState('');

  // check current url path
  const checkPath = (path) => {
    console.log("path is--->", path);

console.log("router.pathname is--->", router.pathname);

  
  
      setActive(path);
      console.log("active is--->", active);
  
  };

  return (
    <div>
      <div>
        <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link  href="/"><a
             className={`${active === '/' ? '  text-red-500' : "text-blue-500 "}  nav-link`}
              onClick={() => {checkPath('/') }}
              >Home</a>
            
            </Link>
          </li>


          <li className="nav-item">
            <Link href="/auth/login"><a
             className={`${active == '/auth/login' ? '  text-red-500' : "text-blue-500 "}  nav-link`}
              onClick={() => {checkPath('/auth/login') }}
              >Register</a>
            
            </Link>
          </li>

<p className=" bg-green-300">sa</p>


        </ul>
      </div>
    </div>
  );
};

export default Navbar;
