import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/elements/ScrollToTop";
import "./Layout.css"

function Layout(){
    return(
        <>
            <ScrollToTop />
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