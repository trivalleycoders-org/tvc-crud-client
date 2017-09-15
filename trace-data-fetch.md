# Path From UI to DB & Back Again

- Every change initiates from the UI
- Every change is initiated by an action


## Reading Members (short version)
### tvc-crud-client
- app/src/components/App/index.js componentWillMount()
  - this.props.requestReadmembers() // is an action
- app/src/store/actions.js
  - requestReadmembers
- app/src/api/index.js
  - members.read()
### tvc-crud-server
- routes/members.js
  - router.get('/', ...
### tvc-crud-client
- app/src/api/index.js
  - members.read()
- app/src/store/actions.js
  - requestReadmembers
- app/src/store/action
  - replaceMembers
- app/src/store/reducers.js
!! state updated 
UI re-renders


## Reading Members (long version)

  - 
### tvc-crud-client
- app/src/components/App/index.js componentWillMount()
  - this.props.requestReadmembers() is an action
  - Actions are imported via the line
  ````
  import * as actionCreators from '../../store/actions
  ````
- app/src/store/actions.js
  - The action is near the bottom of the module
  ````
  export const requestReadMembers = createRequestThunk({
  ````
  - createRequestThunk() is complicated. Consider it part of the framework that just happens to be visible to you.
  - here is the full action creator with some notes
  ````
  export const requestReadMembers = createRequestThunk({
    request: api.members.read, // call into app/src/api/index.js
    key: 'api/getReadMembers', // unique key to track progress/status of call
    success: [ replaceMembers ], // actions to call when the api call succeeds
  })
  ````
- app/src/api/index.js
  - members.read()
  - from here the call goes to fetchJson() and to the server
  - note method is a 'get' and the path being called is '/members'
  
### tvc-crud-server
- Since the path was /members it gets sent to the /members route which is anything in the module routes/members.js as defined in server.js
- The method of the call was 'get' so it will be caught by the first route
  ````
  router.get('/', function(req, res) {
  ````
  - The query is sent to the db and the data returned to the caller (i.e., tvc-crud-client

### tvc-crud-client
- We are back in the client app/src/api/index.js
- The data is returned to members.read() and then to the calling action which is repeated below
  ````
  export const requestUpdateMember = createRequestThunk({
    request: api.members.update,
    key: (_id) => `api/updateMember/${_id}`,
    success: [ replaceMembers ],
  })
  ````
  - when the data is returned the functions in the success: array will be called. There is only one in this case, i.e., replaceMembers. The data retreived from the server will be passed to replaceMembers by the createRequestThunk function
  - here is replaceMembers
    ````
    export const replaceMembers = (members) => { // note it has a members parameter
      ku.log('replaceMembers: members', members, 'blue') // just some logging
      return({
        type: 'app/replaceMembers', // type uniquely defines the action
        payload: members, // payload contains the data
      })
    }
    ````  
- All actions that are not thunks will be passed over the reducers
- app/src/store/reducers.js
- The action is passed over all reducers regardless of how many there are
- Reducers only act on an action if the have a switch statement that matches the actions 'type'
- The reducer alters the stated which is maintained in Redux

That is really it. There is one more part. Whenever state changes Redux tells React to rerender the UI. All done.
  

