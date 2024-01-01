import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IParams{
  productId?: string
}

const Product = async ({params} : {params: IParams}) => {

  const product = await getProductById(params);
  if(!product) return <NullData title="No Product Data Found" />
  
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