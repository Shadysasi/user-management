import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
  // State variables to manage users, loading state, form visibility, edit user, error, current page, and users per page
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [usersPerPage] = useState(5); 

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setError(`Failed to delete user with id ${id}`);
    }
  };

  // Handle editing a user
  const handleEditUser = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  // Handle opening the form to add a new user
  const handleOpenForm = () => {
    setShowForm(true);
    setEditUser(null);
  };

  // Handle closing the form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditUser(null);
  };

  // Function to handle updating a user
  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowForm(false);
    setEditUser(null);
  };

  // Function to handle adding a new user
  const handleUserAdd = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowForm(false);
    setEditUser(null);
  };

  // Get current users for the current page
  const indexOfLastUser = currentPage * usersPerPage; 
  const indexOfFirstUser = indexOfLastUser - usersPerPage; 
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); 

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  if (loading) {
    return <p className='text-lg text-blue-600 flex justify-center items-center'>Loading users ...</p>;
  }

  if (error) {
    return <p className="text-bg-red">{error}</p>;
  }

  return (
    <>
      {showForm ? (
        <UserForm
          user={editUser}
          onClose={handleCloseForm}
          onAddUser={handleUserAdd}
          onUpdateUser={handleUserUpdate}
        />
      ) : (
        <section className="max-w-6xl mx-auto px-8 py-20 w-full">
          <div className="flex flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <h1 className="font-bold text-blue-gray-600">User List</h1>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={handleOpenForm}
                className="text-white gap-2 flex items-center justify-center bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
              >
                + Add User
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    E-Mail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => ( // Render current users instead of all users
                  <tr
                    key={user.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name.split(' ')[0]}</td>
                    <td className="px-6 py-4">{user.name.split(' ')[1] || ''}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.company?.name || 'N/A'}</td>
                    <td className="flex gap-3 px-6 py-4">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginate={paginate}
          />
        </section>
      )}
    </>
  );
};

// Pagination component to handle page navigation
const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];

  // Calculate the total number of pages
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserList;
