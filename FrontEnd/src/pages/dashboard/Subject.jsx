import { useState } from "react";
import StudentNav from "../../components/student_nav";
import Sidebar from "../../components/Sidebar";

export default function Subject() {
    let [subject, setSubjectName] = useState({
        subject_name: "",
        exam_date: ""
    });

    let userId = localStorage.getItem("id");
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

            setSubjectName({ subject_name: "", exam_date: "" });
        } catch (error) {
            console.error("Error adding subject:", error);
        }
    };

    return (
        <div className="subject-container">
            <StudentNav username={user_name} />
            <Sidebar/>
            <h1>Subject Page</h1>
            <p>Add Subject</p>
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
            <button onClick={onSubmit}>Add Subject</button>
        </div>
    );
}