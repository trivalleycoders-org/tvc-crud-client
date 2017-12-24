// ScheduleRow

import React from 'react'
import styles from './style.css'
import { log } from '../../../../lib/ke-utils'

const ScheduleRow = ({ role, memberId, scheduleList, selectMember }) => {
  // log('role', role, 'blue')
  // log('memberId', memberId, 'blue')
  log('scheduleList', scheduleList, 'blue')
  // log('selectMember', selectMember, 'blue')
  const scheduleRow = memberId
    ? scheduleList.find((row) => row.memberId === memberId)
    : null
  const memberOptions = scheduleList.map((el, index) =>
    <option key={index} value={el.memberId}>{el.firstName} {el.lastName}</option>
  )

  return (
    <div className={styles.row}>
      <div className={styles.memberDetail}> {role.role_name} </div>
      <div className={styles.memberDetail}>
        <select value={memberId} onChange={(e) => selectMember(role.role_id, e.target.value)}>
          <option value={''}>Select Member</option>
          {memberOptions}
        </select>
      </div>
      <div className={styles.memberDetail}>
        {
          scheduleRow &&
          <div>
            {scheduleRow.lastRoleName || 'none'} on {scheduleRow.lastServedDate || 'n/a'}
          </div>
        }
      </div>
      <div className={styles.memberDetail}>{scheduleRow ? scheduleRow.comment : ''}</div>
      {/*
        the server does not provide contact data yet,
        see "[log] api.schedule.scheduleMembers: data " in the console
      */}
      <div className={styles.memberDetail}> [contact] </div>
    </div>
  )
}

export default ScheduleRow
