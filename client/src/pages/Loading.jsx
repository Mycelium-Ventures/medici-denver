import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import {HashLoader} from "react-spinners";


const StyledLoading = styled.div`
  padding-top: 30%;
  color: #fff;
`

class Loading extends Component {

  render() {
    return (
      <div class="d-flex justify-content-center m-5">
        <HashLoader
          size={150}
          color={"#ce60a5"}
          loading={true}
        />
    </div>
    )
  }
}

export default Loading
