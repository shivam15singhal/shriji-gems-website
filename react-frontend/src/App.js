import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GemDetails from "./pages/GemDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import GemstoneList from "./pages/GemstoneList";
import About from "./pages/About";
import GemVariantDetails from "./pages/GemVariantDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminRoute from "./routes/AdminRoute";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/AdminOrders";
import AdminGems from "./pages/admin/AdminGems";
import AddGem from "./pages/admin/AddGem";
import EditGem from "./pages/admin/EditGem";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GemQualityPage from "./pages/GemQualityPage";
import ScrollToTop from "./components/ScrollToTop";
import AboutShreeJiGems from "./pages/AboutShreeJiGems";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import PaymentMethods from "./pages/PaymentMethods";
import ReturnExchange from "./pages/ReturnExchange";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="App">
    <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/gemstones" element={<GemstoneList />} />

         <Route path="/gems/:id/:quality" element={<GemQualityPage />} />

        <Route path="/gems/:id" element={<GemDetails />} />

        <Route path="/gems/:gemId/:variantIndex" element={<GemVariantDetails />} />

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }/>

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<MyProfile />} />

        <Route path="/orders" element={<MyOrders />} />

        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

       

        <Route path="/admin/leads" element={
          <AdminRoute>
            <AdminLeads />
          </AdminRoute>
        }/>

        <Route
 path="/admin/gems"
 element={
   <AdminRoute>
     <AdminGems />
   </AdminRoute>
 }
/>

<Route
 path="/admin/gems/new"
 element={
   <AdminRoute>
     <AddGem />
   </AdminRoute>
 }
/>

<Route
 path="/admin/gems/edit/:id"
 element={
   <AdminRoute>
     <EditGem />
   </AdminRoute>
 }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/about-shree-ji-gems"
  element={<AboutShreeJiGems />}
/>

<Route
  path="/terms-and-conditions"
  element={<TermsConditions />}
/>

<Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>

<Route
  path="/shipping-policy"
  element={<ShippingPolicy />}
/>
<Route
  path="/payment-methods"
  element={<PaymentMethods />}
/>
<Route
  path="/return-exchange"
  element={<ReturnExchange />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

      </Routes>
    </div>
  );
}

export default App;