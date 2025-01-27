import React from 'react'
import UserList from './components/UserList';

const App = () => {

  return (
      <div>
        <h1 className="font-bold text-blue-600 text-2xl text-center">User Management App</h1>
        <UserList/>
      </div>
  );
};

export default App;
