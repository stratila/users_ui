import React, { useState } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';



const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return;
    }
    await onLogin(email, password);
    setError('')
  };


  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="w-50">
        <h1 className="text-center mb-4">Log in</h1>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <div className="d-flex justify-content-left">
          <Button variant="primary" type="submit" className="mt-3">
            Log in
          </Button>
        </div>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};



export default LoginForm;
