import Layout from "./layout";
import SignUp from "./pages/authentication/Signup.jsx";
import SignIn from "./pages/authentication/Signin.jsx";
import JoinTeam from "./pages/join team/JoinTeam.jsx";
import MainPage from "./pages/main page/MainPage.jsx";
import MeetTeam from "./pages/meet team/MeetTeam.jsx";
import Services from "./pages/services/Service.jsx";
import Blog from "./pages/blog/Blog.jsx";
import UserProfile from "./pages/user profile/UserProfile.jsx"
import MeetTeamLayout from "./pages/meet team/MeetTeamLayout.jsx";
import PersonDetail from "./components/PersonDetails";
import { Outlet,Navigate, useNavigate } from "react-router-dom";
import BookAppt from "./pages//book appointment/BookAppt.jsx";
import Personselect from "./components/Personselect.jsx";
import Calendar from "./components/Calendar.jsx";
import Finalform from "./pages/forms/Finalform.jsx";
import OrderDetail from "./pages/book appointment/OrderDetail.jsx";
import PersonSelectLayout from "./pages/book appointment/PersonSelectLayout.jsx";
import {jwtDecode} from "jwt-decode"; 
import {useState, useEffect} from "react";

export const authEvent = new EventTarget();

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthToken = () => {
            const authToken = localStorage.getItem("authToken");

            if (authToken) {
                try {
                    const decodedToken = jwtDecode(authToken);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp < currentTime) {
                        handleLogout();
                    }
                } catch (error) {
                    handleLogout();
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        const handleLogout = () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("loggedInUserEmail");
            localStorage.removeItem("userDetails");
            setIsAuthenticated(false);
            authEvent.dispatchEvent(new Event('authStateChanged'));
            alert("Your session has expired. Please sign in again.");
            navigate("/signin");
        };

        checkAuthToken();
        const interval = setInterval(checkAuthToken, 5 * 60 * 1000); 

        return () => clearInterval(interval); 
    }, [navigate]);

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};


export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/signin",
                element: <SignIn />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/meet-team",
                        element: <MeetTeamLayout />,
                        children: [
                            {
                                index: true,
                                element: <MeetTeam />,
                            },
                            {
                                path: ":personId",
                                element: <PersonDetail />,
                            },
                        ],
                    },
                    {
                        path: "/join-team",
                        element: <JoinTeam />,
                    },
                    {
                        path: "/services",
                        element: <Services />,
                    },
                    {
                        path: "/blog",
                        element: <Blog />,
                    },
                    {
                        path: "/profile",
                        element: <UserProfile />,
                    },
                ],
            },
            {
                path: "/book-appointment",
                element: <BookAppt />,
            },
            {
                path: "/person",
                element: <PersonSelectLayout />,
                children: [
                    {
                        index: true,
                        element: <Personselect />,
                    },
                    {
                        path: "calendar",
                        element: <Calendar />,
                    },
                ],
            },
            {
                path: "/form",
                element: <Finalform />,
            },
            {
                path: "/order",
                element: <OrderDetail />,
            },
        ],
    },
];