import React from 'react'
import auth from '../../services/user'
import { Redirect } from 'react-router-dom'
import {LOGOUT} from '../../reducers/userReducer'
import {useDispatch} from 'react-redux'
import spinner from '../img/loading.gif'



function Logout() {
  const dispatch = useDispatch()
  const user = auth.currentUser()
  if(user){
    user
      .logout()
      .then(res => {
        dispatch(LOGOUT())
        return <Redirect to="/" />
      })
      .catch(e => console.log(e))
  } else{
    return <Redirect to="/" />
  }

  return (
    <div className="d-flex justify-content-center align-content-center container-fluid">
      <img src={spinner} width="200" height="200" alt="loading"/>
    </div>
  )
}

export default Logout
