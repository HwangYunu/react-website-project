import { configureStore, createSlice } from '@reduxjs/toolkit'

// post에서 글 클릭시 해당 글의 정보를 담아오는 state
let detailInfo = createSlice({
  name: 'detailInfo',
  initialState: {},
  reducers: {
    setDetailInfo(state, action) {
      // 리덕스의 state 변경 방법은 state = action.payload가 아님을 유의
      return action.payload
    },
  },
})

export let { setDetailInfo } = detailInfo.actions

export const store = configureStore({
  reducer: {
    detailInfo: detailInfo.reducer,
  },
})
