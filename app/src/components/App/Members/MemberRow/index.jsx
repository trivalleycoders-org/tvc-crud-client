// Member

import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/actions'
// import * as selectors from '../../../../store/selectors';
import styles from './style.css'

const MemberRow = ({ member_id, firstname, lastname, email, openMember }) => {
  // { member_id, firstname, lastname, email }
  const renderItems = (
    <div className={styles.wrapper}>
      <div> {member_id} </div>
      <div> {firstname} </div>
      <div> {lastname} </div>
      <div> {email} </div>
      {/* <button className={styles.menuButton} onClick={() => openMember(member_id)}>Open Member</button> */}
      <button className={styles.menuButton} onClick={() => openMember(member_id)}>Member</button>
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
