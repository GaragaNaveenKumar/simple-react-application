import React from 'react'

const Hoc = (Component) => {
  return (
    class extends React.Component{
        state={
            auth:true
        }
        render(){
            return(
                
                <div>
                    {this.state.auth ? <Component /> :<h2>please login</h2>}
                </div>
            )
        }
    }
  )
}

export default Hoc
