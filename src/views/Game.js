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
        bit:false,
        play_points: 0,
        stop:false,
        ticker:60
    }
    this.tick = this.tick.bind(this);
    this.genRan = this.genRan.bind(this);
    this.game = this.game.bind(this);
    this.addPoints = this.addPoints.bind(this);
    this.stop = this.stop.bind(this);

  }

  stop(){
      //clearInterval(this.intervalId);
  }

  addPoints(){
      console.log('handleClick()');
      this.setState((prevState) => ({
        play_points:prevState.play_points+1
      }));
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

  tick(){
        if (this.state.ticker > 0) {
            console.log('something');
            this.setState((prevState) => ({
                ticker: prevState.ticker-1
            }));
        } else {
            console.log('something');
            clearInterval(this.timer);
            window.location.reload();
        }
  }

  componentDidMount() {
      const {interval} = this.props;

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
      this.timer = setInterval(()=>{this.tick()}, 1000);
      /*setTimeout(
          () => {
              clearInterval(this.intervalId);
              console.log('clear timer');
          }
          , 5000
      );*/
  }

  stop(){
    console.log('STOP');

    this.setState({
      stop: true
    });

    clearInterval(this.intervalId);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  render() {
    console.log('game mount ren', this.props.interval);
    console.log('play_points', this.state.play_points);

    const {random,grid,play_points,stop,ticker} = this.state;
    const {addPoints} = this;
    const {setInterval} = this.props;

    console.log('stop', stop);
    if (stop === true) return <Redirect to="/start" />;

    return (
        <div>
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
