import React from "react"
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function Layout () {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;