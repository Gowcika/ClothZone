import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

import { db, auth } from "./firebase";

export const placeOrder = async (
  userId: string,
  items: any[],
  address: string,
  phone: string
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const ref = doc(db, "orders", userId);
    const snap = await getDoc(ref);

    const total = items.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );

    const order = {
      email: user.email,
      address,
      phone,
      items,
      total,
      status: "Pending", // 🔥 INITIAL STATUS
      createdAt: new Date().toISOString()
    };

    if (snap.exists()) {
      await updateDoc(ref, {
        orders: arrayUnion(order)
      });
    } else {
      await setDoc(ref, {
        orders: [order]
      });
    }

    // 🔥 STOCK REDUCE
    for (let item of items) {
      const productRef = doc(db, "products", item.id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock || 0;

        await updateDoc(productRef, {
          stock: currentStock - 1
        });
      }
    }

    console.log("✅ Order placed");

  } catch (err) {
    console.log("❌ ORDER ERROR:", err);
  }
};