import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.css'
import * as actionCreators from '../../../store/actions/schedule-actions'
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


  render() {
    const { schedule, readScheduleRequest, members, roles } = this.props
    // log('Schedule.render props', this.props, 'orange')
    // make sure we have the data before proceeding
    if (readScheduleRequest.status !== 'success') {
      return null
    }

// me
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

    // rendering title bar

    const titles = ['Role', 'Member', 'Last Role', 'Comment', 'Contact']

    const titleBar = (
      <div className={styles.row}>
        {titles.map((title, i) => (
          <span key={i} className={[styles.memberDetail, styles.titleBar].join(' ')}>
            {title}
          </span>
        )
        )}
      </div>
    )

    const renderRole = (role, members, i) =>
      <ScheduleRow key={i} index={i} role={role} members={members} />

    // Filtering out non-scheduleable members - is this necessary?
    // Are they filtered out earlier?

    const viableMembers = members.filter(member => (member.active && !member.exempt))

    return (
      <div className='wrapper'>
        {titleBar}
        {roles.map((role, i) => renderRole(role, viableMembers, i))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    schedule: selectors.getSchedule(state),
    members: selectors.getMembers(state),
    // currently not using?? memberIdsByLastRoleDate: selectors.getMemberIdsByLastRoleDate(state),
    readScheduleRequest: selectors.getRequest(state, 'api/getReadSchedule'),
    roles: selectors.getRoles(state),
  }
}
export default connect(mapStateToProps, actionCreators)(Schedule)
