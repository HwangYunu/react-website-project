import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: '리덕스 테스트',
})

let testNumbers = createSlice({
  name: 'testNumbers',
  initialState: [100, 200, 300],
})

export const store = configureStore({
  reducer: {
    user: user.reducer,
    testNumbers: testNumbers.reducer,
  },
})
