import Layout from "./layout"
import SignUpLoginPage from "./pages/SignUpLoginPage";
import JoinTeam from "./pages/JoinTeam";
import MainPage from "./pages/MainPage";
import MeetTeam from "./pages/MeetTeam";
import Blog from "./pages/Blog";
import MeetTeamLayout from "./pages/MeetTeamLayout";
import PersonDetail from "./components/PersonDetails";

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
                path: "/login",
                element: <SignUpLoginPage initialMode="login" />
            },
            {
                path: "/signup",
                element: <SignUpLoginPage initialMode="signup" />
            },
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
                element: <JoinTeam/>
            },
            {
                path: "/blog",
                element: <Blog/>
            },
        ]
    }
];