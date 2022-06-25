import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import UpdatePage from "./routes/UpdatePage"
import NoMatch from "./components/NoMatch"
import { RestaurantsContextProvider } from "./context/RestaurantsContext"

function App() {
  return (
    <>
      <RestaurantsContextProvider>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/restaurants/:id"
                element={<RestaurantDetailPage />}
              />
              <Route path="/restaurants/:id/update" element={<UpdatePage />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        </div>
      </RestaurantsContextProvider>
    </>
  )
}

export default App
