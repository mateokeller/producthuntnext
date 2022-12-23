import React, { useContext } from "react";
import Link from "next/link";
import { FirebaseContext } from "../../firebase";

const Navigation = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/populars">Populares</Link>
      {user ? <Link href="/newProduct">Nuevo producto</Link> : null}
    </nav>
  );
};

export default Navigation;
