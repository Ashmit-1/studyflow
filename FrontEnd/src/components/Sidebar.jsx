import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar">
                <ul className="nav-list">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/study-plans">Study Plans</Link></li>
                    <li><Link to="/progress">Progress</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </aside>
    );
}