import { useEffect, useState } from 'react'
import { Product } from './product'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/Products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  function addProducts() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: 'Product ' + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200'
      },
    ])
  }

  return (
    <>
      <h1>Re-Store</h1>
      <button onClick={addProducts}>Add Products</button>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
