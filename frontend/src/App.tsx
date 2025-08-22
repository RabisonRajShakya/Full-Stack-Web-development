import { Route, Routes } from "react-router-dom";
import "./App.css";
// import MyInformation from './MyInfromation';
// import RegisterForm from './RegisterForm';
import HomePage from "./Pages/HomePage";
import AboutUsPage from "./Pages/AboutUsPage";
import Navbar from "./Components/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import CreateQuestionSetPage from "./Pages/QuestionSet/CreateQuestionSetPage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./Pages/LoginPage";
import { jwtDecode } from "jwt-decode";
import ListQuestionSetPage from "./Pages/QuestionSet/ListQuestionSetPage";
import AttemptQuizPage from "./Pages/QuestionSet/AttemptQuestionSetPage";
import ProfilePage from "./Pages/ProfilePage";
import FooterPage from "./Pages/FooterPage";
// import ChatbotPage from "./Pages/ChatbotPage";

export interface IAuthState {
  isAuth: boolean;
  role: "admin" | "professionals" | "guest";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JwtDecode {
  id: string;
  role: "admin" | "professionals" ;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  role: "guest",
  setAuthState: () => { },
});

function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    role: "guest",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log("auth => ", authState);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }
    async function fetchData() {
      const { role }: JwtDecode = jwtDecode(accessToken);
      console.log("role => ", role);
      setAuthState((prev) => ({
        ...prev,
        isAuth: true,
        role,
      }));
      setIsLoading(false);
      axios
        .get("http://localhost:3000/api/verify/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const { role }: JwtDecode = jwtDecode(accessToken as string);
          setAuthState((prev) => ({
            ...prev,
            isAuth: true,
            role,
          }));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
      // localStorage.clear();
    }

    fetchData();
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth: authState.isAuth,
          role: authState.role,
          setAuthState: setAuthState,
        }}
      >
        <Navbar />
        <Routes>
          {/* unauth */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {authState?.role === "guest" && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}
          {/* auth routes */}
          {authState?.isAuth && (
            <>
            <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/questionset/list"
                element={<ListQuestionSetPage />}
              />
              <Route
                path="/questionset/:id/attempt"
                element={<AttemptQuizPage />}
              />
            </>
          )}


          {/* admin routes */}
          {authState?.role === "admin" && (
            <>
              <Route
                path="/admin/questionset/create"
                element={<CreateQuestionSetPage />}
              />
            </>
          )}
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </AuthContext.Provider>
      <FooterPage />
      {/* <ChatbotPage /> */}
    </>
  );
}

export default App;
