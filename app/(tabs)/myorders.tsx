import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";

import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function MyOrders() {

  const [orders, setOrders] = useState<any[]>([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {

    if (!userId) return;

    const ref = doc(db, "orders", userId);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setOrders(snap.data().orders || []);
      }
    });

    return () => unsub();

  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>

      <Text style={styles.title}>📦 My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text>💰 Total: ₹{item.total}</Text>
            <Text>📅 {item.createdAt}</Text>

            {/* 🔥 STATUS */}
            <Text
              style={{
                marginTop: 5,
                fontWeight: "bold",
                color:
                  item.status === "Pending"
                    ? "orange"
                    : item.status === "Shipped"
                    ? "blue"
                    : "green"
              }}
            >
              🚚 {item.status}
            </Text>

            {/* ITEMS */}
            {item.items?.map((i: any, idx: number) => (
              <Text key={idx}>
                • {i.name} - ₹{i.price}
              </Text>
            ))}

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  card: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 10
  }
});