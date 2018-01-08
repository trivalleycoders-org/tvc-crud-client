// App
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from './style.css'
import * as memberActions from '../../store/actions/members-actions'
import * as roleActions from '../../store/actions/role-actions'
import * as selectors from '../../store/selectors'
import Members from './Members'
import MemberEdit from './MemberEdit'
import Schedule from './Schedule'
import { log } from '../../lib/ke-utils'

class App extends Component {
  componentDidMount() {
    log('App.componentDidMount', '', 'pink')
    log('memberActions', memberActions, 'pink')
    this.props.requestReadMembers()
    this.props.requestReadRoles()
  }

  render() {
    const { readRequestReadMembers, readRequestReadRoles } = this.props
    if (readRequestReadMembers.status !== 'success' || readRequestReadRoles.status !== 'success') {
      return (
        <h1>Loading ... </h1>
      )
    }

    return (
      <Router>
        <div className={styles.app}>
          <div className={styles.header}>
            <h1>Page</h1>
            <Link to="/">
              <button className={styles.menuButton}>/</button>
            </Link>
            <Link to="/members">
              <button className={styles.menuButton}>/members</button>
            </Link>
            <Link to="/schedule">
              <button className={styles.menuButton}>/schedule</button>
            </Link>
            <h2>Actions</h2>
          </div>
          <Route exact path='/schedule' component={Schedule} />
          <Route exact path='/members' component={Members} />
          <Route exact path='/members/member-edit/:action?/:id?' component={MemberEdit} />
        </div>
      </Router>
    )
  }
}

const actionCreators = { ...memberActions, ...roleActions}

const mapStateToProps = (state) => {
  return {
    readRequestReadMembers: selectors.getRequest(state, 'api/getReadMembers'),
    readRequestReadRoles: selectors.getRequest(state, 'api/getReadRoles'),
  }
}

export default connect(mapStateToProps, actionCreators)(App)
