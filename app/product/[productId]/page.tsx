import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";
import ListRating from "./ListRating";

interface IParams{
    productid?: string
}

const Product = ({params} : {params: IParams}) => {
    // console.log(params);
    
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
        <div className="flex flex-col gap-4 mt-16">
          <div>Add Rating</div>
          <div><ListRating product={product}/></div>
        </div>
      </Container>
    </div>
  )
}

export default Product