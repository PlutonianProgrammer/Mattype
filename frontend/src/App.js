import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Play from "./routes/play/play.component";
import SignIn from "./routes/sign-in/sign-in.component";
import About from "./routes/about/about.component";
import Stats from "./routes/stats/stats.component";
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
        <Route path='sign-in' element={<SignIn />} />
        <Route path='about' element={<About />} />
        <Route path='stats' element={<Stats />} />
        <Route path='leaderboard' element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default App;
