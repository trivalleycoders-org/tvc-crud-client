const createScheduleList = (scheduleMembers, roles, exclusions) => {
  return scheduleMembers.map(m => {
    const rMember = {
      memberId: m.member_id,
      sequence: m.sequence,
      firstName: m.first_name,
      lastName: m.last_name,
      lastServedDate: m.date,
      lastRoleId: m.role_id,
      lastRoleName: m.role_name,
      comment: m.comment,
      roles: getRoles(m.member_id),
    }
    return rMember
  })

  function getRoles (memberId) {
    let rRoles = roles.map((r) => {
      return {
        roleId: r.role_id,
        roleName: r.role_name,
        exempt: isExcluded(memberId, r.role_id)
      }
    })
    return rRoles
  }

  // Returns true if the role is excluded for the given pair of memberId & roleId, otherwise returns false
  function isExcluded(memberId, roleId) {
    const newArr = exclusions.filter((e) => {
      return (memberId === e.member_id && roleId === e.role_id)
    })
    if (newArr.length === 0) {
      return false
    } else if (newArr.length === 1) {
      return true
    } else {
      return false // should do something better than this
    }
  }
}

export default createScheduleList
