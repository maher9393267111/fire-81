import React from "react";
import Link from "next/link";
const UserLinks = ({ userid }) => {
  return (
    <div className="   ml-4 mr-4">
      <div className=" ml-12 border-2 min-h-[310px] w-[70%]">
        {/* ---header--- */}

        <div>
          <h1 className=" text-xl font-bold text-center border-b-2 p-2">
            Admin Links
          </h1>
        </div>

        <>
          <ul className="list-group">
            <li className="list-group-item my-4 text-xl text-center">
              <Link className="nav-link" href="/admin/product">
                <a> Create Product</a>
              </Link>
            </li>
            <li className="list-group-item my-4 text-xl text-center">
              <Link className="nav-link" href={`/admin/category`}>
                <a> Create Category</a>
              </Link>
            </li>
          </ul>
        </>
      </div>
    </div>
  );
};

export default UserLinks;
