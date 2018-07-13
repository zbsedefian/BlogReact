import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field
        const formDanger = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={formDanger}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    // {...field.input} is an object which contains event handlers and props (e.g. onChange, onBlur, etc.)
                    // shorthand for onChange={field.input.onChange}, etc.
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) { 
        this.props.createPost(values, () => {
            this.props.history.push('/') // automatically navigate to route. Passed through react-router
        })
    }
    
    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField} //lacks () because if it had it, it would call automatically
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField} //lacks () because if it had it, it would call automatically
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField} //lacks () because if it had it, it would call automatically
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {}

    if (!values.title || values.title.length < 3)
        errors.title = "A post must have a title of 3 or more characters."
    if (!values.categories)
        errors.categories = "A post must have at least one tag."
    if (!values.content)
        errors.content = "A post must have content."

    return errors
}

export default reduxForm({
    validate, // equal to validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
)
