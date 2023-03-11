import reactLogo from "./assets/react.svg";
import "./App.css";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Details } from "./pages/Details";
import { NewAdvertisement } from "./pages/NewAdvertisement";
import Login from "./pages/Login";

function App() {
  const theme = extendTheme({
    colors: {
      brandGreen: {
        50: "#92C99D",
        100: "#84C290",
        200: "#76BC84",
        300: "#69B578",
        400: "#5BAE6C",
        500: "#50a260",
        600: "#4A9659",
        700: "#438951",
        800: "#3D7B49",
        900: "#366D41",
      },
      brandYellow: {
        50: "#FDD6AF",
        100: "#FCCC9C",
        200: "#FCC288",
        300: "#FBB874",
        400: "#FBAD60",
        500: "#FA9F42",
        600: "#FA9938",
        700: "#F98F24",
        800: "#F98510",
        900: "#EF7A06",
        1000: "#DB7006",
      },
    },

    components: {
      Button: {
        colorscheme: {
          brand: {
            bg: "brand.300",
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
        <Route path="/newadvertisement" element={<NewAdvertisement />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
