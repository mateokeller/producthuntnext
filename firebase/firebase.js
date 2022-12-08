import app from "firebase/compat/app";
import { initializeApp } from "firebase/app";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.lenght) {
      const app = initializeApp(firebaseConfig);
    }
  }
}

const firebase = new Firebase();

export default firebase;
