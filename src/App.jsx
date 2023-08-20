import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import PageNotFound from "../pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Rewards from "../pages/Rewards";
import Landing from "../pages/Landing";
import UserDashboard from "../pages/UserDashboard";
import BrandRegistrationForm from "../features/brands/BrandRegistrationForm";
import UserRegistrationForm from "../features/users/UserRegistrationForm";
import BrandDashboard from "../pages/BrandDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="products/:brandId/:productId" element={<Product />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="/user/:id" element={<UserDashboard />} />
            <Route path="/brand" element={<BrandDashboard />} />
            <Route path="/register-brand" element={<BrandRegistrationForm />} />
            <Route path="/register-user" element={<UserRegistrationForm />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
