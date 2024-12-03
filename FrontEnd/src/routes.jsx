import Layout from "./layout"
import SignUp from "./pages/Signup.jsx";
import SignIn from "./pages/Signin.jsx";
import JoinTeam from "./pages/JoinTeam";
import MainPage from "./pages/MainPage";
import MeetTeam from "./pages/MeetTeam";
import Services from "./pages/Service";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import MeetTeamLayout from "./pages/MeetTeamLayout";
import PersonDetail from "./components/PersonDetails";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        // Redirect to signin if not authenticated
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/signin",
                element: <SignIn />
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
                                element: <MeetTeam />
                            },
                            {
                                path: ":personId",
                                element: <PersonDetail />
                            }
                        ]
                    },
                    {
                        path: "/join-team",
                        element: <JoinTeam />
                    },
                    {
                        path: "/services",
                        element: <Services />
                    },
                    {
                        path: "/blog",
                        element: <Blog />
                    },
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    }
                ]
            },
        ]
    }
];