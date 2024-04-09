import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const CREATE_CHECKOUT_PROFILE_MUTATION = `mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
  checkoutBrandingUpsert(
    checkoutBrandingInput: $checkoutBrandingInput
    checkoutProfileId: $checkoutProfileId
  ) {
    checkoutBranding {
      designSystem {
        colors{
          global{
            brand
            accent
          }
        }
        typography {
          size {
            base
            ratio
          }
          secondary{
            base{
              sources
            }
          }
          primary {
            base {
              sources
            }
          }
        }
      }
      customizations{
        headingLevel1 {
          typography{
            size
            letterCase
            weight
          }
        }
        primaryButton{
          typography{
            font
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`;

const CREATE_CHECKOUT_PROFILE_MUTATION_SCHEME1 = `
mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
  checkoutBrandingUpsert(
    checkoutBrandingInput: $checkoutBrandingInput
    checkoutProfileId: $checkoutProfileId
  ) {
    checkoutBranding {
      designSystem {
        colors {
          schemes {
            scheme1 {
              base {
                background
                text
              }
              control {
                background
                border
                selected {
                  background
                  border
                }
              }
              primaryButton {
                hover {
                  background
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`

const CREATE_CHECKOUT_PROFILE_MUTATION_SCHEME2 = `
mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
  checkoutBrandingUpsert(
    checkoutBrandingInput: $checkoutBrandingInput
    checkoutProfileId: $checkoutProfileId
  ) {
    checkoutBranding {
      designSystem {
        colors {
          schemes {
            scheme2 {
              base {
                background
                text
              }
              control {
                background
                border
                selected {
                  background
                  border
                }
              }
              primaryButton {
                hover {
                  background
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`



export async function checkoutProfileScheme1(session, data) {
  const client = new shopify.api.clients.Graphql({ session });
  const variables = {
    "checkoutProfileId": "gid://shopify/CheckoutProfile/23003328",
    "checkoutBrandingInput": {
      "designSystem": {
        "colors": {
          "schemes": {
            "scheme1": {
              "base": {
                "background": `${data.baseBg}`,
                "text": `${data.baseText}`
              },
              "control": {
                "background": `${data.conBg}`,
                "border": `${data.conBo}`,
                "selected": {
                  "background": `${data.conSeBg}`,
                  "border": `${data.conSeBo}`
                }
              },
              "primaryButton": {
                "hover": {
                  "background": `${data.primaryButtonHoverBack}`
                }
              }
            }
          }
        }
      }
    }
  }
  try {
    console.log(variables)
    await client.query({
      data: {
        query: CREATE_CHECKOUT_PROFILE_MUTATION_SCHEME1,
        variables: variables
      }
    },);
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}

export async function checkoutProfile(session, formData) {
  console.log(formData);
  const client = new shopify.api.clients.Graphql({ session });
  console.log(typeof formData.headingColor);

  const variables = {
    "checkoutProfileId": "gid://shopify/CheckoutProfile/23003328",
    "checkoutBrandingInput": {
      "designSystem": {
        "colors": {
          "global": {
            "brand": `${formData.headingColor}`,
            "accent": `${formData.headingColor}`

          }
        },
        "typography": {
          "secondary": {
            "shopifyFontGroup": {
              "name": `${formData.secondaryFont}`
            }
          },
          "primary": {
            "shopifyFontGroup": {
              "name": `${formData.primaryFont}`
            }
          },
          "size": {
            "base": Number(formData.baseValue),
            "ratio": Number(formData.ratioValue)
          }
        }
      },
      "customizations": {
        "headingLevel1": {
          "typography": {
            "size": `${formData.headingSize}`,
            "letterCase": `${formData.headingLetterCase}`,
            "weight": `${formData.headingWeight}`
          }
        },
        "primaryButton": {
          "typography": {
            "font": "SECONDARY"
          }
        }
      }
    }
  };

  try {
    console.log(variables)
    await client.query({
      data: {
        query: CREATE_CHECKOUT_PROFILE_MUTATION,
        variables: variables
      }
    },);
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}

export async function checkoutProfileScheme2(session, data) {
  const client = new shopify.api.clients.Graphql({ session });
  const variables = {
    "checkoutProfileId": "gid://shopify/CheckoutProfile/23003328",
    "checkoutBrandingInput": {
      "designSystem": {
        "colors": {
          "schemes": {
            "scheme2": {
              "base": {
                "background": `${data.baseBg}`,
                "text": `${data.baseText}`
              },
              "control": {
                "background": `${data.conBg}`,
                "border": `${data.conBo}`,
                "selected": {
                  "background": `${data.conSeBg}`,
                  "border": `${data.conSeBo}`
                }
              },
              "primaryButton": {
                "hover": {
                  "background": `${data.primaryButtonHoverBack}`
                }
              }
            }
          }
        }
      }
    }
  }
  try {
    console.log(variables)
    await client.query({
      data: {
        query: CREATE_CHECKOUT_PROFILE_MUTATION_SCHEME2,
        variables: variables
      }
    },);
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}