import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Details } from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import UserService from "./services/UserService";
import { PrivateRoute } from "./routes/PrivateRoute";
import { NewAdvertisement } from "./pages/NewAdvertisement";
import { User } from "./models/user";
import { AuthVerify } from "./services/auth/AuthVerify";

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

  const [user, setUser] = useState<User | undefined>(undefined);

  const logout = () => {
    UserService.logout();
    setUser(undefined);
  };

  useEffect(() => {
    const user = UserService.getCurrentUser();
    setUser(user);
  }, [logout]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar logout={logout} user={user}></Navbar>
      <Routes>
        <Route
          path="/newadvertisement"
          element={<PrivateRoute isLoggedIn={!!user} />}
        >
          <Route path="/newadvertisement" element={<NewAdvertisement />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
      <AuthVerify logout={logout} />
    </ChakraProvider>
  );
}

export default App;
