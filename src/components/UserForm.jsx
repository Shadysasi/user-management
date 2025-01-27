import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

// Initial state for the form data
const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  company: {
    name: ''
  },
  error: null
};

// UserForm component to handle adding and editing users
const UserForm = ({ user, onClose, onAddUser, onUpdateUser }) => {
  // State for form data and errors
  const [formData, setFormData] = useState(user ? 
    { ...user,
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1],
      company: { name: user.company?.name || '' },
      error: null
    } : initialState
  );

  const [errors, setErrors] = useState({});
  const idRef = useRef(null);

  // Focus on the ID input field when the form is first rendered
  useEffect(() => {
    if (formData.id === "" && idRef.current) {
      idRef.current.focus();
    }
  }, [formData.id]);

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    tempErrors.id = formData.id ? "" : "User ID is required.";
    tempErrors.firstName = formData.firstName ? "" : "First Name is required.";
    tempErrors.lastName = formData.lastName ? "" : "Last Name is required.";
    tempErrors.email = (/^[^@\s]+@[^@\s]+\.[^@\s]+$/).test(formData.email) ? "" : "Email is not valid.";
    tempErrors.department = formData.department ? "" : "Department is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!validate()) {
      return;
    }

    const { id, firstName, lastName, email, department } = formData;
    const newUser = {
      id: parseInt(id),
      name: `${firstName} ${lastName}`,
      email,
      company: {
        name: department
      }
    };

    try {
      if (user) {
        // Update existing user
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newUser);
        onUpdateUser(newUser);
      } else {
        // Add new user
        await axios.post(`https://jsonplaceholder.typicode.com/users`, newUser);
        onAddUser(newUser);
      }
    } catch (error) {
      setFormData({ ...formData, error: 'Failed to submit form' });
    }
  };

  return (
    <div className='lg:w-8/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto'>
      <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center w-full m-auto">
        <ul className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
          <li className='text-left flex flex-col gap-2 w-full'>
            <label className='font-semi-bold'> User ID:
              <input
                type='number'
                name='id'
                value={formData.id}
                placeholder='User Id'
                onChange={handleChange}
                ref={idRef}
                required
                className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
              />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </label>
          </li>
          <li>
            <label className='font-semi-bold'> First Name:
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                placeholder='First Name'
                onChange={handleChange}
                required
                className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </label>
          </li>
          <li>
            <label className='font-semi-bold'> Last Name:
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                placeholder='Last Name'
                onChange={handleChange}
                required
                className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </label>
          </li>
          <li>
            <label className='font-semi-bold'> E Mail:
              <input
                type='email'
                name='email'
                value={formData.email}
                placeholder='E Mail'
                onChange={handleChange}
                required
                className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </label>
          </li>
          <li>
            <label className='font-semi-bold'> Department:
              <input
                type='text'
                name='department'
                value={formData.department}
                placeholder='Department'
                onChange={handleChange}
                required
                className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
              />
              {errors.department && <p className="text-red-500">{errors.department}</p>}
            </label>
          </li>
        </ul>
        {formData.error && <p className='text-bg-red'>{formData.error}</p>}
        <div className='flex gap-3'>
          <button type='submit' className="flex justify-center items-center gap-2 py-3 px-4 bg-violet-600 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-violet-800 lg:m-0 md:px-6">
            {user ? 'Update User' : 'Add User'}
          </button>
          <button type='button' onClick={onClose} className="flex justify-center items-center gap-2 py-3 px-4 bg-violet-600 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-violet-800 lg:m-0 md:px-6">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
