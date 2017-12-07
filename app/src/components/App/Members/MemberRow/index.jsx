// Member

import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as actionCreators from '../../../../store/actions'

// import * as selectors from '../../../../store/selectors';
import styles from './style.css'

const MemberRow = ({ memberId, firstName, lastName, email, phoneNumber, openMember, requestDeleteMember }) => {

  // { member_id, firstname, lastname, email }
  const renderItems = (
    <div className={styles.wrapper}>
      <div className={styles.column}>{firstName} {lastName}</div>
      <div className={styles.column}>{email}</div>
      <div className={styles.column}>{phoneNumber}</div>
      <div className={styles.column}></div>
      <Button onClick={() => openMember(memberId)}>Edit</Button>
    </div>
  )
  return (
    <div>
      {renderItems}
    </div>
  )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, actionCreators)(MemberRow);
