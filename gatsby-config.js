require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Shopify Tutorial`,
    description: `Create a Gatsby site connected to your Shopify store`,
    author: `@stephdiep`,
    siteUrl: `https://designcode.io`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `design-code-gatsby-shopify`,
        short_name: `gatsby-shopify`,
        start_url: `/`,
        background_color: `#014C40`,
        display: `minimal-ui`,
        icon: `src/images/coffee-cup.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        password: process.env.GATSBY_SHOPIFY_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
      },
    },
  ],
}
