import styles from "./navbar.module.css";

export function NavBar() {
  return (
    <nav className={styles.nav}>
      <span>Work</span>
      <span>About</span>
    </nav>
  );
}
