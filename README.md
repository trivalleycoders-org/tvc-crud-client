# tvc-crud-new

Working through how we will be doing CRUD, API, Express, deployment and more.


## Logging
- Either use ke-utils and the conventions below to log to the console or remember to remove you logging before pushing your code. I know, it is hard. However, searching through the project to find an undesired log can be time consuming.

- Ex
````
import * as ku from '../upToLip/lib/ke-utils'

...

ku.log('message', variable, 'blue')
````

### Colors
- Actions: 'orange'
- Reducers: 'green'
- UI: 'blue'
- Selectors: 'pink'
- Error from error handler: 'red'

### Logging format
````
ku.log('moduleName.functioName: thingLogged, 'color')

````

## Naming Conventions

### Variables
- database table and field names are all lowercase and use underscores. E.g., first_name
- JavaScript variables used to represent database fields retain the name from the database. E.g., a database field name of first_name when represented by a JavaScript variable will be first_name
- All other JavaScript variables are camelCase

## Objects & Collections
- A collection of members will be named 'members' (plural) and individual members will be named 'member' (singular)

## JavaScript CSS Styles
- A JavaScript variable that contains CSS properties and is used as a style will be postfixed with the word 'Styles' (plural). E.g., styles for the div with id 'wrapper' would be 'wrapperStyles'. The word 'Styles' with be plural even if the object contains only one css property.


## var, const and let
- Do not use var
- Use const whenever possible
- Use let only when needed


## Action names
- An action that replaces all of a collection is prefixed with 'replace' even on the first get
- An action that changes existing data is prefixed with 'update'
- An action that deletes data is prefixed with 'delete'
- An action that creates new data (e.g., a db insert) is prefixed with 'create'
- All thunks that are API calls are prefixed with the word 'request'
### Example
- An API call to create a member in the database is 'requestCreateMember'. An action to create a member in state is 'createmember'


## JavaScript Conventions
````
// Use
const string = `This ${varName} is nice`

// not
const string = 'this ' + var + ' is nice'
````
- I'll us semicolons on your project if you don't use them on mine :) Thanks
### Use object destructuring where ever possible
````
  const obj = { 'first': 'jim', 'last': 'jhonson' }

  const { firstName, lastName} = obj
````
### Use arrow function
````
// Use
const getIt = (var1, var2) => { // function body }

// Not
function getIt(var1, var2) { // function body }
````

## Using array.map() to create React components
- When using array.map() to create a list of React components name the resulting array the same as the original array but prefixed with the word 'render'.
### Example
````
const renderMembers = members.map((m) => (
  <Member
    key={m.member_id}
    member_id={m.member_id}
    firstName={m.firstname}
    lastName={m.lastname}
    email={m.email}
    handleEditClick={handleEditClick}
  />
))
````
