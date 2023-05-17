import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const Initial_State = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(Initial_State);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Initial_State);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
