// ScheduleRow

import React from 'react'
import styles from './style.css'

const ScheduleRow = ({ roleId, memberId, scheduleList }) => {
  const renderItems = (
    <div className={styles.row}>
      <div className={styles.memberDetail}> {role.id} </div>
    </div>
  )
  const row = scheduleList.find((row) => row.memberId === memberId))
  return (
    <div>
      {renderItems}
    </div>
  )
}
