import { NavBar } from "@/components/narbar";
import PageTransition from "@/components/page-transition";
import styles from "./about.module.css";

export default function About() {
  return (
    <PageTransition>
      <NavBar current="About" />
      <div
        style={{
          marginTop: 100,
          width: "100%",
        }}
      >
        <div className={styles.textWrapper}>
          <header style={{ width: "90%" }}>
            <p>
              <span className={styles.spans}>I'm a design driven Software</span>
              <span className={styles.spans}>
                Developer with years of experience
              </span>
              <span className={styles.spans}>in building appealing web</span>
              <span className={styles.spans}>experiences</span>
            </p>
          </header>
        </div>
      </div>
    </PageTransition>
  );
}
