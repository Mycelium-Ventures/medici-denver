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
      <div className="container m-5" style={{height: "80vh !important"}}>
        <div class="d-flex justify-content-center h-100">
            <HashLoader
              size={150}
              color={"#ce60a5"}
              loading={true}
            />
        </div>
      </div>
    )
  }
}

export default Loading
