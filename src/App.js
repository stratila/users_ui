import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserMeForm from './components/UserMeForm';

import { setAuthHeaderToken, getAuthToken, clearAuthToken } from './utils/auth';
import { loginUser, signupUser, getUsers, createUser, updateUser, deleteUser } from './utils/api';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const [authToken, setAuthToken] = useState(getAuthToken());
    const [users, setUsers] = useState([]);

    //to change to 
    useEffect(() => {
        if (authToken) {
            getUsers(authToken)
                .then((data) => setUsers(data))
                .catch((error) => {
                    console.log(error);
                    clearAuthToken(); // removes authToken from localStorage
                    setAuthToken(null); // sets authToken in state
                    setUsers([]);
                    //check wrong db record
                });
        } else {
            setUsers([]);
        }
    }, [authToken]);

    const handleLogin = async (email, password) => {
        const authToken = await loginUser(email, password);
        setAuthHeaderToken(authToken); // saves authToken to localStorage
        setAuthToken(authToken); // sets authToken in state
    };

    const handleSignup = async (email, password, first_name, middle_name, last_name) => {
        const authToken = await signupUser(email, password, first_name, middle_name, last_name);
        setAuthHeaderToken(authToken); // saves authToken to localStorage
        setAuthToken(authToken); // sets authToken in state

    };



    const handleLogout = () => {
        clearAuthToken(); // removes authToken from localStorage
        setAuthToken(null); // sets authToken in state to null to trigger redirect
    };

    const handleCreateUser = (name) => {
        createUser(authToken, name)
            .then((user) => setUsers([...users, user]))
            .catch((error) => console.log(error));
    };

    const handleUpdateUser = async (id, userData) => {
        try {
            const result = await updateUser(authToken, id, userData);
            if (result) {
                setUsers(users.map((user) => {
                    if (user.id === id) {
                        return {
                            ...user,
                            ...userData,
                        };
                    }
                    return user;
                }));
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const handleDeleteUser = (id) => {
        deleteUser(authToken, id)
          .then((success) => {
            if (success) {
              setUsers(users.filter((user) => user.id !== id));
            }
          })
          .catch((error) => console.log(error));
      };
    





    return (
        <Router>
            <ToastContainer />
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Users UI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {authToken && (

                            <NavDropdown title="Users" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/users">Users List</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav>
                        {authToken ? (
                            <NavDropdown title="My Account" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/users/me">My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link href="/login">Log in</Nav.Link>
                                <Nav.Link href="/signup">Sign up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <Routes>
                <Route path="/" element={authToken ? <Navigate to="/users/me" /> : <Navigate to="/login" />} />
                <Route path="/login" element={authToken ? <Navigate to="/users/me" /> : <LoginForm onLogin={handleLogin} />} />
                <Route path="/signup" element={authToken ? <Navigate to="/users/me" /> : <SignUpForm onSignUp={handleSignup} />} />
                <Route path="/users" element={authToken ? <UserList users={users} onDelete={handleDeleteUser} /> : <Navigate to="/login" />} />
                <Route path="/users/me" element={authToken ? <UserMeForm onSubmit={handleUpdateUser} /> : <Navigate to="/login" />} />
                <Route path="/users/:id" element={authToken ? <UserForm onSubmit={handleUpdateUser} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>

    );
};

export default App;
