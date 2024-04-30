import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Dashboard from "./routes/Dashboard";

const router = createBrowserRouter(([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <SignIn/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/dashboard",
        element: <Dashboard userInfoURL={"/api/user-info"}/>
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard userInfoURL={"/api/admin/info"}/>
    },
]))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
