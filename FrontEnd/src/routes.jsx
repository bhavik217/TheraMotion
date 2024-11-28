import Layout from "./layout"
import JoinTeam from "./pages/JoinTeam";
import MainPage from "./pages/MainPage";
import MeetTeam from "./pages/MeetTeam";
import SignUpLoginPage from "./pages/SignUpLoginPage";

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
                path: "/meet-team",
                element: <MeetTeam />
            },
            {
                path: "/join-team",
                element: <JoinTeam/>
            },
            {
                path: "/login",
                element: <SignUpLoginPage initialMode="login" />
            },
            {
                path: "/signup",
                element: <SignUpLoginPage initialMode="signup" />
            }
        ]
    }
];