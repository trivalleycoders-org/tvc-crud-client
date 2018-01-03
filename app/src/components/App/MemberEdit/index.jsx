// MemberEdit

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import Roles from './Roles'
import styles from './style.css'
import { log } from '../../../lib/ke-utils'

class MemberEdit extends Component {
  componentDidMount() {
    this.props.requestCreateMember()
  }

  handleMemberChange = (fieldname, value) => {
    // console.clear()
    // log('incomming values: ', `fieldname: ${fieldname}, value: ${value}`, 'blue');
    this.props.updateMember(this.props.openMemberId, fieldname, value);
  }

  handleSubmit = () => {
    log(`handleSubmit()`)
  }

  render() {

    const { member, readRequestCreateMember, readRequestReadMembers, closeMember, roles } = this.props

    if (readRequestCreateMember.status !== 'success' || readRequestReadMembers.status !== 'success') {
      return (
        <h1>Loading ... </h1>
      )
    }
    // log('exclusions', member.exclusions, 'blue')
    return (
      <div>
        <h2 className={styles.memberName}>{member.firstName} {member.lastName}</h2>
        <form onSubmit={this.handleSubmit}>
          <label className={styles.textInput}>
            First
            <input type="text" value={member.firstName || ""} placeholder="first name"
              onChange={(event) => this.handleMemberChange('firstName', event.target.value)} />
          </label>
          <label className={styles.textInput}>
            Last
            <input type="text" value={member.lastName || ""} placeholder="last name"
              onChange={(event) => this.handleMemberChange('lastName', event.target.value)} />
          </label>
          <label className={styles.textInput}>
            Email
            <input type="text" value={member.email || ""} placeholder="email address"
              onChange={(event) => this.handleMemberChange('email', event.target.value)} />
          </label>
          <label className={styles.textInput}>
            Phone
            <input type="text" value={member.phoneNumber || ""} placeholder="phone number"
              onChange={(event) => this.handleMemberChange('phoneNumber', event.target.value)} />
          </label>
          <label className={styles.textAreaInput}>
            Comment
            <textarea rows={4} cols={50} value={member.comment || ""} placeholder="comment"
              onChange={(event) => this.handleMemberChange('comment', event.target.value)} />
          </label>
          <label className={styles.checkboxInput}>
            Exempt
            <input type="checkbox" checked={member.exempt}
              onChange={(event) => this.handleMemberChange('exempt', event.target.checked)} />
          </label>
          <label className={styles.checkboxInput}>
            Active
            <input type="checkbox" checked={member.active}
              onChange={(event) => this.handleMemberChange('active', event.target.checked)} />
          </label>

          <h3>Role Preferences</h3>

          <Roles
            roles={roles}
            exclusions={member.exclusions}
            handleMemberChange={this.handleMemberChange}
          />
          <input type="submit" className={styles.saveBtn} value="Save" />
          <Link to='/members'><button className={styles.doneBtn} onClick={() => closeMember()}>Done</button></Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const openMemberId = selectors.getOpenMemberId(state)
  const o = {
    member: selectors.getMember(state, openMemberId),
    openMemberId: selectors.getOpenMemberId(state),
    readRequestCreateMember: selectors.getRequest(state, 'api/createMember'),
    readRequestReadMembers: selectors.getRequest(state, 'api/getReadMembers'),
    roles: selectors.getRoles(state)
 }
 return o
}

export default connect(mapStateToProps, actionCreators)(MemberEdit)
