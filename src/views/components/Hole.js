import React from 'react';


function Hole(props) {
    const {grid,width,height} = props;
    

    console.log('wh',width,height);

    const GRID = grid;
    const holes_ = GRID*GRID;

    const holes = Array.apply(null, Array(holes_)).map((hole, index) =>
        <div 
            key={index} 
            style={{
                height: height/3 - 15,
                width: width/3 -3,
                marginBottom: 5,
                marginRight:1
            }}
        >
            {React.cloneElement(props.children, { index })}
        </div>
    );
    //console.log('holes', holes)

    return holes;
};

export default Hole;
