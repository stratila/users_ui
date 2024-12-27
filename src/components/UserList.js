import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserList = ({ users, onDelete }) => (
  <div className="container my-5">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.middle_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>
                Delete
              </Button>
              <Link to={`/users/${user.id}`} className="btn btn-primary btn-sm ms-2">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      middle_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
