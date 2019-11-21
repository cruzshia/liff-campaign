import React from 'react'
import { connect } from 'react-redux'

import { getLineSession } from '../actions/session'

interface Props {
  readonly getLineSession: () => void
}

class LineLogin extends React.Component<Props> {

  public async componentDidMount() {
    const { getLineSession } = this.props
    getLineSession()
  }

  public render() {
    return null
  }
}

const mapStateToProps = ({ session }: any) => ({ session })
const actionCreators = {
  getLineSession,
}

export default connect(
  mapStateToProps,
  actionCreators,
)(LineLogin)
