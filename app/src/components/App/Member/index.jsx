import React from 'react'

const Member = (props) => (
  <div>
    <p>{props.member_id}, {props.firstName}, {props.lastName}, {props.email}</p>
    <button>edit</button>
  </div>
)

export default Member
