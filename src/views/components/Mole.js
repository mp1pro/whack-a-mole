import React from 'react';


function Mole(props) {
    const {random,index} = props;
    console.log('random', random + 'index' + index);

    return (
        //TODO set style ternary here to toggle mole
        <div
            className={`mole ${random === index ? 'topAn' : ''}`}
        >

        </div>
    );
};

export default Mole;