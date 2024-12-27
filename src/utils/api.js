import axios from 'axios';
import { toast } from 'react-toastify';


// Get the API URL from the environment variable, defaulting to a local URL if not set
const API_BASE_URL = 'http://localhost:8008'

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    })

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.detail);
  }
};

export const signupUser = async (email, password, first_name, middle_name, last_name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      email,
      password,
      first_name,
      middle_name,
      last_name,
    });
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.log(error);
    toast(error.response.data.detail);
  }
};

export const getUsers = async (authToken, user_id, users_ids, email, first_name, middle_name, last_name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        user_id: user_id,
        users_ids: users_ids,
        email: email,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast(error.response.data.detail);
  }
};

export const getUser = async (authToken, id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast(error.response.data.detail);
  }
};


export const getUsersMe = async (authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast(error.response.data.detail);
  }
};

export const createUser = async (authToken, userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast(error.response.data.detail);
  }
};

export const updateUser = async (authToken, id, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.detail);
    console.log(error);
    return false
  }
};

export const deleteUser = async (authToken, id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.detail);
    return false
  }
};


