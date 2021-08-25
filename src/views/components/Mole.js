import React from 'react';



class Mole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.red_ = this.red_.bind(this);
    }
    
    //const {random,index,addPoints} = props;
    //console.log('random', random + 'index' + index);
    //console.log('props' + props);

    //add e so we can check when this button is clicked
    handleClick =(e)=>{
        const {addPoints} = this.props;
        e.preventDefault();
        this.red_(e);
        console.log('handle',e.type);
        addPoints();
        
    }
    

    red_ = (e) => { 
        const {random,index} = this.props;
        if ( e.type === 'click'){
            this.setState({     
                isToggleOn: true   
                
            });
        }
        
        setTimeout(() => {
            this.setState({isToggleOn: false});
        }, 500)

    }
    //red = red_;
    
    //console.log('molecolor', red );
    render() {
        const {random,index} = this.props;
        return (
            
            
            //TODO set style ternary here to toggle mole
            <div
                className={`mole
                    ${random === index ? 'topAn' : ''}
                    ${random === index && this.state.isToggleOn === true  ? 'red' : ''}
                `}
                onClick={this.handleClick}
            >

            </div>
        );
    }
};

export default Mole;
