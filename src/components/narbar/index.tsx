import Link from "next/link";
import styles from "./navbar.module.css";

type Props = {
  current: "Work" | "About" | "Resume";
};

export function NavBar({ current }: Props) {
  return (
    <nav className={styles.nav}>
      <Link href="/" style={{ opacity: current === "Work" ? 1 : 0.7 }}>
        Work
      </Link>
      <Link href="/about" style={{ opacity: current === "About" ? 1 : 0.7 }}>
        About
      </Link>
      <Link href="/resume" style={{ opacity: current === "Resume" ? 1 : 0.7 }}>
        Resume
      </Link>
    </nav>
  );
}
