import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      // USER EMAIL
      setEmail(auth.currentUser?.email || "");

      // ORDERS
      const snap = await getDoc(doc(db, "orders", userId || ""));

      if (snap.exists()) {
        setOrders(snap.data()?.orders || []);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>

      {/* EMAIL */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        👤 {email}
      </Text>

      {/* ORDERS */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        🧾 My Orders
      </Text>

      {orders.length === 0 ? (
        <Text style={{ marginTop: 10, color: "gray" }}>
          No orders yet
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: "#fff",
              padding: 10,
              marginTop: 10,
              borderRadius: 10
            }}>

              <Text>Order Items: {item.items?.length}</Text>
              <Text>📅 {item.createdAt}</Text>

            </View>
          )}
        />
      )}

      {/* LOGOUT */}
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "red",
          padding: 15,
          marginTop: 20,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          🚪 Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
}