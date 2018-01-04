import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import ScheduleRow from './ScheduleRow'
import { log } from '../../../lib/ke-utils'

class Schedule extends Component {
  componentDidMount() {
    log('Schedule.componentDidMount', '', 'pink')
    // this.props.requestReadSchedule('2017-12-25')
    this.props.requestReadSchedule('2017-09-07')
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

    const { schedule, readScheduleRequest, members } = this.props
    // log('members', members, 'blue')

    // make sure we have the data before proceeding
    if (readScheduleRequest.status !== 'success') {
      return null
    }
    // const memberSelectList = []

    const renderList2 = schedule.map((r) => {
      // log('r.memberId', typeof r.memberId)

      const member = members.filter((m) => {
        return m.id === r.memberId
      })[0]
      // log('member.firstName', member.firstName, 'blue')
      return (<ScheduleRow
        key={r.roleId}
        roleId={r.roleId}
        roleName={r.roleName}
        member={member}
        selectMember={this.handleSelectMember}
      />
    )})

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
        {renderList2}
        {/* <button onClick={(e) => this.handleAutoSchedule(scheduleList, roles)}>
          Auto Schedule
        </button> */}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    schedule: selectors.getSchedule(state),
    members: selectors.getMembers(state),
    // currently not using?? memberIdsByLastRoleDate: selectors.getMemberIdsByLastRoleDate(state),
    readScheduleRequest: selectors.getRequest(state, 'api/getReadSchedule')
  }
}
export default connect(mapStateToProps, actionCreators)(Schedule)
