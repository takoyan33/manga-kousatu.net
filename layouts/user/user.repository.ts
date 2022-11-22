import {
  collection,
  deconsteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database, auth } from "../../firebaseConfig";
import { User } from ".";

export const userRepository = {
  async find(): Promise<User[]> {
    const usersCol = collection(database, "users");
    const res = await getDocs(usersCol);
    const allUsers = res.docs.map((doc) => doc.data() as User);
    return allUsers;
  },

  async findOne(uid: string): Promise<User> {
    const userRef = doc(database, `users/${uid}`);
    const res = await getDoc(userRef);
    const oneUser = res.data() as User;
    return oneUser;
  },

  async update(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(database, "users", uid);

    await updateDoc(userRef, data);
  },

  async deconste(uid: string): Promise<void> {
    const userRef = doc(database, "users", uid);

    await deconsteDoc(userRef);
  },
};
