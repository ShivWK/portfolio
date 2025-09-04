import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router";
import Home from "./components/homepage/Home";

const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<Home />} />
            </Route>
        )
    )
    
    return <RouterProvider router={router} />
}

export default App;