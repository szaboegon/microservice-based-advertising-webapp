import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Home } from "./components/pages/Home";
import { Search } from "./components/pages/Search";
import Details from "./components/pages/Details";
import { Login } from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useEffect, useState } from "react";
import UserService from "./services/UserService";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { NewAdvertisement } from "./components/pages/NewAdvertisement";
import { User } from "./models/user";
import { AuthVerify } from "./services/auth/AuthVerify";
import Profile from "./components/pages/Profile";
import Messages from "./components/pages/Messages";

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
  const [loaded, setLoaded] = useState(false);

  const logout = () => {
    UserService.logout();
    setUser(undefined);
  };

  useEffect(() => {
    const user = UserService.getCurrentUser();
    setUser(user);
    setLoaded(true);
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
        <Route path="/profile" element={<PrivateRoute isLoggedIn={!!user} />}>
          {user && <Route path="/profile" element={<Profile user={user} />} />}
        </Route>
        <Route path="/messages" element={<PrivateRoute isLoggedIn={!!user} />}>
          {user && (
            <Route path="/messages" element={<Messages user={user} />} />
          )}
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/details/:id" element={<Details isLoggedIn={!!user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
      <AuthVerify logout={logout} />
    </ChakraProvider>
  );
}

export default App;
