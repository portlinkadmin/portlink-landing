"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Animation runs from when top hits bottom of viewport to when bottom hits top
    // This gives maximum scroll duration
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Tilt runs from 0→1 progress, but only uses first 55% of scroll range
  // So animation completes slowly as you scroll through the section
  const rotate = useTransform(scrollYProgress, [0, 0.55], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 0.72 : 1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.55], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 1]);

  return (
    // Tall container = long scroll distance = slower-feeling animation
    <div
      ref={containerRef}
      style={{
        height: isMobile ? "44rem" : "62rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: isMobile ? "8px" : "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          perspective: "1000px",
        }}
      >
        {/* Title — translates up as you scroll */}
        <motion.div
          style={{
            translateY: translate,
            maxWidth: "64rem",
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          {titleComponent}
        </motion.div>

        {/* Tablet frame */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            transformOrigin: "center top",
            // Bezel — inline to avoid Tailwind purge
            maxWidth: "64rem",
            margin: "0 auto",
            border: "4px solid #6C6C6C",
            padding: "8px",
            backgroundColor: "#222222",
            borderRadius: "30px",
            boxShadow:
              "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
        >
          <div
            style={{
              height: isMobile ? "20rem" : "32rem",
              width: "100%",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
