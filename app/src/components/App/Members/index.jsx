// Members
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import MemberRow from './MemberRow'
import { Table } from 'react-bootstrap'
// import * as ku from '../../../lib/ke-utils'

class Members extends Component {
  handleAddClick = () => {

    // this.props.router.push({
    //   pathname: `${this.props.match.url}/members/member-edit`,
    //   state: {
    //     action: 'create',
    //   }
    // })

  }
  render() {
    const { match, members, openMemberId, requestCreateMember } = this.props
    console.log('props', this.props, 'blue')
    let renderMembers
    // since requestReadMembers was moved to App I don't think we need this here
    //if (readMembersRequest.status === 'success') {
    // and don't need this:  renderMembers = openMemberId === null
        renderMembers =  members.map((m, index) => (
              <MemberRow
                key={m.id}
                memberId={m.id}
                firstName={m.firstName}
                lastName={m.lastName}
                email={m.email}
                phoneNumber={m.phoneNumber}
              />
            ))
        // nore this: <Redirect to={`${match.url}/member-edit`} />
    // } else {
      // renderMembers = <h1>Loading...</h1>
    // }

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
