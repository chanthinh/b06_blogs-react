import {ACT_LOGIN_SUCCESS } from "./actions";


const initState = {
  token:'',
  currentUser: null
}

function reducer(authState = initState, action) {
  switch (action.type) {
    case ACT_LOGIN_SUCCESS:
      localStorage.setItem('access_token', action.payload.token)
      return {
        token:action.payload.token,
        currentUser: action.payload.user
      }
    default:
      return authState
  }
}

export default reducer