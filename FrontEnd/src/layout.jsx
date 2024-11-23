import Navbar from "./components/elements/Navbar"
import Footer from "./components/elements/Footer"
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <header>
                <Navbar logo={"/MovemendLogo.png"}/>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
export default Layout;