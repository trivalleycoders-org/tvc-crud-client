// MemberEdit

import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import * as ku from '../../../lib/ke-utils'

// const MemberEdit = ({ member_id, firstname, lastname, email }) => {
const MemberEdit = ({ members, openMemberId, updateMember, requestUpdateMember, requestCreateMember, closeMember }) => {
  const member = members.filter((m) => {
    return m.id === openMemberId
  })[0]

  const handleMemberChange = (fieldname, value) => {
    // ku.log(`MemberEdit: ${fieldname}`, value, 'blue');
    member[fieldname] = value;
console.log('updated member:', member)
    updateMember(member.id, member);
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    ku.log('MemberEdit.handleSubmit: member.id', member.id, 'blue')
    ku.log('MemberEdit.handleSubmit: member', member, 'blue')
    openMemberId === 'create'
    ? requestCreateMember(member)
    : requestUpdateMember(member.id, member)
  }

  const renderForm = openMemberId === null
    ? <Redirect to={'/members'} />
    : <div>
       <h2>{member.firstName} {member.lastName}</h2>
       <form onSubmit={handleSubmit}>
         <input type="text" value={member.id || ""} disabled />
         <input type="text" value={member.firstName || ""} placeholder="first name" onChange={(event) => handleMemberChange('firstName', event.target.value)} />
         <input type="text" value={member.lastName || ""} placeholder="last name" onChange={(event) => handleMemberChange('lastName', event.target.value)} />
         <input type="text" value={member.email || ""} placeholder="email address" onChange={(event) => handleMemberChange('email', event.target.value)} />
         <input type="text" value={member.exempt || "0"} onChange={(event) => handleMemberChange('exempt', event.target.value)} />
         <input type="text" value={member.comment || ""} placeholder="comment" onChange={(event) => handleMemberChange('comment', event.target.value)} />
         <input type="text" value={member.phoneNumber || ""} placeholder="phone number" onChange={(event) => handleMemberChange('phoneNumber', event.target.value)} />
         <input type="checkbox" checked={member.active} onChange={(event) => handleMemberChange('active', event.target.checked)} /> active
         <input type="submit" value="Save" />
         <Link to='/members'><button onClick={() => closeMember()}>Done</button></Link>
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
