import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";



const Catalog = () => {

  //const [products, setProducts] = useState<Product[]>([])
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded,status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  //const [loading, setLoading] = useState(true)

  useEffect(() => {
    // agent.Catalog.list()
    // .then((products: Product[]) => setProducts(products))
    // .catch(error => console.log(error))
    // .finally(()=> setLoading(false))

    if(!productsLoaded) dispatch(fetchProductsAsync());


  }, [productsLoaded,dispatch])

  if(status.includes('pending')) return <LoadingComponent message="Loading Products..." />

  return (
    <>
        <ProductList products={products} />
    </>
  )
}

export default Catalog