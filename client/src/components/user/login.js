import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { startAddUser } from '../../redux/actions/users';

class UserLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '', 
            notice: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        this.props.dispatch(startAddUser(formData, this.props))
    }

    handleChange(e) {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/home"/>
        }
        return (
            <div>
                <h2 align='center'>Login</h2>
                { this.state.notice && this.state.notice }
                <form onSubmit={this.handleSubmit}>
                    <div>
                        Email
                        <input type="text" value={this.state.email}  
                        onChange={this.handleChange} name="email" placeholder='abc@gmail.com'/>
                    </div>
                    <div>
                        Password
                        <input type="password" value={this.state.password} 
                         placeholder="********" onChange={this.handleChange} name="password" />  
                    </div>
                    <button type="submit">Submit</button>
                </form>            
            </div>
        )
    }
}

const mapStateToprops = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToprops)(UserLogin)