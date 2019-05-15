import React from 'react';
import axios from '../../config/axios';

class UserRegister extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '', 
            email: '', 
            password: '', 
            notice: '',
            confirmPassword : '',
            isChecked:false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        const { password, confirmPassword } = this.state
        if( password === confirmPassword ){
            axios.post('/users/register', formData)
            .then((response) => {
                if(response.data.message){
                    this.setState(() => ({
                        notice: response.data.message
                    }))
                }
                else{
                    this.setState(() => ({
                        username: '', email: '', password: '', confirmPassword : '', 
                        notice: 'successfully registered'
                    }))
                    setTimeout(() => {
                        this.props.history.push('/users/login')
                    }, 2000)
                }
            })
            .catch(err => console.log(err))
        }
        
    }

    handleChange = (e) =>{
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }

    handleCheck =(e) =>{
        const isChecked = e.target.checked
        this.setState(() => ({isChecked}))
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3 align='center'>Register</h3>
                    <p align='center'>{ this.state.notice && this.state.notice }</p>
                        <div>
                            Username
                            <input type='text'onChange={this.handleChange} name='username' placeholder='abc'/>
                        </div>
                        <div >
                            Email
                            <input type='text' 
                            onChange={this.handleChange}
                            name='email' placeholder='abc@gmail.com'/>
                        </div>
                        <div >
                            Password
                            <input type={this.state.isChecked ? 'text' : 'password'} onChange={this.handleChange} name='password' placeholder='************'/>
                        </div>
                        <div >
                            Confirm Password
                            <input type={this.state.isChecked ? 'text' : 'password'} onChange={this.handleChange} name='confirmPassword' placeholder='************'/>
                        </div>
                        <div>
                            <input type='checkbox' value = {this.state.isChecked}  onChange = {this.handleCheck} />Show password
                        </div>
                        <button type="submit">Submit</button>
                    </form>
            </div>                  
        )
    }
}

export default UserRegister