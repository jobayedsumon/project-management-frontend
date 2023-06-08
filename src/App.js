import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DeveloperList from "./pages/Developer/DeveloperList";
import DeveloperForm from "./pages/Developer/DeveloperForm";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developers"
        element={
          <ProtectedRoute>
            <DeveloperList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developers/new"
        element={
          <ProtectedRoute>
            <DeveloperForm mode="create" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developers/:id"
        element={
          <ProtectedRoute>
            <DeveloperForm mode="edit" />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
