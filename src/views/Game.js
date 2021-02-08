import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  
  componentDidMount() {
      console.log('game mount',this);
      this.props.getUsers();
      this.props.getUser();
  }
  
  render() {
        return (
            <div>
                <h1>GAME</h1>
            </div>
        )
  }
}
export default Game;
