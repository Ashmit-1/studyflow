import { useState } from "react";
import styles from "../styles/register.module.css";
import Toast from "../components/Toast";

function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("")
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const submit = async () => {
        const response = await fetch("http://127.0.0.1:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            setError("something went wrong");
        }
    };
    return (
        <>
            <div className={styles["div-btn"]}>
                <div className={styles["form-btn"]}>
                    <p>Register</p>
                    <div className={styles["page-set"]}>
                        <input type="text" name="username" value={user.username} placeholder=" " onChange={handleChange} required />
                        <label>Username</label>
                    </div>
                    <div className={styles["page-set"]}>
                        <input type="email" name="email" value={user.email} placeholder=" " onChange={handleChange} required />
                        <label>Email</label>
                    </div>
                    <div className={styles["page-set"]}>
                        <input type="password" name="password" value={user.password} placeholder=" " onChange={handleChange} required />
                        <label>Password</label>
                    </div>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
            {error && <Toast message={error} onClose={() => setError("")} />}
        </>
    );
}
export default Register