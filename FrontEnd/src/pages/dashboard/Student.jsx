import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StudentNav from "../../components/student_nav";
import Sidebar from "../../components/Sidebar";
import style from "../../styles/pages/studentDash.module.css";

export default function Student() {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("username");
    const navigate = useNavigate();

    return (
        <>
            < StudentNav username={name} />
            <Sidebar />
            <div className={style["studentDash"]}>
                <h1>Student Dashboard</h1>
                <p>Student ID: {id}</p>
                <p>Hello, {name}!</p>
            </div>
        </>
    );
}