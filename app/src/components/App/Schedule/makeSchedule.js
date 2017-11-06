// This function makeSchedule() accepts as a parameter an array of member
// objects. It is determined how many roles need to be filled by the length
// of the roles array of one of the members. That determines the number of
// members needed and all additional members are sliced off.
//
// Among other properties, each member object will have a propery
// memberId, and property roles, that is itself and array of objects. Each
// role object has a roleId and exempt, which is a boolean stating if then
// member is exept from that role.
//
// The function steps over each permutation recursively. If it encounters
// a schedule that has no conflicts (no one assigned to a role for which
// they are exempted), it will return that schedule and unravel the recursion
// to return that schedule. The function keeps a running track of which
// is the best fit and will return that is no perfect fit is found.
//
// Note that the schedule is reformated so that in the output is an object
// with each rollId as key and a memberId as property.
//
// This is a sample test array:
//
// var memberArrTest = [
//   {
//     memberId: 1,
//     roles: [
//       { roleId: 1, exempt: false },
//       { roleId: 2, exempt: true },
//       { roleId: 3, exempt: true },
//       { roleId: 4, exempt: true },
//     ]
//   },
//   {
//     memberId: 2,
//     roles: [
//       { roleId: 1, exempt: true },
//       { roleId: 2, exempt: true },
//       { roleId: 3, exempt: false },
//       { roleId: 4, exempt: true },
//     ]
//   },
//   {
//     memberId: 3,
//     roles: [
//       { roleId: 1, exempt: true },
//       { roleId: 2, exempt: true },
//       { roleId: 3, exempt: true },
//       { roleId: 4, exempt: true },
//     ]
//   },
//   {
//     memberId: 4,
//     roles: [
//       { roleId: 1, exempt: true },
//       { roleId: 2, exempt: true },
//       { roleId: 3, exempt: true },
//       { roleId: 4, exempt: false },
//     ]
//   },
//   {
//     memberId: 5,
//     roles: [
//       { roleId: 1, exempt: false },
//       { roleId: 2, exempt: false },
//       { roleId: 3, exempt: false },
//       { roleId: 4, exempt: false },
//     ]
//   },
//   {
//     memberId: 6,
//     roles: [
//       { roleId: 1, exempt: false },
//       { roleId: 2, exempt: false },
//       { roleId: 3, exempt: false },
//       { roleId: 4, exempt: false },
//     ]
//   }
// ]
//
// The return should be:
//
// {1: 1, 2: 3, 3: 2, 4: 4}

function makeSchedule(memberArrRaw) {

  let numRoles = memberArrRaw[0].roles.length

  // only need first n of
  let memberArr = memberArrRaw.slice(0, numRoles)

  // create array of role IDs
  let rolesArr = []
  memberArrRaw[0].roles.forEach((role) => rolesArr.push(role.roleId))

  // holder for best sched so far
  let bestSched = []
  let bestNum = Infinity

  // begin recursive permutation
  let rtn = permute(memberArr)

  // if return exists, then return it back to unravel
  if (rtn)
    return rtn
  else
    return bestSched

  //*************

  function numConflicts(putativeSched) {
    // return how many exemption confilcts this sched has
    let conflicts = 0;
    for (let i=0; i<putativeSched.length; i++) {
      if (putativeSched[i].roles[i].exempt)
        conflicts++
    }
    return conflicts
  }

  // helper function for recursion
  function swap(arr, pos1, pos2) {
    var temp = arr[pos1]
    arr[pos1] = arr[pos2]
    arr[pos2] = temp
  }

  // standard recursive permutation function
  function permute(arr, n) {
    n = n || arr.length // set n default to array.length
    if (n === 1) {
      let num = numConflicts(arr)
      if (num===0) {
        // perfect fit found, return it!
        bestSched = fixSched(arr)
        return bestSched
      }
      if (num < bestNum) {
        // new bestSched found
        bestNum = num
        bestSched = fixSched(arr)
      }
    } else {
      for (var i = 1; i <= n; i += 1) {
        let rtn = permute(arr, n - 1)
        let j
        if (rtn != null)
          return rtn
        if (n % 2) {
          j = 1
        } else {
          j = i
        }
        swap(arr, j - 1, n - 1) // -1 to account for javascript zero-indexing
      }
    }

    function fixSched(sched) {
      // put this sched into correct output format

      let newObj = {}
      sched.forEach((slot, i) => newObj[rolesArr[i]] = slot.memberId )
      return newObj
	  // *** leftover from when I misunderstood the ouput requirements
      // return sched.map((slot, i) => ({ [rolesArr[i]]: slot.memberId }))
    } // fixSched()
  } // permute()
}

//***************************************

export default makeSchedule
