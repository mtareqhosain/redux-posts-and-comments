import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchComment, deletePost, updatePost } from './store/actions/';
import './App.css';
class App extends Component {
    constructor() {
        super();
        this.state = {
            showComments: false,
            comments: [],
            toggle: false,
            inputText: '',
            postId: null,
        };
    }
    componentDidMount() {
        this.props.onFetchPost();
        this.props.onFetchComment();
    }


    findPost = (postId) => {
        let c = this.props.comments.filter((check) => check.postId === postId);
        //console.log(c);
        this.setState({
            showComments: !this.state.showComments,
            comments: c,
        });
    };

    editPost = (postItem) => {
        console.log('update: ', postItem);
        this.setState({
            toggle: !this.state.toggle,
            inputText: postItem.title,
            postId: postItem.id,
        });
    };

    deletePost = (postId) => {
        this.props.onDeletePost(postId);
        if (this.state.showComments === true && this.state.comments.length !== 0) {
            this.setState({
                comments: [],
                showComments: !this.state.showComments
            })}    
    };

    updatePost = (postId) => {
        this.props.onUpdatePost(postId, this.state.inputText);
    };

    render() {

        return (
            <div className='container'>
                <div style={{ float: 'left', width: '65%' }}>
                    <h1>POSTS</h1>
                    {this.props.posts.length > 0 &&
                        this.props.posts
                            .filter((check) => check.id <= 10)
                            .map((item) => {
                                return (
                                    <div className={'postCard'}>
                                        <h2>{item.title}</h2>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <button className={`btnComment comment`} onClick={() => this.findPost(item.id)}>
                                                Comments
                                            </button>
                                            <button className={`btnEdit edit`} onClick={() => this.editPost(item)}>
                                                Edit
                                            </button>
                                            <button className={`btnDelete delete`} onClick={() => this.deletePost(item.id)}>
                                                Delete
                                            </button>
                                        </div>

                                        {this.state.toggle === true && this.state.postId === item.id && (
                                            <div className={`update-wrapper cf`}>
                                                <input
                                                    style={{ boxShadow: 'none' }}
                                                    type='text'
                                                    value={this.state.inputText}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            inputText: e.target.value,
                                                        })
                                                    }
                                                />
                                                <button onClick={() => this.updatePost(item.id)}>Update</button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                </div>
                <div style={{ float: 'right', width: '35%' }}>
                
                    {this.state.showComments === true && (
                        <div>
                            <h1>COMMENTS</h1>
                            {this.state.comments.map((item) => {
                                return (
                                    <ul className={`list`}>
                                        <li>{item.body}</li>
                                    </ul>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('state: ', state);
    return {
        posts: state.postReducer.posts,
        comments: state.commentReducer.comments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPost: () => dispatch(fetchPost()),
        onFetchComment: () => dispatch(fetchComment()),
        onDeletePost: (id) => dispatch(deletePost(id)),
        onUpdatePost: (id, input) => dispatch(updatePost(id, input)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
