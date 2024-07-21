import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePosts from "./pages/CreatePosts";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
        console.log(response.data);
      });
  }, []);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">
              <strong className="text1">Back Home</strong>
            </Link>
            <Link to="/createpost">
              <strong className="text1">Create Post</strong>
            </Link>
            {!authState.status ? (
              <>
                <Link to="/login">
                  <strong className="text1">Login</strong>
                </Link>

                <Link to="/register">
                  <strong className="text1">Register</strong>
                </Link>
              </>
            ) : (
              <button onClick={Logout}>Logout</button>
            )}
            <h1>{authState.username}</h1>
          </div>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/createpost" exact Component={CreatePosts} />
            <Route path="/post/:id" exact Component={Posts} />
            <Route path="/login" exact Component={Login} />
            <Route path="/register" exact Component={Register} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
