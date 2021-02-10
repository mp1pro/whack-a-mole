import React from 'react';

class GameCon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {interval:1000}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = parseInt(target.value);
        const name = target.name;
        this.setState(
            { [name]: value },
            () => {
                //pass in value directly
                const {interval} = this.state;
                console.log("state", interval)
                this.props.setInterval(interval)
            }
        );
    }
    render(){
        return (
            <div>
                <select
                    className="interval"
                    name="interval"
                    id="interval"
                    value={this.props.interval}
                    onChange={this.handleChange}
                >
                    <option value="1000">EASY</option>
                    <option value="500">MEDIUM</option>
                    <option value="250">HARD</option>
                </select>
                <hr/>
            </div>
        )
    }
};

export default GameCon;