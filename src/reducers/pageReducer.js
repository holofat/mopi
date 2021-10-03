const reducer = (state = '', action) => {
  switch(action.type){
    case 'SET':
      return action.data
    default:
      return 'Home'
  }
}

export const setPage = page => {
  return dispatch => {
    dispatch({
      type: 'SET',
      data: page
    })
  }
}

export default reducer