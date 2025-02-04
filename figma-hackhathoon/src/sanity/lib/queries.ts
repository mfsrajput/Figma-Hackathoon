import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;
export const four = groq`*[_type == "product"][0..3]`;
export const eight = groq`*[_type == "product"][0..7]`;
export const productById = `
  *[_type == "product" && _id == $id][0] {
    _id,
    title,
    description,
    productImage {
      asset {
        _ref,
            _type,
      }
    },
    price,
    tags,
    dicountPercentage,
    isNew,
    slug
  }
`;