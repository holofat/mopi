import React, {useEffect, useState} from 'react'
import { useTitle } from 'react-use'
import style from '../../styles/Login.module.css'

import auth from '../../services/user'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router'
import {setPage} from '../../reducers/pageReducer'
import {useDispatch} from 'react-redux'

import {useMutation, gql} from '@apollo/client'

const addUserQuery = gql`
mutation MyMutation($email: String = "", $username: String = "") {
  insert_users(objects: {email: $email, username: $username}) {
    affected_rows
  }
}
`

function Register() {
  useTitle('Register')

  const [addUser] = useMutation(addUserQuery)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPage('Register'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [data, setData] = useState({
    email: '',
    password: '',
    username: '',
    repeatPassword: ''
  })

  const handleRegister = e => {
    e.preventDefault()
    if(data.password === data.repeatPassword){
      auth.signup(data.email, data.password)
        .then(res => {
          Swal.fire({
            icon: 'success',
            text: 'Success Register'
          })
          addUser({variables: {
            email:data.email,
            username: data.username
          }})
          return <Redirect to="/login"/>
        })
        .catch(e => {
          Swal.fire({
            icon: 'error',
            text: 'Failed to Register'
          })
        })
    } else{
      Swal.fire({
        icon: 'error',
        text: 'Your password doesnt match each other'
      })
    }
  }

  return (
    <div className={`container my-4 ${style.container}`}>
      <h2>Register</h2>
      <h6>Have an account? <a href="/login">Login</a></h6>
      <form className="form-control" onSubmit={handleRegister}>
        
        <div className="mb-4">
          <label htmlFor="username" className="w-50">
            <b>Username</b><br/>
            <input type="text" className="form-control" name="username" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
          </label>
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="w-50">
            <b>Email</b><br/>
            <input type="email" className="form-control" name="email" value={data.email} onChange={e => setData({...data, email: e.target.value})}/>
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="w-50">
            <b>Password</b>
            <input type="password" className="form-control" name="password" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="w-50">
            <b>Repeat Password</b>
            <input type="password" className="form-control" name="password" value={data.repeatPassword} onChange={e => setData({...data, repeatPassword: e.target.value})}/>
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>

      </form>
    </div>
  )
}

export default Register
