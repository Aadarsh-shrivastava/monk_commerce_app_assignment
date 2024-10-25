import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./screens/Layout";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ProductListProvider } from "./contexts/productListContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <DndProvider backend={HTML5Backend}>
      <ProductListProvider>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </ProductListProvider>
    </DndProvider>
  );
}

export default App;
