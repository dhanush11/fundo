import React from 'react';
import { connect } from 'react-redux' 


const UserAccount = (props) => {
    console.log(props)
}


const mapStateToprops = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToprops)(UserAccount)