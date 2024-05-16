import { useEffect, useState } from 'react'
import './App.css'
import './components/FormUser'
import'./components/UserCard'
import useCrud from './assets/hooks/useCrud'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'

function App() {
  const [userSelect, setUserSelect] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [message, setMessage] = useState('')

  const [users, getUsers, createUser, deleteUser, updateUser] = useCrud('/users/');

  useEffect(() => {
    getUsers();
  }, []);

  const handleCreateUserClick = () => {
    setUserSelect(null);
    setFormIsOpen(true); 
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 2500);
  };


  return (
    <div>
      <header>
        <h1>User Crud</h1>
        <button className='button' onClick={handleCreateUserClick}>Create New User</button>
      </header>
      {formIsOpen && ( 
        <FormUser 
          createUser={(data) => {
            createUser(data);
            showMessage('User created successfully');
          }}
          userSelect={userSelect}
          updateUser={(id, data) => {
            updateUser(id, data);
            showMessage('User updated successfully');
          }}
          setUserSelect={setUserSelect}
          formIsOpen={formIsOpen}
          setFormIsOpen={setFormIsOpen}
        />
      )}
       {message && <div className="message-container"><div className="message">{message}</div></div>}
      <div className='user-container'>
        {users?.map(user => (
          <UserCard 
            key={user.id}
            user={user}
            deleteUser={(id) => {
              deleteUser(id);
              showMessage('User deleted successfully');
            }}
            setUserSelect={setUserSelect}
            setFormIsOpen={setFormIsOpen}
          />  
        ))}
      </div>
    </div>
  );
}

export default App;
