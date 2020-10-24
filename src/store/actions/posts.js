export const fetchPost = () => {
    return async (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((results) => {
                console.log('posts', results);
                dispatch({
                    type: 'FETCH_POSTS',
                    posts: results,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
};

export const deletePost = (id) => {
    return async (dispatch) => {
                dispatch({
                    type: 'DELETE_POST',
                    id: id,
                });
        //console.log('post id: ', id)
        
    };
};

export const updatePost = (id, input) => {
    return async (dispatch) => {
                dispatch({
                    type: 'UPDATE_POST',
                    update: {id: id, title: input}
                });
        console.log('updates: ', id, input)
        
    };
};
