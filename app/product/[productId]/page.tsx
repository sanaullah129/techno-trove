import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParams{
  productId?: string
}

const Product = ({params} : {params: IParams}) => {

  const product = products.find((item => item.id === params.productId ));
  
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