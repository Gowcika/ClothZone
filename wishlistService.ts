import AsyncStorage from "@react-native-async-storage/async-storage";

// ADD
export const addToWishlist = async (userId: string, item: any) => {
  const data = await AsyncStorage.getItem("wishlist");
  let list = data ? JSON.parse(data) : [];

  list.push(item);

  await AsyncStorage.setItem("wishlist", JSON.stringify(list));
};

// GET
export const getWishlist = async (userId: string) => {
  const data = await AsyncStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

// REMOVE
export const removeFromWishlist = async (userId: string, index: number) => {
  const data = await AsyncStorage.getItem("wishlist");
  let list = data ? JSON.parse(data) : [];

  list.splice(index, 1);

  await AsyncStorage.setItem("wishlist", JSON.stringify(list));
};