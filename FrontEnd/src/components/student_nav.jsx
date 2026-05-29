import { Link } from "react-router-dom";
import "../styles/student_nav.css";

export default function StudentNav({ username = "Student" }) {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Hello, {username}!</h1>
            <ul className="nav-list">
                <li><Link to="/student/dashboard">Dashboard</Link></li>
                <li><Link to="/student/table">Study Table</Link></li>
                <li><Link to="/student/add_subject">Add Subject</Link></li>
                <li><Link to="/student/settings">Settings</Link></li>
            </ul>
        </nav>
    );
}