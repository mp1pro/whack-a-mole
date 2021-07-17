import React from 'react';

import Hole from './components/Hole';
import Mole from './components/Mole';
import GameCon from "./components/GameCon";
import {Redirect} from "react-router-dom";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        random:8,
        grid:3,
        bit:false
    }
    this.tick = this.tick.bind(this);
    this.genRan = this.genRan.bind(this);
    this.game = this.game.bind(this);
    this.addPoints = this.addPoints.bind(this);
  }
    tick(){
      this.props.tick();
    }

  addPoints(){
      console.log('handleClick()');
      this.props.addPoints();
  }

  // random num gen
  genRan(){
      const {grid,random} = this.state;

      let random_ = Math.trunc(Math.random() * (grid*grid));

      //stop mole from appearing twice in the same hole consecutively
      return (random === random_ ? (Math.abs(random_-1)) : random_)
  }

  // game logic
  game(){
      let random = this.genRan();
      clearInterval(this.intervalId)

      this.intervalId = setInterval(
          this.game,
          this.props.interval
      );

      this.setState((prevState) => ({
          bit: !prevState.bit, random:random
      }));
  }



  componentDidMount() {
      const {interval,stop} = this.props;

      console.log('game mount',this);
      // get users if local not set
      //this.props.getUsers();
      // get user if local not set
      //this.props.getUser();

      
        // wait 3 sends before game start
        setTimeout(() => {
            //trigger set-interval;
            this.intervalId = setInterval(
                this.game,
                interval
            );
            //create interval to run every second
            this.timer = setInterval(
                this.tick,
                1000
            );

        }, 3000);

      
      /*setTimeout(
          () => {
              clearInterval(this.intervalId);
              console.log('clear timer');
          }
          , 5000
      );*/
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  render() {
    console.log('game mount ren', this.props);
    console.log('play_points', this.props.play_points);

    const {random,grid} = this.state;
    const {addPoints} = this;
    const {setInterval,play_points,ticker,stop} = this.props;

    console.log('stop: ', stop);
    //x`x`  if (stop === true) return <Redirect to="/end" />;
    
    // if ticker is 0 clear timers
    if(stop){
        clearInterval(this.timer);
        clearInterval(this.intervalId);
    }

    return (
        <div>
            {/*put count down timer here*/}
            <div className="count-down">
                Wait to play
            </div>
            <GameCon setInterval={setInterval} play_points={play_points} ticker={ticker}/>
            <div className="game-container ">
                <Hole grid={grid}>
                    {/*past in random prop 0 to 8 here set from interval*/}
                    <Mole random={random} addPoints={addPoints}>GAME</Mole>
                </Hole>
            </div>
        </div>
    )
  }
}
export default Game;
