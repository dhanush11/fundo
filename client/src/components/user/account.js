import React from 'react';
import { connect } from 'react-redux'

class UserAccount extends React.Component{
    render(props){
        console.log(props)
        return(
            <div>
                <h2>user account component</h2>
            </div>
        )
    }
}

const mapStateToprops = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToprops)(UserAccount)