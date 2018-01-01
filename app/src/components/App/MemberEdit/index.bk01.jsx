// MemberEdit

import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import { log } from '../../../lib/ke-utils'

import styles from './style.css'

// const MemberEdit = ({ member_id, firstname, lastname, email }) => {
const MemberEdit = ({ members, openMemberId, updateMember, requestUpdateMember, requestCreateMember, closeMember }) => {
  if (openMemberId === 'create') {
    requestCreateMember()
  }

  // log('members', members, 'red')
  let member = members.filter((m) => {
    return m.id === openMemberId
  })[0]
  // log('member', member, 'blue')

  const handleMemberChange = (fieldname, value) => {
    log('incomming values: ', `fieldname: ${fieldname}, value: ${value}`, 'blue');
    let tmpVal1 = member[fieldname]
    log('tmpVal1', tmpVal1, 'blue')
    let tmpVal2 = tmpVal1 += value
    log('tmbVal2', tmpVal2, 'blue')
    member[fieldname] = tmpVal2;
    updateMember(member.id, member);
    log('updated member:', member[fieldname], 'blue')
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    log('MemberEdit.handleSubmit: member.id', member.id, 'blue')
    log('MemberEdit.handleSubmit: member', member, 'blue')
    openMemberId === 'create'
      ? requestCreateMember(member)
      : requestUpdateMember(member.id, member)
  }

  const roleCheckBoxes = ['role1', 'role2', 'role3', 'role4', 'role5', 'role6'].map(role =>
    <label key={role} className={styles.checkboxInput}>
      {role}
      <input type="checkbox" />
      {/* onChange={(event) => handleMemberChange({role}, event.target.checked)} /> */}
    </label>
  )

  const renderForm = openMemberId === null
    ? <Redirect to={'/members'} />
    : <div>
      <h2 className={styles.memberName}>{member.firstName} {member.lastName}</h2>
      <form onSubmit={handleSubmit}>
        {/* <input type="text" value={member.id || ""} disabled /> */}
        <label className={styles.textInput}>
          First
          <input type="text" value={member.firstName || ""} placeholder="first name"
            onChange={(event) => handleMemberChange('firstName', event.target.value)} />
        </label>
        <label className={styles.textInput}>
          Last
          <input type="text" value={member.lastName || ""} placeholder="last name"
            onChange={(event) => handleMemberChange('lastName', event.target.value)} />
        </label>
        <label className={styles.textInput}>
          Email
          <input type="text" value={member.email || ""} placeholder="email address"
            onChange={(event) => handleMemberChange('email', event.target.value)} />
        </label>
        <label className={styles.textInput}>
          Phone
          <input type="text" value={member.phoneNumber || ""} placeholder="phone number"
            onChange={(event) => handleMemberChange('phoneNumber', event.target.value)} />
        </label>
        <label className={styles.textAreaInput}>
          Comment
          <textarea rows={4} cols={50} value={member.comment || ""} placeholder="comment"
            onChange={(event) => handleMemberChange('comment', event.target.value)} />
        </label>
        <label className={styles.checkboxInput}>
          Exempt
          <input type="checkbox" checked={member.exempt}
            onChange={(event) => handleMemberChange('exempt', event.target.checked)} />
        </label>
        <label className={styles.checkboxInput}>
          Active
          <input type="checkbox" checked={member.active}
            onChange={(event) => handleMemberChange('active', event.target.checked)} />
        </label>

        <h3>Role Preferences</h3>

        {roleCheckBoxes}

        <input type="submit" className={styles.saveBtn} value="Save" />
        <Link to='/members'><button className={styles.doneBtn} onClick={() => closeMember()}>Done</button></Link>
      </form>
    </div>

  return (
    <div>
      {renderForm}
    </div>
  )
}

const mapStateToProps = (state) => {
 const o = {
   members: selectors.getMembers(state),
   openMemberId: selectors.getOpenMemberId(state)
 }
 return o
}
export default connect(mapStateToProps, actionCreators)(MemberEdit)
