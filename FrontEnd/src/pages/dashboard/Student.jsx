import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student_nav";
import Sidebar from "../../components/Sidebar";
import style from "../../styles/pages/studentDash.module.css";

export default function Student() {
    const { id: routeId } = useParams();
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("username");
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!id || !token) {
            navigate("/login");
            return;
        }

        if (routeId !== id) {
            navigate(`/student/${id}`);
            return;
        }

        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/student/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate("/login");
                        return;
                    }
                    const data = await response.json().catch(() => null);
                    setError(data?.detail || "Unable to load student profile.");
                    return;
                }

                const data = await response.json();
                setStudent(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load dashboard. Please try again.");
            }
        };

        fetchStudent();
    }, [id, routeId, navigate]);

    return (
        <>
            <StudentNav username={student?.username || name} />
            <Sidebar />
            <div className={style["studentDash"]}>
                <h1>Student Dashboard</h1>
                {error && <p>{error}</p>}
                <p>Student ID: {student?.id || id}</p>
                <p>Hello, {student?.username || name}!</p>
            </div>
        </>
    );
}