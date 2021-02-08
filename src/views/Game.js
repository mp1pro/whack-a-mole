import React from 'react';

import Hole from './components/Hole';
import Mole from './components/Mole';

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
            <div className="game-container ">
                <Mole>
                    <h1>GAME</h1>
                </Mole>
            </div>
        )
  }
}
export default Game;
