import { useState } from "react";
import "../styles/login.css"

export default function Login() {
    const [user, setName] = useState({
        username: "",
        password: ""
    });
    const HandleReg = (e) => {
        setName({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const submit = async () => {
        const respone = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (respone.ok) {
            alert("Login successful");
        } else {
            alert("Login failed");
        }
    }
    return (
        <>
            <div className="div-btn">
                <div className="login-form">
                    <h2>Login</h2>
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
        </>
    );
}