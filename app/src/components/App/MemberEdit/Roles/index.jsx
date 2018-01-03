import React, { Component } from 'react'
import Exclusion from './Exclusion'
// import styles from './style.css'
import { log } from '../../../../lib/ke-utils'

class Roles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exclusions: this.props.exclusions
    }
  }

  handleRoleClick = (id, checked) => {
    // console.clear()
    let exclusions = this.state.exclusions
    // log(`handleRoleClick: id=${id}, checked=${checked}`, '', 'blue')
    // log('props.exclusions - before', exclusions, 'blue')
    // log('is already there', exclusions.includes(id), 'blue')
    if (checked) {
      if (exclusions.includes(id)) {
        log(`handleRoleClick ERR: id ${id} is already in exclusions`, '', 'red' )
      } else {
        exclusions.push(id)
      }
    } else {
      if (!exclusions.includes(id)) {
        log(`handleRoleClick ERR: id ${id} is is not already in exclusions`, '', 'red' )
      } else {
        const index = exclusions.indexOf(id)
        exclusions.splice(index, 1)
      }
    }
    // log('props.exclusions - after', exclusions, 'blue')
    this.setState({
      exclusions: exclusions,
    })
    // log('state - after', this.state, 'blue')
    // log('exclusions','' , 'red')
    // this.state.exclusions.forEach((e) => log(e, '', 'blue'))
    // log('exclusions', '', 'red')

  }

  renderRoles = this.props.roles.map((r) => (

        <Exclusion
          key={r.id}
          id={r.id}
          name={r.name}
          checked={this.props.exclusions.includes(r.id)}
          handleRoleClick={this.handleRoleClick}
        />

    )
  )
  render() {
    return (
      <div>
        {this.renderRoles}
      </div>
    )
  }

}

export default Roles
