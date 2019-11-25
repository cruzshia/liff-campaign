import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import { callCreateEstimationRequest, getBodyGramToken } from '../actions/bodygram'
import { EstimationParameter } from '../models/bodygram'

interface Props extends RouteComponentProps<any> {
  readonly getBodyGramToken: (authorization: string) => void
  readonly estimate: (param: EstimationParameter) => void
  readonly session: string
}

interface State {
  readonly gender: string
  readonly height: number
  readonly weight: number
  readonly front: File | null
  readonly side: File | null
  initialized: boolean
}

class BodyGram extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      gender: 'male',
      height: 170,
      weight: 60,
      front: null,
      side: null,
      initialized: false,
    }
  }

  public async componentDidMount() {
  }

  public async componentDidUpdate() {
    const { getBodyGramToken, session } = this.props
    const { initialized } = this.state
    if(session && !initialized) {
      getBodyGramToken(session)
      this.setState({ initialized: true })
    }
  }

  private handleChangeGender = (event: any) => {
    this.setState({gender: event.target.value});
  }

  private handleChangeHeight = (event: any) => {
    this.setState({height: event.target.value ? parseInt(event.target.value, 10) : 0});
  }

  private handleChangeWeight = (event: any) => {
    this.setState({weight: event.target.value ? parseInt(event.target.value, 10) : 0});
  }

  private handleChangeFront = (files: FileList | null) => {
    this.setState({front: files ? files[0] : null});
  }

  private handleChangeSide = (files: FileList | null) => {
    this.setState({side: files ? files[0] : null});
  }

  private handleSubmit = (event: any) => {
    // alert('An essay was submitted: ' + this.state.value);
    if (!this.state.front || !this.state.side) return
    console.log(this.state)
    const { estimate } = this.props
    event.preventDefault();
    estimate({
      gender: this.state.gender || '',
      heightInCm: this.state.height,
      weightInKg: this.state.weight,
      age: 30,
      frontImage: this.state.front,
      sideImage: this.state.side,
      failOnAutomaticEstimationFailure: true,
    })
  }

  public render() {
    const { session } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Gender:
          <input type="text" value={this.state.gender} onChange={this.handleChangeGender} />
        </label>
        <br/>
        <label>
          Height:
          <input type="number" value={this.state.height} onChange={this.handleChangeHeight} />
        </label>
        <br/>
        <label>
          Weight:
          <input type="number" value={this.state.weight} onChange={this.handleChangeWeight} />
        </label>
        <br/>
        <label>
          Front image:
          <input type="file" onChange={ (e) => this.handleChangeFront(e.target.files) } />
        </label>
        <br/>
        <label>
          Side image:
          <input type="file" onChange={ (e) => this.handleChangeSide(e.target.files) } />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        <br/>
        {
          session ?
          <div>
            <label>LINE token</label>
            <br/>
            {session}
          </div> : null
        }
      </form>
    )
  }
}

const mapStateToProps = ({ session }: any) => ({ session })
const actionCreators = {
  getBodyGramToken,
  estimate: callCreateEstimationRequest,
}

export default connect(
  mapStateToProps,
  actionCreators,
)(BodyGram)
