import Layout from "./layout"
import SignUpSigninPage from "./pages/SignUpSignInPage";
import JoinTeam from "./pages/JoinTeam";
import MainPage from "./pages/MainPage";
import MeetTeam from "./pages/MeetTeam";
import Services from "./pages/Service";
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
                path: "/Signin",
                element: <SignUpSigninPage initialMode="Signin" />
            },
            {
                path: "/signup",
                element: <SignUpSigninPage initialMode="signup" />
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
                path: "/services",
                element: <Services/>
            },
            {
                path: "/blog",
                element: <Blog/>
            },
        ]
    }
];