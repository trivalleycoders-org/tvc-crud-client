// Members
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as memberActions from '../../../store/actions/members-actions'
import * as roleActions from '../../../store/actions/role-actions'
import * as selectors from '../../../store/selectors'
import MemberRow from './MemberRow'
import { Table } from 'react-bootstrap'
import { log } from '../../../lib/ke-utils'

class Members extends Component {
  componentDidMount() {
    log('Members.componentDidMount', '', 'pink')
  }
  render() {

    const { match, members, readRequestReadMembers, readRequestReadRoles } = this.props
    log('props', this.props, 'red')
    if (readRequestReadMembers.status !== 'success' || readRequestReadRoles.status !== 'success' ) {
      return (
        <h1>Loading ... </h1>
      )
    }

    let renderMembers =  members.map((m, index) => (
              <MemberRow
                key={m.id}
                memberId={m.id}
                firstName={m.firstName}
                lastName={m.lastName}
                email={m.email}
                phoneNumber={m.phoneNumber}
                match={match}
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

const actionCreators = { ...memberActions, roleActions }
const mapStateToProps = (state) => {
  const o = {
    members: selectors.getMembers(state),
    readRequestReadRoles: selectors.getRequest(state, 'api/getReadRoles'),
    readRequestReadMembers: selectors.getRequest(state, 'api/getReadMembers')
  }
  return o
}
export default connect(mapStateToProps, actionCreators)(Members)
