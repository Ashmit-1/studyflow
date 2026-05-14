import { useState } from "react"
import "./App.css"

function App() {
  const [user, setUser] = useState({
    username: "",
    Email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };
  return (
    <>
      <div className="div-btn">
        <div className="form-btn">
          <p>LOGIN</p>
          <div className="page-set">
            <input type="text" name="username" value={user.username} placeholder=" " onChange={handleChange} required />
            <label>Username</label>
          </div>
          <div className="page-set">
            <input type="email" name="Email" value={user.Email} placeholder=" " onChange={handleChange} required />
            <label>Email</label>
          </div>
          <div className="page-set">
            <input type="password" name="password" value={user.password} placeholder=" " onChange={handleChange} required />
            <label>Password</label>
          </div>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </>
  );
}
export default App
