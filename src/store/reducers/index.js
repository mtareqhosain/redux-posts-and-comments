import { combineReducers } from 'redux';
import postReducer from './posts';
import commentReducer from './comments'

const rootReducer = combineReducers({
    postReducer: postReducer,
    commentReducer: commentReducer
});

export default rootReducer;
