import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="certificates/:id" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
