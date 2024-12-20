import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { Basket } from '../models/Basket'

interface StoreContextValue {
  basket: Basket | null
  setBasket: (basket: Basket) => void
  removeItem: (productId: number, quantity: number) => void
}

export const StoreCotext = createContext<StoreContextValue | undefined>(
  undefined
)

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
  const context = useContext(StoreCotext)

  if (context === undefined) {
    throw Error('Oops - we do not seem to be inside provider')
  }

  return context
}

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
  const [basket, setBasket] = useState<Basket | null>(null)

  function removeItem(productId: number, quantity: number) {
    if(!basket) return;
    const items = [...basket.items]
    const itemIndex = items.findIndex(i => i.productId === productId)
    if(itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if(items[itemIndex].quantity === 0) items.splice(itemIndex,1)
        setBasket(prevState =>{
          return {...prevState!,items}
      })
    }
  }

  return (
    <StoreCotext.Provider value={{basket,setBasket,removeItem}}>
      {children}
    </StoreCotext.Provider>
  )



}
