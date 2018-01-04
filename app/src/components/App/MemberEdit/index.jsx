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
    log('MemberEdit.componentDidMount', '', 'pink')

    if (this.props.match.params.action === 'new') {
      /* if action */ this.props.requestCreateMember()
    }

  }

  handleMemberChange = (fieldname, value) => {
    // console.clear()
    // log('incomming values: ', `fieldname: ${fieldname}, value: ${value}`, 'blue');
    this.props.updateMemberLocal(this.props.openMemberId, fieldname, value);
  }

  // handleSubmit = () => {
  //   // log(`handleSubmit()`)
  //   // call requestUpdateMember(id, member)
  //   this.props.requestUpdateMember(this.props.openMemberId, this.props.member)
  //
  // }

  render() {

    const { member, readRequestCreateMember, readRequestReadMembers, closeMember, roles, match, requestUpdateMember } = this.props
    // log('action', match.params.action, 'blue')
    // log('match', match, 'blue')


    if (readRequestCreateMember.status !== 'success' || readRequestReadMembers.status !== 'success') {
      return (
        <h1>Loading ... </h1>
      )
    }
    // log('MemberEdit.member', member, 'blue')
    // log('exclusions', member.exclusions, 'blue')
    return (
      <div>
        <h2 className={styles.memberName}>{member.firstName} {member.lastName}</h2>
        {/* <form onSubmit={this.handleSubmit}> */}
        <form>
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
          
          <Link to='/members'><button className={styles.saveButton} onClick={() => requestUpdateMember(member.id, member)}>Save</button></Link>
          <Link to='/members'><button className={styles.doneBtn} onClick={() => closeMember()}>Done</button></Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const openMemberId = selectors.getOpenMemberId(state)
  log('MemberEdit.openMemberId', openMemberId, 'blue')

  const o = {
    member: selectors.getMember(state, openMemberId),
    openMemberId: openMemberId,
    readRequestCreateMember: selectors.getRequest(state, 'api/createMember'),
    readRequestReadMembers: selectors.getRequest(state, 'api/getReadMembers'),
    roles: selectors.getRoles(state)
 }
 return o
}

export default connect(mapStateToProps, actionCreators)(MemberEdit)
