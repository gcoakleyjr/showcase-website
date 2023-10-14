"use client";
import { NavBar } from "@/components/narbar";
import PageTransition from "@/components/page-transition";
import styles from "./about.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function TextAnimation({
  text,
  delayNumber,
  hasScrolled,
}: {
  text: string;
  delayNumber: number;
  hasScrolled: boolean;
}) {
  const lineAnimation = {
    hidden: {
      opacity: 0,
      scale: 1.01,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: !hasScrolled ? delayNumber * 0.07 : 0,
      },
    },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8, margin: "-100px" }}
      key={text}
      variants={lineAnimation}
    >
      {text}
    </motion.span>
  );
}

export default function About() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!hasScrolled) {
        setHasScrolled(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const mainParagraph = [
    `I'm a design driven Software`,
    "Developer with years of experience",
    "in building appealing web",
    "experiences. I specialize in",
    "visual design with a strong focus",
    "on interaction.",
  ];

  const secondParagraph = [
    `When I'm not basking in the`,
    "glow of my computer screen,",
    "you can find me destroying the",
    "competition in table tennis, purchasing",
    "more plants for my jungle of an",
    "apartment and slowly forgetting all",
    "the songs I know on the guitar.",
  ];

  return (
    <PageTransition>
      <NavBar current="About" />
      <main className={styles.pageWrapper}>
        <div className={styles.textWrapper}>
          <header style={{ width: "90%" }}>
            <p>
              {mainParagraph.map((line, i) => {
                return (
                  <span key={`line-${line}`}>
                    <TextAnimation
                      hasScrolled={hasScrolled}
                      delayNumber={i}
                      text={line}
                    />
                  </span>
                );
              })}
            </p>

            <p className={styles.paragraphs}>
              {secondParagraph.map((line, i) => {
                return (
                  <span key={`line-${line}`}>
                    <TextAnimation
                      hasScrolled={hasScrolled}
                      delayNumber={i + 6}
                      text={line}
                    />
                  </span>
                );
              })}
            </p>
          </header>

          <section className={styles.experience}>
            <h3>
              <TextAnimation
                hasScrolled={hasScrolled}
                delayNumber={13}
                text="Work Experience"
              />
            </h3>
            <ul>
              <li>
                <div>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={14}
                    text="Software Developer"
                  />
                </div>
                <div>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={15}
                    text="RareCircles"
                  />
                </div>
                <div className={styles.date}>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={16}
                    text="2022 - Present"
                  />
                </div>
              </li>
              <li>
                <div>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={17}
                    text="Junior Web Developer"
                  />
                </div>
                <div>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={18}
                    text="100devs"
                  />
                </div>
                <div className={styles.date}>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={19}
                    text="2022 - 2022"
                  />
                </div>
              </li>
              <li>
                <div>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={20}
                    text="Architect"
                  />
                </div>
                <div>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={21}
                    text="Gensler"
                  />
                </div>
                <div className={styles.date}>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={22}
                    text="2018 - 2022"
                  />
                </div>
              </li>
            </ul>
          </section>

          <section className={styles.contact}>
            <h3>
              <TextAnimation
                hasScrolled={hasScrolled}
                delayNumber={23}
                text="Get In Touch"
              />
            </h3>
            <ul>
              <li>
                <a target="_blank" href="mailto:gcoakley.jr@gmail.com">
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={24}
                    text="Email"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/giovanni-p-coakley/"
                >
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={25}
                    text="Linkedin"
                  />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://github.com/gcoakleyjr">
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={26}
                    text="Github"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com/giovanni_pcjr/"
                >
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={27}
                    text="Instagram"
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
