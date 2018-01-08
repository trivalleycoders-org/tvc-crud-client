import React, { Component } from 'react'
import styles from '../style.css'
import { log } from '../../../../lib/ke-utils'

class ScheduleRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMemberIndex : props.index
    }
  }

  handleSelectChange(event) {
    this.setState({ selectedMemberIndex: event.target.value })
  }


// className={excluded1?"excluded":""}


  renderSelectMember(members, index, role) {
    let selectClassName = members[this.state.selectedMemberIndex].exclusions.includes(String(role.id))
      ? "schedule-option-excluded"
      : "schedule-option-not-excluded"
    // console.log('checking for role id = ', role.id)
    return (
      <select
        className={styles[selectClassName]}
        onChange={this.handleSelectChange.bind(this)}
        value={this.state.selectedMemberIndex}
      >
        {members.map((member, i) => {
          let optionClassName = member.exclusions.includes(String(role.id))
            ? "schedule-option-excluded"
            : "schedule-option-not-excluded"
          // console.log('Is', role.id, 'in', member.exclusions)
          // console.log('optionClassName =', optionClassName)
          return (
            <option
              className={styles[optionClassName]}
              key={i}
              value={i}
            >
              {member.firstName + " " + member.lastName}
            </option>
          )
        })}
      </select>
    )
  }

  render() {
    // console.log('\n\n\n################## ScheduleRow.render...')
    let { index, role } = this.props
    let member = this.props.members[this.state.selectedMemberIndex]
    return (
      <div className={styles.row}>
        <div className={styles.memberDetail}>
          {role.name}
        </div>
        <div className={styles.memberDetail}>
          {this.renderSelectMember(this.props.members, index, role)}
        </div>
        <div className={styles.memberDetail}>
          {member.lastRoleName}
        </div>
        <div className={styles.memberDetail}>
          {member.comment}
        </div>
        <div className={styles.memberDetail}>
          {member.email}
        </div>
      </div>
    )
  }
}

export default ScheduleRow
