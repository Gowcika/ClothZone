import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  clearCart
} from "../../cartService";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";

export default function Cart() {

  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    loadCart();
  }, []);

  // 🟢 LOAD CART
  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  // ❌ REMOVE ITEM
  const removeItem = async (index: number) => {
    await removeFromCart(index);
    loadCart();
  };

  // 💰 TOTAL
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  };

  // 🛒 GO TO PAYMENT
  const orderNow = async () => {

    if (cart.length === 0) {
      alert("Cart empty");
      return;
    }

    if (!address || !phone) {
      alert("Enter address & phone");
      return;
    }

    const total = getTotal();

    // 👉 go to payment page with details
    router.push({
      pathname: "/payment",
      params: {
        total: total,
        address: address,
        phone: phone,
        cart: JSON.stringify(cart)
      }
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🛒 My Cart</Text>

      {/* 🟢 CART LIST */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>

            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>

            <TouchableOpacity
              onPress={() => removeItem(index)}
              style={styles.removeBtn}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Remove
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

      {/* 🏠 ADDRESS */}
      <TextInput
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      {/* 📞 PHONE */}
      <TextInput
        placeholder="Enter Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* 💰 TOTAL */}
      <Text style={styles.total}>
        Total: ₹{getTotal()}
      </Text>

      {/* 🛒 ORDER BUTTON */}
      <TouchableOpacity
        onPress={orderNow}
        style={styles.orderBtn}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Continue to Payment
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  image: {
    height: 180,
    borderRadius: 10
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  },
  price: {
    color: "green"
  },
  removeBtn: {
    backgroundColor: "red",
    padding: 10,
    marginTop: 5,
    borderRadius: 8
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right"
  },
  orderBtn: {
    backgroundColor: "black",
    padding: 15,
    marginTop: 10,
    borderRadius: 10
  }
});