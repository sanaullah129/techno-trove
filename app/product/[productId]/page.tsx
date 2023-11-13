import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";

interface IParams{
    productid?: string
}

const Product = ({params} : {params: IParams}) => {
    console.log(params);
    
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
      </Container>
    </div>
  )
}

export default Product