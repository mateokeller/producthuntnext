import app from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.lenght) {
      const app = initializeApp(firebaseConfig);
      this.auth = getAuth();
    }
  }

  // registra a un usuario
  async register(name, email, password) {
    const newUser = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    //   Actualiza el usuario creado, añadiendo el nombre del usuario
    return await updateProfile(newUser.user, {
      displayName: name,
    });
  }
}

const firebase = new Firebase();

export default firebase;
