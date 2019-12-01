import { Component } from 'react'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div id='header'>
        <h1>SacShiki</h1>

        <style jsx>{`
          #header {
            width: 100%;
            position: absolute;
          }
        `}</style>
      </div>
    )
  }
}

export default Header
