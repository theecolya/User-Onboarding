import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import schema from './formSchema'
import * as yup from 'yup'
import Form from './Comps/Form';

const defaultFormVals = {
  username: '',
  password: '',
  email: '',
  tos: false
}

const defaultFormErrors = {
  username: '',
  password: '',
  email: '',
  tos: ''
}

function App() {
  const [formValues, setFormValues] = useState(defaultFormVals);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const [users, setUsers] = useState([])

  const handleChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = () => {
    axios.post('https://reqres.in/api/users', formValues)
      .then(res => {
        setUsers([res.data, ...users])
    })
      .catch(err => console.error(err))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: '' }))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0] }))
  }

  return (
    <div className="App">
      <Form values={formValues} change={handleChange} errors={formErrors} submit={handleSubmit}/>
      {users.map(user => (
        <div key={user.id}>
          <p>
            {user.createdAt}
          </p>
          <p>
            {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
