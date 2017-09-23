// MemberEdit

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'

// const MemberEdit = ({ member_id, firstname, lastname, email }) => {
const MemberEdit = ({ members, openMemberId, closeMember }) => {
  const member = members.filter((m) => {
    return m.member_id === openMemberId
  })[0]
  // const renderMember = member.map((m) => (
  //   <div>
  //     <input value={m.member_id} />
  //     <input value={m.firstname} />
  //     <input value={m.lastname} />
  //     <input value={m.email} />
  //   </div>
  // ))
  console.log('member', member)
  return (
    <div>
      <h2>{member.firstname} {member.lastname}</h2>
      {/* {renderMember} */}
      <div>
        <input value={member.member_id} />
        <input value={member.firstname} />
        <input value={member.lastname} />
        <input value={member.email} />
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
