import React from 'react';

import Hole from './components/Hole';
import Mole from './components/Mole';
import GameCon from "./components/GameCon";
import {Redirect} from "react-router-dom";

const SEC = 1000;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        random: -1,
        grid:3,
        bit:false,
        countdown: 1
    }
    this.tick = this.tick.bind(this);
    this.genRan = this.genRan.bind(this);
    this.game = this.game.bind(this);
    this.addPoints = this.addPoints.bind(this);
    this.countdown_timer = this.countdown_timer.bind(this);
    
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
  
  countdown_timer(){
    const {interval} = this.props;
      
    this.setState({
      countdown: this.state.countdown - 1
    });
      
    if (this.state.countdown === 0) { 
        clearInterval(this.countdown);

        //trigger set-interval;
        this.intervalId = setInterval(
            this.game,
            interval
        );
        //create interval to run every second
        this.timer = setInterval(
            this.tick,
            SEC
        );
    }

  }



  componentDidMount() {
    console.log('game mount',this);
    this.props.clearPoints(); 
    this.countdown = setInterval(
            this.countdown_timer,
            1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
    clearInterval(this.countdown);
    clearInterval(this.timer);
    clearTimeout(this.timeout);
  }

  render() {
    console.log('game mount ren', this.props);
    console.log('play_points', this.props.play_points);

    const {random,grid} = this.state;
    const {addPoints} = this;
    const {set_Interval,play_points,ticker,stop,width,height,isClicked} = this.props;

    console.log('stop: ', stop);
    //x`x`  if (stop === true) return <Redirect to="/end" />;
    
    // if ticker is 0 clear timers
    if(stop === true){
        clearInterval(this.timer);
        clearInterval(this.intervalId);
        
        return <Redirect to="/end" />
    }
    
    //if (stop === true) return <Redirect to="/end" />;
    return (
        <div className="game-con">
            {/*put count down timer here*/}
            { this.state.countdown != 0 &&
                <div 
                    className="count-down"
                    style={{width: width,height: height-28}}
                >
                    {this.state.countdown}
                </div>
            }
            {/*<GameCon set_Interval={set_Interval} play_points={play_points} ticker={ticker}/>*/}
            <div 
                className="game-container "
                style={{height: height-28,width: width}}
            >
                <Hole grid={grid}>
                    {/*past in random prop 0 to 8 here set from interval*/}
                    
                    <Mole random={random} addPoints={addPoints} isClicked={isClicked}>GAME</Mole>
                </Hole>
            </div>
        </div>
    )
  }
}
export default Game;
