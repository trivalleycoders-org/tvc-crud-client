// App
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from './style.css'
import Members from './Members'
import MemberEdit from './MemberEdit'
import Schedule from './Schedule'
// import * as ku from '../../lib/ke-utils'

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.header}>
          <h1>Page</h1>
          <Link to='/'><button className={styles.menuButton}>/</button></Link>
          <Link to='/members'><button className={styles.menuButton}>/members</button></Link>

          <h2>Actions</h2>
        </div>
        <Route exact path='/' component={Schedule}/>
        <Route exact path='/members' component={Members} />
        <Route path='/members/member-edit' component={MemberEdit} />
        <Route path='/members/member-create' component={MemberEdit} />
      </div>
    </Router>
    )
}

export default App
