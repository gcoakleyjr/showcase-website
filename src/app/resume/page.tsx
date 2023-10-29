"use client";
import { NavBar } from "@/components/narbar";
import PageTransition from "@/components/page-transition";
import { useEffect, useState } from "react";

export default function Resume() {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <PageTransition>
      <NavBar current="Resume" />
      <iframe
        style={{ position: "absolute", top: 100 }}
        src="Giovanni_Coakley_Resume.pdf"
        width={windowWidth}
        height="1127"
      ></iframe>
    </PageTransition>
  );
}
