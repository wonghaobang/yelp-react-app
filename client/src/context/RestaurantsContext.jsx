import { createContext, useState } from "react"

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([])

  return (
    <RestaurantsContext.Provider value={{ hello: "hello" }}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}
