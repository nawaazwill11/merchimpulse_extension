import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const preloadedState = {}

const middlewares = [thunkMiddleware]
const enhancer = compose(
	applyMiddleware(...middlewares)
)

export default createStore(rootReducer, preloadedState, enhancer)