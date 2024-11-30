import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom";
import "./Layout.css"

function Layout(){
    return(
        <>
            <header>
                <Navbar />
            </header>
            <main className="main-content">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
export default Layout;