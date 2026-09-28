import Image from "next/image";
import styles from "../styles/navbar.module.css";
import coffeeLogo from "../assets/coffee-beans.png";
import shoppingBag from "../assets/bag.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={coffeeLogo} className={styles.logo} alt="coffee" />
          </Link>
        </div>
        <Link href="/">Coffee Shop</Link>
        <div className={styles.pageLinks}>
          <Link href="/">Home</Link>
          <Link href="/">Shop</Link>
          <Link href="/">About</Link>
          <Link href="/">
            <Image src={shoppingBag} className={styles.cart} alt="shopping cart"></Image>
          </Link>
        </div>
      </nav>
    </div>
  );
}
