import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useEffect, useState } from "react";
import { addToCart } from "../../cartService";
import { addToWishlist } from "../../wishlistService";

// 🔥 FIREBASE REALTIME
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function Home() {

  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  const categories = ["All", "Saree", "Kurti", "Shirt", "Tshirt"];

  useEffect(() => {

    // 🔥 REALTIME LISTENER
    const unsubscribe = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(data);
    });

    return () => unsubscribe();

  }, []);

  // FILTER
  const filtered =
    category === "All"
      ? products
      : products.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      {/* CATEGORY */}
      <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCategory(item)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                marginRight: 10,
                backgroundColor: category === item ? "#000" : "#eee",
                borderRadius: 25
              }}
            >
              <Text
                style={{
                  color: category === item ? "#fff" : "#000",
                  fontWeight: "600"
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PRODUCTS */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => {
          const stock = item.stock ?? 0;

          return (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginBottom: 15,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#eee"
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: 200, borderRadius: 10 }}
              />

              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 5 }}>
                {item.name}
              </Text>

              <Text style={{ color: "green" }}>
                ₹{item.price}
              </Text>

              {/* 🔥 LIVE STOCK */}
              <Text style={{ color: "orange" }}>
                Stock: {stock}
              </Text>

              <TouchableOpacity
                disabled={stock === 0}
                onPress={() => addToCart(item)}
                style={{
                  backgroundColor: stock === 0 ? "gray" : "black",
                  padding: 10,
                  marginTop: 8,
                  borderRadius: 8
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  {stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => addToWishlist("user", item)}
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  marginTop: 5,
                  borderRadius: 8
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  ❤️ Wishlist
                </Text>
              </TouchableOpacity>

            </View>
          );
        }}
      />

    </View>
  );
}