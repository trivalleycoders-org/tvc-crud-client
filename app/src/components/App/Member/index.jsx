import React from 'react'

const Member = (props) => (
  <p>{props.member_id}, {props.firstName}, {props.lastName}, {props.email}</p>
)

export default Member
