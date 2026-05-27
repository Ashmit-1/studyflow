import { useState } from "react";
import "../styles/login.css"
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";


export default function Login() {
    const navigate = useNavigate();
    const [user, setName] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const HandleReg = (e) => {
        setName({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const submit = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append("username", user.username);
        formData.append("password", user.password);

        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Log for debugging 😁
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("username", data.username);
                navigate(`/student/${data.id}`);
            } else {
                setError("Invalid username or password");
                setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="div-btn">
                <div className="login-form">
                    <p>Login</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={HandleReg}
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={HandleReg}
                        className="login-input"
                    />
                    <button onClick={submit} className="login-btn">Login</button>
                </div>

            </div>
            {error && <Toast message={error} onClose={() => setError("")} />}
        </>
    );
}