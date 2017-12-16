// MemberEdit

import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import * as ku from '../../../lib/ke-utils'

import styles from './style.css'

// const MemberEdit = ({ member_id, firstname, lastname, email }) => {
const MemberEdit = ({ members, openMemberId, updateMember, requestUpdateMember, requestCreateMember, closeMember }) => {
  const member = members.filter((m) => {
    return m.id === openMemberId
  })[0]

  members.find((e) => e.id === openMemberId)

  const handleMemberChange = (fieldname, value) => {
    // ku.log(`MemberEdit: ${fieldname}`, value, 'blue');
    member[fieldname] = value
    updateMember(member.id, member)
  }

  const handleMemberChangeExclusions = (role_id, checked) => {
    // add role to exclusions if not already there
    if (checked && !member.exclusions.includes(role_id)) {
      member.exclusions = [...member.exclusions, role_id]
    }
    // remove role from exclusions if it's there
    if (!checked && member.exclusions.includes(role_id)) {
      member.exclusions = member.exclusions.filter(e => e !== role_id)
    }
    updateMember(member.id, member)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    ku.log('MemberEdit.handleSubmit: member.id', member.id, 'blue')
    ku.log('MemberEdit.handleSubmit: member', member, 'blue')
    openMemberId === 'create'
    ? requestCreateMember(member)
    : requestUpdateMember(member.id, member)
  }

  // mocking roles data, need to add this to Members API
  const roles = [
    { role_id: 1, role_name: "role01" },
    { role_id: 2, role_name: "role02" },
    { role_id: 3, role_name: "role03" },
    { role_id: 4, role_name: "role04" },
    { role_id: 5, role_name: "role05" },
    { role_id: 6, role_name: "role06" },
  ]

  // can't seem to access the members variable to display checkbox state
  // also, updateMember doesn't update exclusions (server problem?)
  const roleCheckBoxes = roles.map((role) => {
    return (
      <label key={role.role_id} className={styles.checkboxInput}>
        {role.role_name}
        {/* {JSON.stringify(member)} */}
        {/* {JSON.stringify(member.exclusions)} */}
        <input type="checkbox" checked={0}
          onChange={(event) => handleMemberChangeExclusions(role.role_id, event.target.checked)} />
      </label>
    )
  })

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
   openMemberId: selectors.getOpenMemberId(state),
   roles: selectors.getRoles(state)
 }
 return o
}
export default connect(mapStateToProps, actionCreators)(MemberEdit)
