import React, { createContext, useState, useEffect, useContext } from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

const defaultValues = {
  cart: [],
  loading: false,
  addVariantToCart: () => { },
  removeLineItem: () => { },
  updateLineItem: () => { },
  client,
  checkout: {
    id: "",
    lineItems: [],
  },
}

const StoreContext = createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [loading, setLoading] = useState(false)
  const [didJustAddToCart, setDidJustAddToCart] = useState(false)

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = async (variantId, quantity) => {
    setLoading(true)

    if (checkout.id === "") {
      console.error("No checkout ID assigned.")
      return
    }

    const checkoutID = checkout.id
    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    try {
      const res = await client.checkout.addLineItems(checkoutID, lineItemsToUpdate)
      setCheckout(res)
      setLoading(false)
      setDidJustAddToCart(true)
      setTimeout(() => setDidJustAddToCart(false), 3000)
      alert("Item added to cart!")
    } catch (error) {
      setLoading(false)
      console.error(`Error in addVariantToCart: ${error}`)
    }
  }

  const removeLineItem = async (checkoutID, lineItemID) => {
    setLoading(true)

    try {
      const res = await client.checkout.removeLineItems(checkoutID, [lineItemID])
      setCheckout(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in removeLineItem: ${error}`)
    }
  }

  const updateLineItem = async (checkoutID, lineItemID, quantity) => {
    setLoading(true)
    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    try {
      const res = await client.checkout.updateLineItems(checkoutID, lineItemsToUpdate)
      setCheckout(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in updateLineItem: ${error}`)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error("useStore must be used within StoreContext")
  }

  return context
}

export default useStore