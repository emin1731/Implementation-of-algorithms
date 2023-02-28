import React, {Component} from 'react'
import styled from 'styled-components'

const Inp = styled.input`
    width: 150px;
    height: 45px;
    color: #EEEEEE;
    background-color: #31353c;
    border-radius: 0 10px 10px 0;
    border: none;
    margin-left: 0;
    font-size: 16px;
    cursor: pointer;
    padding: 15px;
    &:hover {
        background-color: #31353c;
        transition: 0.2s;
      }
`

const InputButton = styled.button`
    width: 110px;
    height: 45px;
    color: #EEEEEE;
    background-color: #393E46;
    border-radius: 10px 0 0 10px;
    border: none;
    margin-left: 0;
    font-size: 16px;
    cursor: pointer;
    // border: solid 2px #EEEEEE;
    &:hover {
        background-color: #31353c;
        transition: 0.2s;
      }
`


export default class ArrayInput extends Component {
    render() {
        return(
            <>
            <InputButton onClick={this.props.onChangeSize}>Change size</InputButton>
            <Inp max={100} min={10} defaultValue={this.props.value} type='number' name='array-input'/>
            </>
        )
    }
}