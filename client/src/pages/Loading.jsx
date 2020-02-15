import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

const StyledLoading = styled.div`
  padding-top: 30%;
  color: #fff;
`

class Loading extends Component {

  render() {
    return (
      <StyledLoading className="App body">
        <div className="row">
          <div className="col text-right" style={{paddingTop: '8px'}}>
            Loading
          </div>
          <div className="col text-left">
            <CircularProgress />
          </div>
        </div>

      </StyledLoading>
    )
  }
}

export default Loading
