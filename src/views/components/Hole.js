import React from 'react';


function Hole(props) {
    const {user_email,points,users} = props;

    const GRID = 3;
    const holes_ = GRID*GRID;

    const holes = Array.apply(null, Array(holes_)).map((hole, index) =>
        <div key={index} >
            {index}
            {props.children}
        </div>
    );
    console.log('holes', holes)

    return holes;
};

export default Hole;