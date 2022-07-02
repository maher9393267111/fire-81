import React from "react";
//import Menu from "./Menu";
//import "../styles.css";

const Layout = ({
    title ,
    description ,
    className,
    children
}) => (
    <div className=" bg:mt-4">
        {/* <Menu /> */}
        <div className="jumbotron">
            <h2 className="ml-6 text-2xl">{title}</h2>
            <p className="lead text-2xl ml-6">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;