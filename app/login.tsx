import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "expo-router";

export default function Login() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);

      if (email === "admin@gmail.com") {
        router.replace("/admin");
      } else {
        router.replace("/(tabs)");
      }

    } catch (err: any) {
      Alert.alert("Login Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>

      {/* APP TITLE */}
      <Text style={styles.title}>ClothZone 👗</Text>

      {/* SUB TITLE */}
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Enter Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={styles.input}
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      {/* SIGNUP LINK */}
      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "gray"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },
  loginBtn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  signupText: {
    color: "blue",
    fontWeight: "bold"
  }
});