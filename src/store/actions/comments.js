export const fetchComment = () => {
    return async (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then((res) => res.json())
            .then((results) => {
                console.log('comments: ', results);
                dispatch({
                    type: 'FETCH_COMMENTS',
                    comments: results,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
};
