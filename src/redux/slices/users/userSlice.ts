import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isSignedin: boolean
  userData: User | null
  ban: boolean
}

const data =
  localStorage.getItem('signinData') !== null
    ? JSON.parse(String(localStorage.getItem('signinData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isSignedin: data.isSignedin,
  userData: data.userData,
  ban: false
}

export const userSlice = createSlice({
  name: 'uers',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.isSignedin = true
      state.userData = action.payload
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isSignedin: state.isSignedin,
          userData: state.userData
        })
      )
    },
    signout: (state) => {
      state.isSignedin = false
      state.userData = null
      localStorage.setItem(
        'signinData',
        JSON.stringify({
          isSignedin: state.isSignedin,
          userData: state.userData
        })
      )
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredUsers
    },
    updateUserBan: (state, action: PayloadAction<User>) => {
      const foundUser = state.users.find((user) => user.id === action.payload.id)
      if (foundUser) {
        foundUser.ban = !foundUser.ban
      }
    },
    editProfile: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const userFound = state.users.find((user) => user.id === id)
      if (userFound) {
        userFound.firstName = firstName
        userFound.lastName = lastName
        state.userData = userFound
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedin: state.isSignedin,
            userData: state.userData
          })
        )
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'an error occured'
      state.isLoading = false
    })
  }
})

export const { signin, signout, removeUser, updateUserBan, addUser, editProfile } =
  userSlice.actions
export default userSlice.reducer
