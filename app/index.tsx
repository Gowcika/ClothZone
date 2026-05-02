import { View, Text, Image } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 🔥 Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      />

      {/* 🔹 Loading text */}
      <Text>Loading...</Text>
    </View>
  );
}