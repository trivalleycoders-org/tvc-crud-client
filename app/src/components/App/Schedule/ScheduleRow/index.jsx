import React from 'react'
import styles from './style.css'
import { log } from '../../../../lib/ke-utils'

const ScheduleRow = ({ roleId, roleName, member }) => {
  // memberId={r.memberId}
  // memberName={`${member.firstName} ${member.lastName}`}
  // memberEmail={member.email}
  // memberComment={member.comment}
  // memberPhone={member.phoneNumber}
  const { firstName, lastName, lastRoleName, lastRoleDate, comment, phoneNumber } = member
  return (
    <div className={styles.row}>
      <div className={styles.memberDetail}> {roleName} </div>
      <div className={styles.memberDetail}>{`${firstName} ${lastName}`}</div>
      <div className={styles.memberDetail}>{`${lastRoleName} ${lastRoleDate}`}</div>
      <div className={styles.memberDetail}>{comment}</div>
      <div className={styles.memberDetail}>{phoneNumber}</div>
    </div>
  )
}

export default ScheduleRow
