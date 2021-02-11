import React from 'react';


function Mole(props) {
    const {random,index,addPoints} = props;
    console.log('random', random + 'index' + index);
    console.log('props' + props);

    const handleClick =()=>{
        console.log('handle');
        addPoints();
    }

    return (
        //TODO set style ternary here to toggle mole
        <div
            className={`mole ${random === index ? 'topAn' : ''}`}
            onClick={handleClick}
        >

        </div>
    );
};

export default Mole;