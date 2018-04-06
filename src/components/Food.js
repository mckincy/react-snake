import React, { PureComponent  } from 'react'

class Food extends PureComponent {
  render(){
    console.log(this.state)
    return (
      <div id="food" style={{top:this.props.top, left:this.props.left}}></div>
    )
  }
} 


export default Food