import React from 'react'

const MemberEdit = (props) => (
  <div>
    {props.member_id}
    <form>
    <input type="text" name="first" value={props.firstName} />
    <input type="text" name="last" value={props.lastName} />
    <input type="text" name="email" value={props.email} />
    <button>save</button>
  </form>
  </div>
)

export default MemberEdit
