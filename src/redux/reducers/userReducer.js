import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
  } from '../actions/userActions';
  
  const initialState = {
    loading: false,
    users: [],
    error: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USERS_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: '',
        };
      case FETCH_USERS_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload,
        };
      case ADD_USER:
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case EDIT_USER:
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      case DELETE_USER:
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  