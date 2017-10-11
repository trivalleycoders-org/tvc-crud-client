// ScheduleList
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './style.css'
import * as actionCreators from '../../../store/actions'
import * as selectors from '../../../store/selectors'
import * as ku from '../../../lib/ke-utils'
// import ScheduleRow from './ScheduleRow'


/* edit button should only appear when admin is logged in */

class Schedule extends Component {
  componentWillMount() {

    this.props.requestReadScheduleMembers() // likely will be requestReadSchedule('next') and can also have requestReadSchedule(date)
    this.props.requestReadExclusions()
    this.props.requestReadRoles()

  }
  render() {
    const { scheduleMembers, roles, exclusions } = this.props
    ku.log('Schedule: scheduleMembers', scheduleMembers, 'blue')
    ku.log('Schedule: roles', roles, 'blue')
    ku.log('Schedule: exclusions', exclusions, 'blue')
    return (
      <div id='schedule' className={styles.schedule}>
        <Link to='/editvolunteer'><button id='editScheduleBtn'>Edit</button></Link>
        <h1 className={styles.title}>Volunteer Schedule for [date] </h1>
        {/* <ScheduleRow /> */}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const o = {
    scheduleMembers: selectors.getScheduleMembers(state),
    roles: selectors.getRoles(state),
    exclusions: selectors.getExclusions(state)
  }
  return o
}
export default connect(mapStateToProps, actionCreators)(Schedule)
