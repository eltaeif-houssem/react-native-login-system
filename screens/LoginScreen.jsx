import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../api/requests";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const ctx = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await login(email, password);
      ctx.authenticate(token);
    } catch (e) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later."
      );
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
