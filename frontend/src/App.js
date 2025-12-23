import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Play from "./routes/play/play.component";
import Auth from "./routes/auth/auth.component";
import About from "./routes/about/about.component";
import Stats from "./routes/stats/stats.component";
import HeatMap from "./routes/heatmap/heatmap.component";
import Leaderboard from "./routes/leaderboard/leaderboard.component";

const App = () => {
  // useEffect(() => {
  //   console.log("USEEFFECT");
  //   fetch("http://localhost:8000/api/books/")
  //     .then((res) => res.json()) // Call the function
  //     .then((data) => console.log(data)) // Log the actual JSON data
  //     .catch((error) => console.error(error));
  // }, []);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='play' element={<Play />} />
        <Route path='auth' element={<Auth />} />
        <Route path='about' element={<About />} />
        <Route path='stats' element={<Stats />} />
        <Route path='heatmap' element={<HeatMap />} />
        <Route path='leaderboard' element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default App;
