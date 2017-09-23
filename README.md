# tvc-crud-new

Working through how we will be doing CRUD, API, Express, deployment and more.


## Logging
- Use ke-utils to log
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
