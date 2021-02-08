import React from 'react';


function DisPlay(props) {
    const {user_email,points,users} = props;

    const listItems = users.map((user, index) =>
        <span key={index}>
            {user.email} : {user.points}&nbsp;&nbsp;
        </span>
    );

    return (
        <div>
            {props.auth === true ?
                <div>
                    <div>currentUser = {props.user_email} : {props.points}</div>&nbsp;&nbsp;
                    <span>Top 5 users =</span>&nbsp;&nbsp;
                    <span>{listItems}</span>&nbsp;
                </div>
                : ''
            }
        </div>
    );
};

export default DisPlay;