// Members
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import MemberRow from './MemberRow'
import { Table } from 'react-bootstrap'
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
            firstName={m.first_name}
            lastName={m.last_name}
            email={m.email}
            phoneNumber={m.phone_number}
          />
        ))
      : (openMemberId === 'create'
        ? <Redirect to={`${match.url}/member-create`} />
        : <Redirect to={`${match.url}/member-edit`} />
      )
    return (
      <div>
        <h1>Members</h1>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Text</th>
              <th>Comments</th>
            </tr>
          </thead>
        </Table>
        {renderMembers}
        {/* <Link to={`${match.url}/member-edit`}><button onClick={() => buttonClick()}>/member-edit</button></Link> */}
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
