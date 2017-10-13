// Member

import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/actions'

// import * as selectors from '../../../../store/selectors';
import styles from './style.css'

const MemberRow = ({ member_id, firstname, lastname, email, phone_number, openMember, requestDeleteMember }) => {
  const handleDeleteClick = () => {
    requestDeleteMember(member_id)
  }

  // { member_id, firstname, lastname, email }
  const renderItems = (
    <div className={styles.wrapper}>

      <div className={styles.column}>{firstname} {lastname}</div>
      <div className={styles.column}>{phone_number}</div>
      <div className={styles.double_column}>{email}</div>
      
      <button className={styles.menuButton} onClick={() => openMember(member_id)}>Edit</button>
      <button className={styles.menuButton} onClick={() => handleDeleteClick()}>Delete</button>
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
