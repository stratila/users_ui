import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUsersMe } from '../utils/api';
import { setAuthHeaderToken, getAuthToken, clearAuthToken } from '../utils/auth';
import { Form, Button } from 'react-bootstrap';

const UserMeForm = ({ onSubmit }) => {
  const [authToken, setAuthToken] = useState(getAuthToken());
  const [user, setUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [id, setId] = useState(user ? user.id : '');
  const [first_name, setFirstName] = useState(user ? user.first_name : '');
  const [middle_name, setMiddleName] = useState(user ? user.middle_name : '');
  const [last_name, setLastName] = useState(user ? user.last_name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : '');

  useEffect(() => {
    if (authToken) {
      getUsersMe(authToken).then((user) => setUser(user)).catch((error) => console.log(error));
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setMiddleName(user.middle_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
      setRole(user.role || '');
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    setFirstName(user.first_name);
    setMiddleName(user.middle_name);
    setLastName(user.last_name);
    setEmail(user.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user.id, { first_name, middle_name, last_name, email, role });
    setIsEditable(false);
  };

  return (

    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="w-50">
        <h1 className="text-center mb-4">{isEditable ? 'Edit User' : 'User Details'}</h1>
        <Form.Group controlId="formBasicFirstName" className="mt-3">
          <Form.Label>First Name</Form.Label>
          {isEditable ?
            <Form.Control type="text" placeholder="Enter first name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
            :
            <Form.Control type="text" plaintext readOnly defaultValue={first_name} className="border-bottom"/>
          }
        </Form.Group>

        <Form.Group controlId="formBasicMiddleName" className="mt-3">
          <Form.Label>Middle Name</Form.Label>
          {isEditable ?
            <Form.Control type="text" placeholder="Enter middle name" value={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
            :
            <Form.Control type="text" plaintext readOnly defaultValue={middle_name} className="border-bottom"/>
          }
        </Form.Group>

        <Form.Group controlId="formBasicLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          {isEditable ?
            <Form.Control type="text" placeholder="Enter last name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
            :
            <Form.Control type="text" plaintext readOnly defaultValue={last_name} className="border-bottom"/>
          }
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          {isEditable ?
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            :
            <Form.Control type="email" plaintext readOnly defaultValue={email} className="border-bottom"/>
          }
        </Form.Group>

        <Form.Group controlId="formBasicRole" className="mt-3">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" plaintext readOnly defaultValue={role} className="border-bottom"/>
        </Form.Group>

        {isEditable ?
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" type="button" onClick={() => handleCancelClick()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
          :
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" type="button" onClick={() => handleEditClick()}>
              Edit
            </Button>
          </div>
        }
      </Form>
    </div>
  );
};

UserMeForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    middle_name: PropTypes.string,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserMeForm;
