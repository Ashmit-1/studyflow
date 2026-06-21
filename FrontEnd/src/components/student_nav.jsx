import { Link } from "react-router-dom";
import styles from "../styles/components/student_nav.module.css";

export default function StudentNav({ username = "Student" }) {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles["navbar-title"]}>Welcome Back, {username}!</h1>
            <ul className={styles["nav-list"]}>
                <li><Link to="/student/table">Study Table</Link></li>
                <li><Link to="/student/:id/subjects">Add Exam</Link></li>
                <li><Link to="/student/help">Help</Link></li>
                <li><Link to="/student/logout">Logout</Link></li>
            </ul>
        </nav>
    );
}