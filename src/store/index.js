import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;