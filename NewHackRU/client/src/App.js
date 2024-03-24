import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Quizzes from "./pages/Quizzes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";



const INria = createTheme({
  typography: {
    fontFamily: '"Inria Sans", sans-serif',
  },
  palette: {
    primary: {
      light: '#448aff',
      main: '#2979ff',
      dark: '#2962ff',
      contrastText: '#fff',
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={INria}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
