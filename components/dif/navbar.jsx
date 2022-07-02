import React from "react";
import { Fragment } from "react";
import { useAuth } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const router = useRouter();
  console.log("💯💯💯", router.pathname);
  const [active, setActive] = useState('');
const {userinfo,logout}  = useAuth();
  // check current url path
  const checkPath = (path) => {
    console.log("path is--->", path);

console.log("router.pathname is--->", router.pathname);

  
  
      setActive(path);
      console.log("active is--->", active);
  
  };

  return (
    <div className=" h-[82px] bg-blue-600 flex justify-between">

        <ul className="   text-white text-md  font-bold flex  gap-12 relative top-[28px] left-[57px]">
         
        <li className="nav-item">
            <Link href="/"><a
             className={`${active == '/' ? '  text-red-500' : "text-white  "}  nav-link`}
              onClick={() => {checkPath('/') }}
              >Home</a>
            
            </Link>
          </li>

            
          <li className="nav-item">
            <Link href="/shop"><a
             className={`${active == '/shop' ? '  text-red-500' : "text-white "}  nav-link`}
              onClick={() => {checkPath('/shop') }}
              >Shop</a>
            
            </Link>
          </li>

      
          <li className="nav-item">
            <Link href="/cart"><a
             className={`${active == '/cart' ? '  text-red-500' : "text-white  "}  nav-link`}
              onClick={() => {checkPath('/cart') }}
              >Cart</a>
            
            </Link>
          </li>

            {userinfo && userinfo?.role === 'user'  && (
                
              <li className="nav-item">
              <Link href="/user/dashboard"><a
               className={`${active == '/user/dashboard' ? '  text-red-500' : "text-white  "}  nav-link`}
                onClick={() => {checkPath('/user/dashboard') }}
                >User Dashboard</a>
              
              </Link>
            </li>
            )}

            {userinfo&& userinfo?.role === 'admin' && (
              
              <li className="nav-item">
            <Link href="/admin/dashboard"><a
             className={`${active == '/admin/dashboard' ? '  text-red-500' : "text-white  "}  nav-link`}
              onClick={() => {checkPath('/admin/dashboard') }}
              >Admin Dashboard</a>
            
            </Link>
          </li>
            )}

            {!userinfo?.name && (
                <Fragment>
                  
                  <li className="nav-item">
            <Link href="/auth/login"><a
             className={`${active == '/auth/login' ? '  text-red-500' : "text-white "}  nav-link`}
              onClick={() => {checkPath('/auth/login') }}
              >Login</a>
            
            </Link>
          </li>



          <li className="nav-item">
            <Link href="/auth/signup"><a
             className={`${active == '/auth/signup' ? '  text-red-500' : "text-white  "}  nav-link`}
              onClick={() => {checkPath('/auth/signup') }}
              >Register</a>
            
            </Link>
          </li>
                </Fragment>
            )}

            {userinfo?.name && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            logout(() => {
                                router.push("/auth/login");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    

{/* --------search bar---------- */}

<div className=" mr-24">

<div>
<SearchBar/>
</div>


</div>


   
    </div>
  );
};

export default Navbar;
