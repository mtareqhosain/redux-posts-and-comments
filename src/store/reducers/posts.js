const initState = {
    posts: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: action.posts
            }
            case 'DELETE_POST':
                return {
                    ...state,
                    posts: state.posts.filter(check => check.id !==action.id)
            }
        case 'UPDATE_POST':
            {   const posts = [...state.posts];
                const index = posts.findIndex(posts => posts.id === action.update.id);
                if (index !== -1) {
                    posts[index] = {
                        ...posts[index],
                        ...action.update
                    };
                }
                return {
                ...state,
                posts: posts
            }}
                
            
        default:
            return state;
    }
}

export default postReducer;