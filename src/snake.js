import React, { Component } from 'react';

export default class Snake extends Component {
  state={
    snakeNodes:[{
      top:20,
      left:20
    }],
    direct: 'right',
    food:{
      top:20,
      left:100
    },
    interval:'',
    isRunning: 'pause'
  }
  componentWillMount(){
    this.keyEvents()
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

    this.go()
  }
  go = () => {
    let interval = setInterval(function(){
      this.move(this.state.direct)
    }.bind(this), 1000)

    this.setState({
      interval: interval
    })
  }
  pause(){
    if(this.state.isRunning === 'pause') {
      console.log(this.state.isRunning)
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
    console.log(snakeNodes)
    let curPos = this.getCurPos()
    switch(direct){
      case 'up':
        head = {
          left: snakeNodes[0].left,
          top: snakeNodes[0].top - 20
        }
        snakeNodes = [
          head,
          ...this.state.snakeNodes.slice(0, this.state.snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        console.log(snakeNodes)
        break
      case 'right':
        head = {
          left: this.state.snakeNodes[0].left + 20,
          top: this.state.snakeNodes[0].top
        }
        snakeNodes = [
          head,
          ...this.state.snakeNodes.slice(0, this.state.snakeNodes.length - 1)
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
          ...this.state.snakeNodes.slice(0, this.state.snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        console.log(snakeNodes)
        break
      case 'left':
        head = {
          left: snakeNodes[0].left - 20,
          top: snakeNodes[0].top
        }
        snakeNodes = [
          head,
          ...this.state.snakeNodes.slice(0, this.state.snakeNodes.length - 1)
        ]
        this.setState({
          direct: direct,
          snakeNodes: snakeNodes
        })
        console.log(snakeNodes)
        break
      default:
        return
    }

    if(curPos.left === this.state.food.left && curPos.top === this.state.food.top){
      this.grow(curPos, direct)
    }
  }

  grow = (curPos, direct) => {
    let c = this.state.snakeNodes 
    this.setState({
      snakeNodes:[...c, curPos]
    })
  }
  getCurPos = () => ({
      left : this.state.snakeNodes[0].left,
      top : this.state.snakeNodes[0].top
  })

  render(){
    return (
      <div>
        <button id="startGame" onClick={this.pause.bind(this)}>{this.state.isRunning}</button>
        <div className="map">
          {        
            this.state.snakeNodes.map((e, i) => {
              return <div key={i} id={"node" + i} className="snake-node" style={{top:e.top,left:e.left}} />
            })
          }
          <div id="food" style={{top:this.state.food.top, left:this.state.food.left}}></div>
        </div>   
      </div>
    )
  }
}