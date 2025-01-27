import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
    dispatch({ type: ADD_USER, payload: response.data });
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const editUser = (id, user) => async (dispatch) => {
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
    dispatch({ type: EDIT_USER, payload: response.data });
  } catch (error) {
    console.error('Error editing user:', error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
