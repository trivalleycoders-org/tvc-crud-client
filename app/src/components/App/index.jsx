// App
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from './style.css'
import * as actionCreators from '../../store/actions'
import * as selectors from '../../store/selectors'
import Members from './Members'
import MemberEdit from './MemberEdit'
import Schedule from './Schedule'
import { log } from '../../lib/ke-utils'

class App extends Component {
  componentDidMount() {
    log('App.componentDidMount', '', 'pink')
    this.props.requestReadMembers()
    this.props.requestReadRoles()
  }

  render() {
    // log('props', this.props, 'blue')
    const { readRequestReadMembers, readRequestReadRoles } = this.props
    if (readRequestReadMembers !== 'success' || readRequestReadRoles !== 'success')
    return (
      <Router>
        <div className={styles.app}>
          <div className={styles.header}>
            <h1>Page</h1>
            <Link to='/'><button className={styles.menuButton}>/</button></Link>
            <Link to='/members'><button className={styles.menuButton}>/members</button></Link>
            <Link to='/schedule'><button className={styles.menuButton}>/schedule</button></Link>
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

const mapStateToProps = (state) => {
  return {
    readRequestReadMembers: selectors.getRequest(state, 'api/getReadMembers'),
    readRequestReadRoles: selectors.getRequest(state, 'api/getReadRoles'),
  }
}

export default connect(mapStateToProps, actionCreators)(App)
