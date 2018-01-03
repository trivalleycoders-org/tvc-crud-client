// Members
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import MemberRow from './MemberRow'
import { Table } from 'react-bootstrap'
import { log } from '../../../lib/ke-utils'

class Members extends Component {
  render() {
    const { match, members } = this.props
    // log('members', members, 'blue')
    let renderMembers =  members.map((m, index) => (
              <MemberRow
                key={m.id}
                memberId={m.id}
                firstName={m.firstName}
                lastName={m.lastName}
                email={m.email}
                phoneNumber={m.phoneNumber}
              />
            ))

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
        <Link to={`${match.url}/member-edit/new`}><button>Add</button></Link>
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
