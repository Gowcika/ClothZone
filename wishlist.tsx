import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../wishlistService";

export default function Wishlist() {

  const userId = "demoUser";

  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const data = await getWishlist(userId);
    setWishlist(data);
  };

  const removeItem = async (index: number) => {
    await removeFromWishlist(userId, index);
    loadWishlist();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        ❤️ My Wishlist
      </Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            backgroundColor: "#fff",
            padding: 10,
            marginBottom: 10,
            borderRadius: 10
          }}>

            <Image
              source={{ uri: item.image }}
              style={{ height: 180, borderRadius: 10 }}
            />

            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: "green" }}>₹{item.price}</Text>

            {/* REMOVE BUTTON */}
            <TouchableOpacity
              onPress={() => removeItem(index)}
              style={{
                backgroundColor: "red",
                padding: 8,
                marginTop: 5,
                borderRadius: 5
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Remove ❌
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </View>
  );
}