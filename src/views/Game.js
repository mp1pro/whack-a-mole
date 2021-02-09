import React from 'react';

import Hole from './components/Hole';
import Mole from './components/Mole';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        random:8,
        grid:3,
        interval:2000
    }
    this.genRan = this.genRan.bind(this);
    this.game = this.game.bind(this);
  }

  // random num gen
  genRan(){
      const {grid} = this.state;
      let random = Math.trunc(Math.random() * ((grid*grid) + 1));
      return random;
  }
  // game logic
  game(){
      let random = this.genRan();
      this.setState(
          {random: random}
      );
  }

  componentDidMount() {
      const {interval} = this.state;

      console.log('game mount',this);
      // get users if local not set
      this.props.getUsers();
      // get user if local not set
      this.props.getUser();

      //trigger set-interval;
      //create interval to run every second
      this.intervalId = setInterval(
          this.game,
          interval
      );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  render() {
    const {random,grid} = this.state;
    return (
        <div className="game-container ">
            <Hole grid={grid}>
                {/*past in random prop 0 to 8 here set from interval*/}
                <Mole random={random}>GAME</Mole>
            </Hole>
        </div>
    )
  }
}
export default Game;
