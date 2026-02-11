import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    changeMessage(state, action){
      return action.payload
    },
    clearMessage(){
      return ''
    }
  }
})

const { clearMessage } = messageSlice.actions 

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch(changeMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }
}

export const { changeMessage } = messageSlice.actions
export default messageSlice.reducer