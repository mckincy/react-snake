import React, { PureComponent  } from 'react'
class Food extends PureComponent {
  render(){
    return (
      <div id="food" style={{top:this.props.top, left:this.props.left}}></div>
    )
  }
} 
// below is not the fastest define
// const Food = (props) => {
//   console.log(1)
//   return  <div id="food" style={{top:props.top, left:props.left}}></div>
// }
export default Food