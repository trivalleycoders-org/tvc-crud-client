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
    const { match, members, openMemberId, createMember } = this.props

    // <Link to={`${match.url}/member-edit`}>
    // ku.log('Members: members', members, 'blue')
    const renderMembers = openMemberId === null
      ? members.map((m, index) => (
          <MemberRow
            key={m.member_id}
            member_id={m.member_id}
            firstname={m.first_name}
            lastname={m.last_name}
            email={m.email}
          />
        ))
      : (openMemberId === 'create'
        ? <Redirect to={`${match.url}/member-create`} />
        : <Redirect to={`${match.url}/member-edit`} />
      )
    return (
      <div>
        <h1>Members</h1>
        {/* <Link to={`${match.url}/member-edit`}><button onClick={() => buttonClick()}>/member-edit</button></Link> */}
        {renderMembers}
        <button onClick={createMember}>Add</button>
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
