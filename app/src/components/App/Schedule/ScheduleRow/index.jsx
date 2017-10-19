// ScheduleRow

import React from 'react'
import styles from './style.css'

const ScheduleRow = ({ role, memberId, scheduleList, selectMember }) => {
  const scheduleRow = memberId ? scheduleList.find((row) => row.memberId === memberId) : null
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
              {scheduleRow.lastRoleName || 'null'} on {scheduleRow.lastServedDate|| 'null'}
            </div>
        }
      </div>
      <div className={styles.memberDetail}>
        <input
          type="checkbox"
          // checked={}
          // onChange={}
        />
      </div>
      <div className={styles.memberDetail}> [comment] </div>
      <div className={styles.memberDetail}> [contact] </div>
    </div>
  )
}

export default ScheduleRow
