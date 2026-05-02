import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "expo-router";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const signup = async () => {
    try {
      // 🚫 ADMIN BLOCK
      if (email === "admin@gmail.com") {
        Alert.alert("Admin already exists");
        return;
      }

      // ✅ CREATE USER
      await createUserWithEmailAndPassword(auth, email, pass);

      Alert.alert("Signup Success");

      router.replace("/login");

    } catch (err: any) {
      Alert.alert("Signup Failed", err.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>ClothZone 👗</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={styles.input}
      />

      {/* ✅ IMPORTANT: onPress={signup} மட்டும் */}
      <TouchableOpacity style={styles.btn} onPress={signup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.link}>Login</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 25,
    color: "gray"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },
  btn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10
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
  link: {
    color: "blue",
    fontWeight: "bold"
  }
});