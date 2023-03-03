import React, {Component, useState} from 'react'
import styled from 'styled-components'

const ArrInput = styled.input`
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

const ArrForm = styled.form`
    width: 260px;
    height: 45px;
    display: inline-block;
    margin:12px;
    margin-left: 0;
`



const ArrayInput = (props) => {
    const [name, setName] = useState("")
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.onSubmit(name)
    }
    return(

        <ArrForm onSubmit={handleSubmit}>
            <InputButton 
                type='submit' 
                // onClick={this.props.onChangeSize}
                >Change size</InputButton>
            <ArrInput 
                onChange={handleChange}
                max={300} 
                min={10} 
                defaultValue={props.value} 
                type='number' 
                name='array-input'/>

        </ArrForm>

    )
}
export default ArrayInput