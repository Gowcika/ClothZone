<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";

// GET CART
export const getCart = async () => {
  const data = await AsyncStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

// ADD CART
export const addToCart = async (item: any) => {
  const data = await AsyncStorage.getItem("cart");
  const cart = data ? JSON.parse(data) : [];

  cart.push(item);

  await AsyncStorage.setItem("cart", JSON.stringify(cart));
};

// REMOVE ITEM
export const removeFromCart = async (index: number) => {
  const data = await AsyncStorage.getItem("cart");
  const cart = data ? JSON.parse(data) : [];

  cart.splice(index, 1);

  await AsyncStorage.setItem("cart", JSON.stringify(cart));
};

// CLEAR CART (AFTER ORDER)
export const clearCart = async () => {
  await AsyncStorage.removeItem("cart");
=======
import AsyncStorage from "@react-native-async-storage/async-storage";

// GET CART
export const getCart = async () => {
  const data = await AsyncStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

// ADD CART
export const addToCart = async (item: any) => {
  const data = await AsyncStorage.getItem("cart");
  const cart = data ? JSON.parse(data) : [];

  cart.push(item);

  await AsyncStorage.setItem("cart", JSON.stringify(cart));
};

// REMOVE ITEM
export const removeFromCart = async (index: number) => {
  const data = await AsyncStorage.getItem("cart");
  const cart = data ? JSON.parse(data) : [];

  cart.splice(index, 1);

  await AsyncStorage.setItem("cart", JSON.stringify(cart));
};

// CLEAR CART (AFTER ORDER)
export const clearCart = async () => {
  await AsyncStorage.removeItem("cart");
>>>>>>> 230ab1be5fd769b5b3a955bafcca7f541c9a67f1
};