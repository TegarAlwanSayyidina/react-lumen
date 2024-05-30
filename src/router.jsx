import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff";
import StuffTrash from "./pages/StuffTrash";
import Inbound from "./pages/Inbound";
import InboundCreate from "./pages/InboundCreate";
import ShowInbound from "./pages/ShowInbound";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login />  }, 
    { path: '/profile', element: <Profile />},
    { path: '/stuffs', element: <Stuff />},
    { path: '/stuffs/trash', element: <StuffTrash />},
    { path: '/inbound', element:<Inbound />},
    { path: '/InboundCreate', element: <InboundCreate />},
    { path: '/showInbound/:id', element: <ShowInbound />},
])
