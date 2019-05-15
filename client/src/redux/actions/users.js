import axios from '../../config/axios'
//login
export const addUser = (user) => {
    return {
        type : 'ADD_USER',
        payload : user
    }
}

export const startAddUser = (formData, props) => {
    console.log(formData)
    return(dispatch) => {
        axios.post('/users/login', formData)
        .then(response => {
            axios.defaults.headers['x-auth'] = response.data.token
            localStorage.setItem('token', response.data.token)
            dispatch(addUser(response.data.user))
            props.props.history.push('/')
        })
        .catch(err=>console.log(err))
    }
}

export const getCurrentUser = () => {
    return (dispatch) => {
        axios.get('/users/account', {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            dispatch(addUser(response.data))
        })
    }
}





//logout