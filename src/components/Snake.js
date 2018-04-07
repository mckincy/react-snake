import React, { PureComponent } from 'react';
import Food from './Food'

export default class Snake extends PureComponent {
  state={
    snakeNodes:[{
      top:20,
      left:20
    }],
    direct: 'right',
    food:{
      top:100,
      left:100
    },
    interval:'',
    isRunning: 'start',
    score: 0
  }
  componentDidMount(){
    this.init()
  }

  keyEvents = () => {
    document.addEventListener('keydown', function(e){
      switch (e.keyCode) {
        case 38:
          this.move('up')
          break
        case 39:
          this.move('right')
          break
        case 40:
          this.move('down')
          break
        case 37:
          this.move('left')
          break
        default:
          return false
      }
    }.bind(this))
  }
  go = () => {
    let interval = setInterval(function(){
      this.move(this.state.direct)
    }.bind(this), 100)

    this.setState({
      interval: interval
    })
  }
  init = () => {
    let  interval = this.state.interval;
    if(this.state.isRunning === 'start')  window.clearInterval(interval)
    this.keyEvents()
  }
  pause = () => {
    if(this.state.isRunning === 'pause') {
      let  interval = this.state.interval;
      window.clearInterval(interval);
      this.setState({isRunning:'start'});
    }else{
      this.go()
      this.setState({isRunning:'pause'});
    }
  }
  move = (direct) => {
    let snakeNodes = this.state.snakeNodes, head;
    let curPos = this.getCurPos()
    switch(direct){
      case 'up':
        head = {
          left: snakeNodes[0].left,
          top: snakeNodes[0].top - 20
        }
        snakeNodes = [
          head,
          ...snakeNodes.slice(0, snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        break
      case 'right':
        head = {
          left: this.state.snakeNodes[0].left + 20,
          top: this.state.snakeNodes[0].top
        }
        snakeNodes = [
          head,
          ...snakeNodes.slice(0, snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        //console.log(this.state.snakeNodes[0])
        break
      case 'down':
        head = {
          left: snakeNodes[0].left,
          top: snakeNodes[0].top + 20
        }
        snakeNodes = [
          head,
          ...snakeNodes.slice(0, snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        break
      case 'left':
        head = {
          left: snakeNodes[0].left - 20,
          top: snakeNodes[0].top
        }
        snakeNodes = [
          head,
          ...snakeNodes.slice(0, snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        break
      default:
        return
    }

    if(curPos.left === this.state.food.left && curPos.top === this.state.food.top){
      this.grow(curPos, direct)
    }
    console.log(curPos.left > 480)
    if(curPos.left > 480 || curPos.top > 580 || curPos.left < 0 || curPos.top < 0) {
      console.log(curPos)
      this.dead()
    }
  }
  grow = (curPos, direct) => {
    let c = this.state.snakeNodes 
    this.setState({
      snakeNodes:[...c, curPos]
    })
    this.resetFood()
    this.resetScore()
  }
  dead = () => {
    alert(`Your snake is dead!`)
    this.setState({
      snakeNodes:[{
        top:20,
        left:20
      }],
      score: 0,
      isRunning: 'start',
      direct: 'right'
    })
    let  interval = this.state.interval;
      window.clearInterval(interval);
  }
  getCurPos = () => ({
      left : this.state.snakeNodes[0].left,
      top : this.state.snakeNodes[0].top
  })
  resetFood = () => {
    let left = parseInt(Math.random() * 48, 10) * 10,
      top = parseInt(Math.random() * 58, 10) * 10;
    this.setState({
      food: {
        top: top % 20 === 0 ? top : top - 10,
        left: left % 20 === 0 ? left : left - 10
      }
    }) 
  }
  resetScore = () => {
    let score = this.state.score
    this.setState({
      score: score + 1
    })
  }
  render(){
    return (
      <div>
        <p>
          <span className="score">{`Score: ${this.state.score}`}</span>
          <button id="startGame" onClick={this.pause.bind(this)}>{this.state.isRunning}</button>
        </p>
        <div className="map">
          {        
            this.state.snakeNodes.map((e, i) => {
              return <div key={i} id={`node ${i}`} className="snake-node" style={{top:e.top,left:e.left}} />
            })
          }
          <Food top={this.state.food.top} left={this.state.food.left}/>
        </div>   
      </div>
    )
  }
}