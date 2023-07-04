import styles from "./navbar.module.css";

type Props = {
  current: "Work" | "About";
};

export function NavBar({ current }: Props) {
  return (
    <nav className={styles.nav}>
      <span style={{ opacity: current === "Work" ? 1 : 0.7 }}>Work</span>
      <span style={{ opacity: current === "About" ? 1 : 0.7 }}>About</span>
    </nav>
  );
}
