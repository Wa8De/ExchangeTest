import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import {
  DetailsUtilisateurs,
  Utilisateurs,
  TransactionReleve,
  Transaction,
  RoleEtPermission,
  Parametres,
  Historique,
  Devise,
  Exchange,
  Dashboard,
  Clients,
  Profile,
  Preferences,
  Notifications,
  Security,
} from './Pages/Exports';
import Login from './Pages/Auth/Login';
import Layout from './Pages/Layout';
import ForgottenPassword from './Pages/Auth/ForgottenPassword';
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const jwt = sessionStorage.getItem("jwt")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login page without layout */}
        <Route path="/login" element={<Login />} />{" "}
        {/* Login page without layout */}
        <Route path="/forgotpassword" element={<ForgottenPassword />} />{" "}
        {/* Forgotten Password page without layout */}
        <Route
          element={
            <Layout>
              {" "}
              <Outlet />{" "}
            </Layout>
          }
        >
          <Route path="*" element={<Navigate to={!jwt?"/login":"/dashboard"} replace />} />
          <Route element={<PrivateRoutes />}>
            {/* sidebarlinks */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/change" element={<Exchange />} />
            <Route path="/utilisateurs" element={<Utilisateurs />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/transactionReleve" element={<TransactionReleve />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/roleEtPermission" element={<RoleEtPermission />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/devise" element={<Devise />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/transactionReleve" element={<TransactionReleve />} />

            {/* --------------------------------------------------------------- */}

            {/* User Details */}
            <Route path="/utilisateurs/:id" element={<DetailsUtilisateurs />} />
            {/* --------------------------------------------------------------- */}

            {/* Settings's sidebar Links */}
            <Route element={<Parametres />}>
              <Route path="/settings/profile" element={<Profile />} />
              <Route path="/settings/preferences" element={<Preferences />} />
              <Route
                path="/settings/notifications"
                element={<Notifications />}
              />
              <Route path="/settings/security" element={<Security />} />
            </Route>
          </Route>

          {/* --------------------------------------------------------------- */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
