import client from './client.js'

async function fetchProducts() {
  const products = await client.fetch(`*[_type == "product"]{
    name,
    description,
    price,
    "imageUrl": image.asset->url,
    filters[]->{
        title,
        category->{
        title}
        }
    }`)
  
  console.log(JSON.stringify(products, null, 2));
}

fetchProducts()
