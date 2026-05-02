import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";

// GET PRODUCTS
export const getProducts = async () => {
  const snap = await getDocs(collection(db, "products"));

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
};

// ADD PRODUCT
export const addProduct = async (product: any) => {
  await addDoc(collection(db, "products"), product);
};

// 🔥 REDUCE STOCK
export const reduceStock = async (item: any) => {
  try {
    const ref = doc(db, "products", item.id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const currentStock = snap.data().stock ?? 0;

      if (currentStock > 0) {
        await updateDoc(ref, {
          stock: currentStock - 1
        });
      }
    }
  } catch (err) {
    console.log("Stock update error:", err);
  }
};