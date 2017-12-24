// ScheduleList
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import ScheduleRow from './ScheduleRow'
import { log } from '../../../lib/ke-utils'

class Schedule extends Component {
  componentDidMount() {
    this.props.requestReadRoles(),
    this.props.requestReadSchedule('2017-12-25')
  }

  handleSelectMember = (roleId, memberId) => {
    this.props.setSchedule({
      [roleId]: memberId === '' ? undefined : +memberId
    })
  }

  // // could be used as reset
  // handleAutoSchedule = (scheduleList, roles) => {
  //   const schedule = makeSchedule(scheduleList, roles)
  //   this.props.setSchedule(schedule)
  // }

  render() {

    const { roles, schedule, readRolesRequest } = this.props

    // log('Schedule: readRolesRequest.status', readRolesRequest.status, 'blue' )
    // make sure we have the date before proceeding
    if (readRolesRequest.status !== 'success') {
      return null
    }
    // log('Schedule: roles', roles, 'blue')
    const memberSelectList = []
    // createScheduleList(scheduleMembers, roles, exclusions)

    const renderList = roles.map((r, index) => (
      <ScheduleRow
        key={index}
        role={r}
        // memberId={upcomingSchedule[r.role_id] || ''}
        memberSelectList={memberSelectList}
        selectMember={this.handleSelectMember}
      />
    ))

    // ku.log('Schedule: scheduleList', scheduleList, 'blue')
    return (
      <div id='schedule' className={styles.schedule}>
        <h1 className={styles.title}>Volunteer Schedule for [date] </h1>
        <div className={styles.row}>
          <div className={styles.memberDetail}>role</div>
          <div className={styles.memberDetail}>member</div>
          <div className={styles.memberDetail}>lastRole</div>
          <div className={styles.memberDetail}>comment</div>
          <div className={styles.memberDetail}>contact</div>
        </div>
        {renderList}
        {/* <button onClick={(e) => this.handleAutoSchedule(scheduleList, roles)}>
          Auto Schedule
        </button> */}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const o = {
    roles: selectors.getRoles(state),
    schedule: selectors.getSchedule(state),
    members: selectors.getMembers(state),
    memberIdsByLastRoleDate: selectors.getMemberIdsByLastRoleDate(state),
    readRolesRequest: selectors.getRequest(state, 'api/getReadRoles')
  }
  return o
}
export default connect(mapStateToProps, actionCreators)(Schedule)
