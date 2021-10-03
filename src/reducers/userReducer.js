const reducer = (state = '', action) => {
  switch(action.type){
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return false
    default:
      return state
  }
}

export const LOGIN = email => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: email
    })
  }
}

export const LOGOUT = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer