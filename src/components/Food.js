import React, { Component } from 'react'

class Food extends Component{
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.top === this.props.top && nextProps.left === this.props.left  ){
      return false
    }
    return true
  }
  render(){
    console.log(this.state)
    return (
      <div id="food" style={{top:this.props.top, left:this.props.left}}></div>
    )
  }
} 


export default Food