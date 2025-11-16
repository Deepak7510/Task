import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import React from "react";

// import TransactionsPage from "./pages/TransactionsPage";
// import AnalyticsSummaryPage from "./pages/AnalyticsSummaryPage";
const TransactionsPage = React.lazy(() => import("./pages/TransactionsPage"));
const AnalyticsSummaryPage = React.lazy(() =>
  import("./pages/AnalyticsSummaryPage")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/analytics-summary" element={<AnalyticsSummaryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
