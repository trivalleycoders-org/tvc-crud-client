import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions'
import * as selectors from '../../store/selectors'
import { Button } from 'react-bootstrap'
import styles from './style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultText: 'Click a button to get started'
    }
  }

  componentWillMount() {
    this.props.requestReadMembers()
  }

  render() {
    const { requestReadMembers } = this.props;

    const buttonClick = (name) => {
      console.log(name)
      //let val = name
      //this.setState({ resultText: val })
      console.log(requestReadMembers)
    }


    return (
      <div id="app" className={styles.app}>
        <Button
          id="create"
          className={styles.button}
          bsStyle="primary"
          onClick={(event) => buttonClick(event.target.id)}>
          Create
        </Button>
        <Button
          id="read"
          className={styles.button}
          bsStyle="primary"
          onClick={(event) => buttonClick(event.target.id)}>
          Read
        </Button>
        <Button
          id="update"
          className={styles.button}
          bsStyle="primary"
          onClick={(event) => buttonClick(event.target.id)}>
          Update
        </Button>
        <Button
          id="delete"
          className={styles.button}
          bsStyle="primary"
          onClick={(event) => buttonClick(event.target.id)}>
          Delete
        </Button>
        <div className={styles.results}>
          {this.state.resultText}
        </div>
      </div>
          );
          }
}

const mapStateToProps = (state) => {
  const o = {
    resultText: selectors.getResultText(state)
  }
  return o
}
export default connect(mapStateToProps, actionCreators)(App);
