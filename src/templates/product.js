import { navigate } from "gatsby-link"
import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import PrimaryButton from "../components/PrimaryButton"
import useStore from "../context/StoreContext"
import useInput from "../utils/useInput"

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext
  const { addVariantToCart } = useStore()
  const bind = useInput(1)

  return (
    <Layout>
      <BackButton onClick={() => navigate(-1)}>{"< "} Back</BackButton>
      <Wrapper>
        <Image src={product.images[0]?.src} />
        <InfoContainer>
          <Title>{product.title}</Title>
          <Subtitle>{product.priceRangeV2.maxVariantPrice.amount}0$</Subtitle>
          <p>{product.description}</p>
          <InputForm>
            <Subtitle><label htmlFor="qty">Quantity:</label></Subtitle>
            <Input placeholder="1" id="qty" type="number" {...bind} />
          </InputForm>
          <PrimaryButton text="Add to cart" onClick={() => addVariantToCart(product, bind.value)} />
        </InfoContainer>
      </Wrapper>
    </Layout>
  )
}

export default ProductTemplate

const BackButton = styled.p`
  cursor: pointer;
  color: #014c40;
  margin-left: 40px;
  font-size: 14px;
  font-weight: 600;
`

const Wrapper = styled.div`
  margin: 40px;
  display: grid;
  grid-template-columns: 400px auto;
  gap: 40px;
`

const Image = styled.img`
  width: 400px;
  height: 500px;
  border-radius: 30px;
  object-fit: cover;
`

const InfoContainer = styled.div`
  display: grid;
  align-items: flex-start;
  height: fit-content;
  gap: 10px;

  p {
    margin: 0;
  }
`

const Title = styled.h1`
  margin: 0;
`

const Subtitle = styled.p`
  font-weight: bold;
  max-width: 500px;
`

const InputForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, auto);
  width: fit-content;
  gap: 20px;
  align-items: center;
  gap: 10px;
`

const Input = styled.input`
  border-radius: 20px;
  border: 2px solid rgba(0,0,0,0.3);
  padding: 10px 20px;
  max-width: 80px;
  font-size: 12px;
  :focus {
    outline: none;
    outline-color: #014c40;
  }
`