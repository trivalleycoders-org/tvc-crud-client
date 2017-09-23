// Members
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import MemberRow from './MemberRow'
// import * as ku from '../../../lib/ke-utils'

class Members extends Component {
  componentWillMount() {
    this.props.requestReadMembers()
  }
  render() {
    const { match, members, openMemberId } = this.props
    const handleEditClick = (id) => {
      console.log('i was clicked with id = ', id)
      return (
        <Redirect to={`${match.url}/member-edit`} />
      )
    }
    // <Link to={`${match.url}/member-edit`}>
    console.log('members', members)
    const renderMembers = openMemberId === null
      ? members.map((m, index) => (
          <MemberRow
            key={m.member_id}
            member_id={m.member_id}
            firstname={m.firstname}
            lastname={m.lastname}
            email={m.email}
            editClick={handleEditClick}
          />
        ))
      : <Redirect to={`${match.url}/member-edit`} />
    return (
      <div>
        <h1>Members</h1>
        {/* <Link to={`${match.url}/member-edit`}><button onClick={() => buttonClick()}>/member-edit</button></Link> */}
        {renderMembers}
      </div>
    )
  }


}

const mapStateToProps = (state) => {
  const o = {
    members: selectors.getMembers(state),
    readMembersRequest: selectors.getRequest(state, 'api/getReadMembers'),
    openMemberId: selectors.getOpenMemberId(state)
  }
  return o
}
export default connect(mapStateToProps, actionCreators)(Members)
