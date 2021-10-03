// Library
import React, {useEffect, useState} from 'react'
import {useTitle} from 'react-use'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import { Redirect } from 'react-router'


// File and Configuration
import {setPage} from '../../reducers/pageReducer'
import { LOGIN } from '../../reducers/userReducer'
import style from '../../styles/Login.module.css'
import auth from '../../services/user'

import {
  useSubscription,
  gql
} from  '@apollo/client'
// GraphQL Query
const getUsernameQuery = gql`
subscription MySubscription($email: String = "") {
  users(where: {email: {_eq: $email}}) {
    id
  }
}
`


function Login() {
  useTitle('Login')
  
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)


  const [data, setData] = useState({
    email:'',
    password:''
  })

  const {data:graphqlData} = useSubscription(getUsernameQuery, {variables: {email: data.email}})

  
  useEffect(() => {
    dispatch(setPage('Login'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if(user){
    return <Redirect to="/" />
  }

  const handleLogin = e => {
    e.preventDefault()
    auth.login(data.email, data.password, true)
      .then(res => {
        Swal.fire({
          icon:'success',
          text: 'Success Login'
        })
        dispatch(LOGIN(graphqlData?.users[0].id))
        history.push('/')
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          text: JSON.stringify(err)
        })
      })
  }

  return (
    <div className={`container my-4 ${style.container}`}>
      <h2>Login</h2>
      <h6>Don't have an account? <a href="/register">Register</a></h6>
      <form className="form-control" onSubmit={handleLogin}>
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
        <div>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>

      </form>
    </div>
  )
}

export default Login
