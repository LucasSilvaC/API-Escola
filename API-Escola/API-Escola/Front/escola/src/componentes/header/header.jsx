import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header/style.css";

export default function Header() {
    const navigate = useNavigate(); 
    return (
        <header>
            <h1>Escola</h1>
            <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/login")}>Login</li>
            </ul>
        </header>
    );
}
