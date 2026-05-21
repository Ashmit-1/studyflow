import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">StudyFlow</p>
          <h1>Organize your study journey with AI-powered planning.</h1>
          <p className="hero-copy">
            Build better study habits, track progress, and keep your goals on schedule with a smart planner designed for learners.
          </p>
          <div className="hero-actions">
            <Link className="btn primary-btn" to="/register">
              Get Started
            </Link>
            <Link className="btn secondary-btn" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="card-block">
            <h2>Study plans</h2>
            <p>Create structured study routines and stay on track.</p>
          </div>
          <div className="card-block">
            <h2>Topic priority</h2>
            <p>Organize your subjects by importance and deadline.</p>
          </div>
          <div className="card-block">
            <h2>Progress tracking</h2>
            <p>Visualize your completion and maintain momentum.</p>
          </div>
        </div>
      </header>

      <nav className="home-nav">
        <div className="nav-brand">StudyFlow</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <section className="feature-grid">
        <article>
          <h3>Smart Study Dashboard</h3>
          <p>See your upcoming tasks, exam deadlines, and study progress in one place.</p>
        </article>
        <article>
          <h3>Secure User Accounts</h3>
          <p>Register safely and store your study preferences with encrypted passwords.</p>
        </article>
        <article>
          <h3>Fast API Integration</h3>
          <p>Connect to a backend powered by FastAPI and MySQL for reliable data storage.</p>
        </article>
      </section>

      <section className="about-section">
        <div>
          <h2>Designed for focused learners</h2>
          <p>
            StudyFlow helps you plan every subject, manage topic priority, and turn study chaos into a clear routine.
            Start by registering, then build your study path with ease.
          </p>
        </div>
      </section>
    </div>
  );
}