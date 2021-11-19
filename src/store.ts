import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createReducerFunction } from 'immer-reducer'
import MyImmerReducer, {
  myImmerReducerInitialState,
  MyImmerReducerInitialStateInt,
} from './redux/appReducer'

export type GlobalState = MyImmerReducerInitialStateInt

const reducerFunction = createReducerFunction(
  MyImmerReducer,
  myImmerReducerInitialState
)

export const store = createStore(reducerFunction, applyMiddleware(thunk))
