"use client";
import { NavBar } from "@/components/narbar";
import PageTransition from "@/components/page-transition";
import styles from "./about.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { createNoise2D } from "simplex-noise";

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
      y: 50,
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
      viewport={{ once: true, margin: "-100px" }}
      key={text}
      className={styles.overflowHidden}
    >
      <motion.span variants={lineAnimation}>{text}</motion.span>
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

  const [circleArray, setCircleArray] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const noise2D = createNoise2D();

    for (let i = 0; i < 500; i++) {
      const n1 = noise2D(i * 0.003, i * 0.0033);
      const n2 = noise2D(i * 0.002, i * 0.001);

      setCircleArray((prev) => {
        return [
          ...prev,
          <div
            className={`${styles.circle} circle-ani`}
            style={{
              transform: `translate(${n2 * 200}px, ${i}px)  rotate(${
                n2 * 270
              }deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
              boxShadow: `0 0 0 .2px hsla(${Math.floor(
                i * 0.3
              )}, 70%, 70%, .6)`,
            }}
            key={`circle-${i}`}
          />,
        ];
      });
    }
  }, []);

  useLayoutEffect(() => {
    const circles = document.querySelectorAll(".circle-ani");

    let ctx = gsap.context(() => {
      const main = gsap.timeline({
        scrollTrigger: {
          scrub: 0.7,
          start: "top 10px",
          end: "bottom bottom",
        },
      });
      circles.forEach((circle) => {
        main.to(circle, {
          opacity: 1,
        });
      });
    });

    return () => ctx.revert();
  }, [circleArray]);

  return (
    <PageTransition>
      <NavBar current="About" />

      <main className={styles.pageWrapper}>
        <div className={`${styles.circleWrapper} wrapper`}>
          {circleArray.map((circle) => {
            return circle;
          })}
        </div>
        <div className={styles.textWrapper}>
          <header style={{ width: "90%" }}>
            <p>
              {mainParagraph.map((line, i) => {
                return (
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={i}
                    text={line}
                    key={`line-${line}`}
                  />
                );
              })}
            </p>

            <p className={styles.paragraphs}>
              {secondParagraph.map((line, i) => {
                return (
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={i + 6}
                    text={line}
                    key={`line-${line}`}
                  />
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
                <TextAnimation
                  hasScrolled={hasScrolled}
                  delayNumber={14}
                  text="Software Developer"
                />

                <TextAnimation
                  hasScrolled={hasScrolled}
                  delayNumber={15}
                  text="RareCircles"
                />

                <div className={styles.date}>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={16}
                    text="2022 - Present"
                  />
                </div>
              </li>
              <li>
                <TextAnimation
                  hasScrolled={hasScrolled}
                  delayNumber={17}
                  text="Junior Web Developer"
                />

                <TextAnimation
                  hasScrolled={hasScrolled}
                  delayNumber={18}
                  text="100devs"
                />

                <div className={styles.date}>
                  <TextAnimation
                    hasScrolled={hasScrolled}
                    delayNumber={19}
                    text="2022 - 2022"
                  />
                </div>
              </li>
              <li>
                <TextAnimation
                  hasScrolled={hasScrolled}
                  delayNumber={20}
                  text="Architect"
                />

                <TextAnimation
                  hasScrolled={hasScrolled}
                  delayNumber={21}
                  text="Gensler"
                />

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
