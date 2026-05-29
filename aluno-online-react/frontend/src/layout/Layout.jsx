import { Outlet } from "react-router";
import Menu from "../components/Menu"
import Sidebar from "../components/Sidebar";
import React from "react"

function Layout () {
    return (
        <>
    
            <Sidebar />
        
    
            <Outlet/>
       
        </>
    )
}

export default Layout; 
