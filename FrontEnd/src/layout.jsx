import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./components/elements/ScrollToTop/ScrollToTop";
import BookLink from "./components/elements/BookLink/BookLink";
import "./layout.css";

function Layout() {
    const location = useLocation();

    const showBookLink =
        location.pathname !== "/signin" && location.pathname !== "/signup";

    return (
        <>
            <ScrollToTop />
            <header>
                <Navbar />
            </header>
            <main className="main-content">
                <Outlet />
                {showBookLink && <BookLink />}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
export default Layout;
