import { Outlet } from "react-router";
import Menu from "../components/Menu"
import Sidebar from "../components/Sidebar";

function Layout () {
    return (
        <>
    
            <Sidebar />
        
    
            <Outlet/>
       
        </>
    )
}

export default Layout; 