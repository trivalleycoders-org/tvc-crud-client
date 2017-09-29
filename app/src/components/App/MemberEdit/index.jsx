// MemberEdit

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import * as ku from '../../../lib/ke-utils'

// const MemberEdit = ({ member_id, firstname, lastname, email }) => {
const MemberEdit = ({ members, openMemberId, updateMember, requestUpdateMember, closeMember }) => {
  const member = members.filter((m) => {
    return m.member_id === openMemberId
  })[0]

  ku.log('MemberEdit: member', member, 'blue')
  const handleMemberChange = (fieldname, value) => {
    ku.log(`MemberEdit: ${fieldname}`, value, 'blue');
    member[fieldname] = value;
    updateMember(member.member_id, member.first_name, member.last_name, member.email, member.exempt, member.comment, member.phone_number);
  }

  const close = () => {

  }


  return (
    <div>
      <h2>{member.first_name} {member.last_name}</h2>
      <div>
        <input value={member.member_id} disabled />
        <input value={member.first_name} onChange={(event) => handleMemberChange('first_name', event.target.value)} />
        <input value={member.last_name} onChange={(event) => handleMemberChange('last_name', event.target.value)} />
        <input value={member.email} onChange={(event) => handleMemberChange('email', event.target.value)} />
        <input value={member.exempt} onChange={(event) => handleMemberChange('exempt', event.target.value)} />
        <input value={member.comment} onChange={(event) => handleMemberChange('comment', event.target.value)} />
        <input value={member.phone_number} onChange={(event) => handleMemberChange('phone_number', event.target.value)} />
      </div>
      <Link to='/members'><button onClick={() => closeMember()}>Done</button></Link>

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
