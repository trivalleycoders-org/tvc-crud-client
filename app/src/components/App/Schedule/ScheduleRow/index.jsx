// ScheduleRow

import React from 'react'
import styles from './style.css'
import * as ku from '../../../../lib/ke-utils'
const ScheduleRow = ({ role, memberId, scheduleList, selectMember }) => {
  const scheduleRow = memberId
    ? scheduleList.find((row) => row.memberId == memberId)
    : null
  const memberOptions = scheduleList.map((el, index) =>
    <option key={index} value={el.memberId}>{el.firstName} {el.lastName}</option>
  )
  ku.log('scheduleList', scheduleList, 'red')

  ku.log('scheduleRow', scheduleRow, 'red')
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
