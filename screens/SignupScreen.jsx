import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../api/requests";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
function SignupScreen() {
  const ctx = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const signupHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      ctx.authenticate(token);
    } catch (e) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your credentials or try again later!"
      );
    }
    setLoading(false);
  };

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
