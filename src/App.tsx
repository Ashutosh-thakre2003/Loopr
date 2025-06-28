import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import WalletPage from "./pages/WalletPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PersonalPage from "./pages/PersonalPage";
import MessagePage from "./pages/MessagePage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";

const isAuthenticated = () => !!localStorage.getItem("token");

function App() {
  return (
        <Router>

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout + Routes */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="personal" element={<PersonalPage />} />
          <Route path="messages" element={<MessagePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all: redirect to home or login */}
        <Route
          path="*"
          element={
            isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
        </Router>

  );
}

export default App;
