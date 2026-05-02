import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { placeOrder } from "../orderService";
import { clearCart } from "../cartService";
import { auth } from "../firebase";

export default function Payment() {

  const router = useRouter();

  const { total, address, phone, cart } = useLocalSearchParams();

  const userId = auth.currentUser?.uid;

  const handlePayment = async () => {

    try {
      const items = JSON.parse(cart as string);

      await placeOrder(
        userId || "",
        items,
        address as string,
        phone as string
      );

      await clearCart();

      alert("Payment Success & Order Placed");

      router.replace("/(tabs)");

    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>

      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        💳 Payment Page
      </Text>

      <Text>Total: ₹{total}</Text>

      <TouchableOpacity
        onPress={handlePayment}
        style={{
          backgroundColor: "black",
          padding: 15,
          marginTop: 20
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Pay Now
        </Text>
      </TouchableOpacity>

    </View>
  );
}