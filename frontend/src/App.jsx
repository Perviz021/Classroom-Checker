import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import ClassroomDetail from "./components/ClassroomDetail";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center my-6">
          Classroom Device Checker
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/classroom/:id" element={<ClassroomDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
