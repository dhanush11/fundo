import React from 'react';
import { connect } from 'react-redux' 




const UserAccount = (props) => {
    return (
        <h2>user account </h2>
    )
}


const mapStateToProps = (state) => {
  
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(UserAccount)