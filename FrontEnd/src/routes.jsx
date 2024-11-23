import Layout from "./layout"
import MainPage from "./pages/MainPage";

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            // {
            //     path: "/",
            //     element: <MeetTeam />,
            // },
        ]
    }
];