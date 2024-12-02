import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/elements/ScrollToTop";
import BookLink from "./components/elements/BookLink"
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
                <BookLink />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
export default Layout;