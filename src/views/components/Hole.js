import React from 'react';


function Hole(props) {
    const {grid} = props;

    const GRID = grid;
    const holes_ = GRID*GRID;

    const holes = Array.apply(null, Array(holes_)).map((hole, index) =>
        <div key={index} >
            {React.cloneElement(props.children, { index })}
        </div>
    );
    //console.log('holes', holes)

    return holes;
};

export default Hole;