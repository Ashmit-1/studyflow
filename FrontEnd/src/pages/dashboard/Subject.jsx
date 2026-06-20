import { useEffect, useState } from "react";
import StudentNav from "../../components/student_nav";
import Sidebar from "../../components/Sidebar";
import Toast from "../../components/Toast";
import styles from "../../styles/pages/subject.module.css";

export default function Subject() {
    let [subject, setSubjectName] = useState({
        subject_name: "",
        exam_date: "",
        difficulty: ""
    });
    let [subjects, setSubjects] = useState([]);
    let [error, setError] = useState("");

    let userId = localStorage.getItem("id");
    let username = localStorage.getItem("username");


    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/student/${userId}/subjects`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setError("You are not authorized to view subjects. Please sign in again.");
                        return;
                    }
                    setError("Unable to load your subjects right now. Please refresh the page.");
                    return;
                }

                const data = await response.json();
                setSubjects(data.subjects || []);
            } catch (err) {
                console.error("Error fetching subjects:", err);
                setError("Unable to load your subjects. Please refresh or try again later.");
            }
        };

        if (userId) {
            fetchSubjects();
        }
    }, [userId]);

    const onSubmit = async (e) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/student/${userId}/subjects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`

                },
                body: JSON.stringify(subject)
            });

            const data = await response.json();
            setSubjectName({ subject_name: "", exam_date: "", defficulty: "" });
            setSubjects([...subjects, data.subject]);
        } catch (error) {
            console.error("Error adding subject:", error);
            setError("Could not add the subject. Please check the details and try again.");
        }
    };

    return (
        <div className={styles["subjectContainer"]}>
            <StudentNav username={username} />
            <Sidebar />
            <h1>Subject Page</h1>
            {error && <Toast message={error} onClose={() => setError("")} />}

            <div className={styles["addSubject"]}>
                <h2>Add Subject</h2>
                <input
                    type="text"
                    placeholder="Subject Name"
                    value={subject.subject_name}
                    onChange={(e) => setSubjectName({ ...subject, subject_name: e.target.value })}
                />
                <input
                    type="date"
                    value={subject.exam_date}
                    onChange={(e) => setSubjectName({ ...subject, exam_date: e.target.value })}
                />
                <div className={styles["difficultyGroup"]}>
                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="easy"
                            checked={subject.difficulty === "easy"}
                            onChange={(e) =>
                                setSubjectName({ ...subject, difficulty: e.target.value })
                            }
                        />
                        Easy
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="medium"
                            checked={subject.difficulty === "medium"}
                            onChange={(e) =>
                                setSubjectName({ ...subject, difficulty: e.target.value })
                            }
                        />
                        Medium
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="hard"
                            checked={subject.difficulty === "hard"}
                            onChange={(e) =>
                                setSubjectName({ ...subject, difficulty: e.target.value })
                            }
                        />
                        Hard
                    </label>
                </div>
                <button onClick={onSubmit}>Add Subject</button>
            </div>

            <div className={styles["subjectTable"]}>
                <h2>Your Subjects</h2>
                {subjects.length === 0 ? (
                    <p>No subjects added yet.</p>
                ) : (
                    <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Subject ID</th>
                                <th>Subject Name</th>
                                <th>Exam Date</th>
                                <th>Difficulty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subj) => (
                                <tr key={subj.id}>
                                    <td>{subj.id}</td>
                                    <td>{subj.subject_name}</td>
                                    <td>{subj.exam_date}</td>
                                    <td>{subj.difficulty}</td>
                                    <td><button>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}