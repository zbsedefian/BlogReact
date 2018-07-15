import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost, deletePost } from '../actions'

class PostsShow extends Component {
    componentDidMount() {
        // It currently refetches even if already loaded.
        // To make it save a fetch, you can add
        if (!this.props.post) {
            const { id } = this.props.match.params // related to react-router :id wildcard
            this.props.getPost(id)
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params 
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        })
    }
    
    render() {
        const { post } = this.props

        if (!post) 
            return <div>Loading...</div>

        return (
            <div>
                <Link to="/" className="btn btn-warning">Back to post list</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    // ownProps is a naming convention for this.props
    // this gets the one relevant post from the list
    return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { getPost, deletePost })(PostsShow)