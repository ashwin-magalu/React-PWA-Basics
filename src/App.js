import React, { useEffect } from "react";
import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import firebase from "./config/firebase";

function App() {
  useEffect(() => {
    // Using firebase for push notifications
    const msg = firebase.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        console.log("firebase token: ", data);
      });
    return () => {
      //
    };
  }, []);

  return (
    <div className="app">
      <Router>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">React PWA</Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
