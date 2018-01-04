import React, { Component } from 'react'
// import { log } from '../../../../../lib/ke-utils'

class Exclusion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked,
    }
  }
  handleCheckboxChange = (event) => {
    this.setState({
      checked: event.target.checked,
    })
    this.props.handleRoleClick(this.props.id, event.target.checked)
  }
  render() {
    const { name } = this.props
    return (
      <div>
        <label>{name}</label>
        <input
          type='checkbox'
          checked={this.state.checked}
          onChange={(event) => this.handleCheckboxChange(event)}  />
      </div>
    )
  }
}

export default Exclusion
