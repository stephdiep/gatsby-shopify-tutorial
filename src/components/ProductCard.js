import React from 'react'
import { navigate } from 'gatsby-link'
import styled from "styled-components"

const ProductCard = ({ product }) => {
  return (
    <Wrapper>
      <AddButton onClick={() => alert("Added to cart!")}><p>+</p></AddButton>
      <ContentWrapper onClick={() => navigate(`${product.handle}`)}>
        <Image src={product.images[0]?.src} />
        <TextWrapper>
          <Title>{product.title}</Title>
          <Price>{product.priceRangeV2.maxVariantPrice.amount}0$</Price>
        </TextWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default ProductCard

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 200px;
  border-radius: 20px;

  gap: 10px;
  cursor: pointer;
  position: relative;
  box-shadow: 0px 20px 40px rgba(52, 53, 99, 0.2),
    0px 1px 3px rgba(0, 0, 0, 0.05);
`

const ContentWrapper = styled.div``

const Image = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  margin: 0;
`

const TextWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-radius: 0 0 20px 20px;
  background: rgba(255, 255, 255, 0.2);
  width: 200px;
  padding: 10px 0;
  backdrop-filter: blur(40px);
`

const Title = styled.p`
  font-weight: 600;
  text-align: center;
  margin: 0;
  color: #014c40;
`

const Price = styled.p`
  font-weight: normal;
  text-align: center;
  margin: 0;
`

const AddButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #014c40;
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    transform: scale(1.2);
    transition: 0.2s;
  }

  p {
    margin: 0;
    color: white;
    font-weight: bold;
  }
`