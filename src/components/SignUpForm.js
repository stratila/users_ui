import React, { useState } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';


const SignUpForm = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            onSignUp(email, password, firstName, middleName, lastName);
        } else {
            setPasswordsMatch(false);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Sign Up</h1>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicFirstName" className="mt-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicMiddleName" className="mt-3">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter middle name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicLastName" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                {!passwordsMatch && <div className="text-danger mb-3">Passwords do not match</div>}

                <div className="d-flex justify-content-left">
                    <Button variant="primary" type="submit" className="mt-3">
                        Sign Up
                    </Button>
                </div>
            </Form>
        </div>
    );
};

SignUpForm.propTypes = {
    onSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
