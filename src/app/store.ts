import { configureStore } from '@reduxjs/toolkit'
import collections from './reducers/collections'
import names from './reducers/names'

export const store = configureStore({
  reducer: {
    collections,
    names
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
