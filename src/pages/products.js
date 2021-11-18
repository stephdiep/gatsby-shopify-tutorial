import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import ProductCard from "../components/ProductCard"

const Products = ({ data }) => {
	const { nodes } = data.allShopifyProduct
	console.log(`data`, data)
	return (
		<Layout>
			<Wrapper>
				{nodes?.map((product, index) => (<ProductCard key={index} product={product} />))}
			</Wrapper>
		</Layout>)
}

export default Products

export const query = graphql`
	{
		allShopifyProduct {
			nodes {
			title
			shopifyId
			handle
			status
			priceRangeV2 {
				maxVariantPrice {
				amount
				}
			}
			description
			images {
				src
			}
			}
		}
	}
`

const Wrapper = styled.div`
	display: grid;
	margin: 40px;
	grid-template-columns: repeat(3, auto);
	justify-content: left;
	gap:40px;
	max-width: 1234px;
`