import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, FlatList, Image, Alert, ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection, addDoc, onSnapshot,
  deleteDoc, doc, updateDoc, getDoc
} from "firebase/firestore";

export default function Admin() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Saree");
  const [stock, setStock] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stockInputs, setStockInputs] = useState<any>({});

  // 🔥 PRODUCTS REALTIME
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(
        snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, []);

  // 🔥 ORDERS REALTIME
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      setOrders(
        snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, []);

  // ➕ ADD PRODUCT
  const addProduct = async () => {
    if (!name || !price || !image || !stock) {
      Alert.alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      image,
      category,
      stock: Number(stock)
    });

    Alert.alert("Product Added");
    setName(""); setPrice(""); setImage(""); setStock("");
  };

  // ❌ DELETE
  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
  };

  // 🔄 UPDATE STOCK
  const updateStock = async (id: string) => {
    const val = stockInputs[id];
    if (!val) return;

    await updateDoc(doc(db, "products", id), {
      stock: Number(val)
    });

    Alert.alert("Stock Updated");
    setStockInputs({ ...stockInputs, [id]: "" });
  };

  // 🚚 UPDATE ORDER STATUS
  const updateStatus = async (
    userId: string,
    index: number,
    status: string
  ) => {
    const ref = doc(db, "orders", userId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();
    const updated = data.orders;

    updated[index].status = status;

    await updateDoc(ref, { orders: updated });

    Alert.alert("Status Updated");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>

      <Text style={styles.title}>🛠 Admin Panel</Text>

      {/* ADD PRODUCT */}
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input}/>
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input}/>
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input}/>
      <TextInput placeholder="Stock" value={stock} onChangeText={setStock} style={styles.input}/>
      <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={styles.input}/>

      <TouchableOpacity style={styles.btn} onPress={addProduct}>
        <Text style={styles.txt}>Add Product</Text>
      </TouchableOpacity>

      {/* PRODUCTS */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image source={{ uri: item.image }} style={{ height: 120 }} />

            <Text>{item.name}</Text>
            <Text>₹{item.price}</Text>
            <Text>Stock: {item.stock}</Text>

            <TextInput
              placeholder="Update Stock"
              value={stockInputs[item.id]}
              onChangeText={(t) =>
                setStockInputs({ ...stockInputs, [item.id]: t })
              }
              style={styles.input}
            />

            <TouchableOpacity style={styles.green} onPress={() => updateStock(item.id)}>
              <Text style={styles.txt}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.red} onPress={() => deleteProduct(item.id)}>
              <Text style={styles.txt}>Delete</Text>
            </TouchableOpacity>

          </View>
        )}
      />

      {/* ORDERS */}
      <Text style={{ fontSize: 20, marginTop: 20 }}>Orders</Text>

      {orders.map((userOrder, index) => (
        <View key={index} style={styles.card}>

          {userOrder.orders?.map((o: any, i: number) => (
            <View key={i} style={{ marginTop: 10 }}>

              <Text>👤 {o.email}</Text>
              <Text>📞 {o.phone}</Text>
              <Text>🏠 {o.address}</Text>
              <Text>💰 ₹{o.total}</Text>

              <Text>🚚 Status: {o.status}</Text>

              <TouchableOpacity
                style={styles.orange}
                onPress={() => updateStatus(userOrder.id, i, "Shipped")}
              >
                <Text style={styles.txt}>Accept (Shipped)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.green}
                onPress={() => updateStatus(userOrder.id, i, "Dispatched")}
              >
                <Text style={styles.txt}>Delivered</Text>
              </TouchableOpacity>

            </View>
          ))}

        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 8, marginTop: 5 },
  btn: { backgroundColor: "black", padding: 10, marginTop: 10 },
  card: { borderWidth: 1, padding: 10, marginTop: 10 },
  green: { backgroundColor: "green", padding: 8, marginTop: 5 },
  red: { backgroundColor: "red", padding: 8, marginTop: 5 },
  orange: { backgroundColor: "orange", padding: 8, marginTop: 5 },
  txt: { color: "#fff", textAlign: "center" }
});