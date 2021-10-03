const reducer = (state = [], action) => {
  switch(action.type){
    case 'GET FAVORITE':
      return action.data
    default:
      return []
  }
}

export const getFavorite = data => {
  return dispatch => {
    dispatch({
      type: 'GET FAVORITE',
      data: data
    })
  }
}

export default reducer