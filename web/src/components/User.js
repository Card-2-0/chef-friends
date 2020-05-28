import React from 'react';

const User = (props) => {
    return(
        <div>
            <p>User : {props.userid}</p>
            <p>Rating : {props.rating}</p>
        </div>
    )
}


export default User;