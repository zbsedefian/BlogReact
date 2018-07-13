import axios from 'axios'
import { getFormValues } from '../../node_modules/redux-form';

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_post'

const ROOT_URL = 'https://reduxblog.herokuapp.com/api'
const API_KEY = '?key=zbszbsezbs131213121312'

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback())
    // promise with .then() is there for the this.props.history.push('/') reroute
    return {
        type: CREATE_POST,
        payload: request
    }
}