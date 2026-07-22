import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Analytics />} />

        {/* Optional Analytics Route */}
        <Route path="/analytics" element={<Analytics />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/analytics" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;