import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Student() {
    const { id } = useParams();
    const name = localStorage.getItem("username");
    const navigate = useNavigate();

    return (
        <>
            <h1>Student Dashboard</h1>
            <p>Student ID: {id}</p>
            <p>Student Name: {name}</p>
        </>
    );
}