// MemberEdit

import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link, Redirect } from 'react-router-dom'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import { log } from '../../../lib/ke-utils'

// import styles from './style.css'

class MemberEdit extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     member: {},
  //   }
  // }
  componentDidMount() {
    this.props.requestCreateMember()
  }

  handleMemberChange = (fieldname, value) => {
    // log('incomming values: ', `fieldname: ${fieldname}, value: ${value}`, 'blue');

    this.props.updateMember(this.props.openMemberId, fieldname, value);
  }

  render() {
    // ({ match }) =>

    const { openMemberId, member, readRequestCreateMember, readRequestReadMembers } = this.props
    if (readRequestCreateMember.status === 'success' && readRequestReadMembers.status === 'success') {
      return (
        <div>
          <h1>MemberEdit</h1>
          <input type="text" value={member.lastName || ""} placeholder="last name"
            onChange={(event) => this.handleMemberChange('lastName', event.target.value)} />
        </div>
      )
    } else {
      return (
        <h1>Loading ... </h1>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const openMemberId = selectors.getOpenMemberId(state)
  const o = {
    member: selectors.getMember(state, openMemberId),
    openMemberId: selectors.getOpenMemberId(state),
    readRequestCreateMember: selectors.getRequest(state, 'api/createMember'),
    readRequestReadMembers: selectors.getRequest(state, 'api/getReadMembers'),
 }
 return o
}

export default connect(mapStateToProps, actionCreators)(MemberEdit)
