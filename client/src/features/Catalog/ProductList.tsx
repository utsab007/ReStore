import { Grid2 } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = ({ products}: Props) => {
  return (
    <Grid2 container spacing={4}>
      {products.map((product) => (
        <Grid2 size={{xs:3}} key={product.id}>
        <ProductCard key={product.id} product={product} />
        </Grid2>
      ))}
    </Grid2>
  )
}

export default ProductList
