import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Home } from "./components/Home";
import Lessons from "./components/Lessons";
import Lesson from "./components/Lesson";

function App() {
  return (
    <BrowserRouter>
    <h1>E.DUB.BA: School of Hittite Cuneiform</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="lessons">Lessons</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="lessons" element={<Lessons />} />
      <Route path="lesson/:id" element={<Lesson />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
