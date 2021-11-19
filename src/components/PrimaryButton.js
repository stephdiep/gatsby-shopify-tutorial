import React from 'react'
import styled from "styled-components"

const PrimaryButton = ({ text, onClick, disabled = false }) => {
  return (
    <ButtonWrapper onClick={onClick} disabled={disabled}>
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

  :disabled {
    background: rgba(1,76,64,0.5);
    transform: none;
    cursor: not-allowed;
  }
`

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  color: #FFFFFF;
`