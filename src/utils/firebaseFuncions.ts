import { db } from "@/connections/firebaseApp";
import { collection, getDocs, query, where, type WhereFilterOp } from "firebase/firestore";

export async function getDocumentsByField(
  field: string,
  value: string,
  condition: WhereFilterOp = "=="
) {
  const q = query(
    collection(db, "menus"),
    where(field, condition, value),
  );

  const snap = await getDocs(q);
  if (snap.empty) return [];

  return snap.docs;
}
