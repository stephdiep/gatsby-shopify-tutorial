import React from 'react'
import styled from "styled-components"

const PrimaryButton = ({ text, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <Title>{text}</Title>
    </ButtonWrapper>
  )
}

export default PrimaryButton

const ButtonWrapper = styled.button`
  background: #014c40;
  border: none;
  border-radius: 30px;
  height: 40px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  :hover {
    transform: scale(1.2);
    transition: 0.2s;
  }
`

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  color: #FFFFFF;
`