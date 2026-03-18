"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DashboardMockupMobile from "@/components/DashboardMockupMobile";

// Generic bezel styles — no brand identity, just a device outline
const BEZEL_COLOR = "#5a5a5a";
const BEZEL_BG    = "#1a1a1a";
const SHADOW      = "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a";

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
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate    = useTransform(scrollYProgress, [0, 0.55], [18, 0]);
  const scale     = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 0.72 : 0.96, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.55], [0, -30]);
  const opacity   = useTransform(scrollYProgress, [0, 0.15], [0.5, 1]);

  return (
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
      <div style={{ width: "100%", position: "relative", perspective: "1200px" }}>
        {/* Title */}
        <motion.div
          style={{
            translateY: translate,
            maxWidth: "64rem",
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          {titleComponent}
        </motion.div>

        {/* Devices row */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            transformOrigin: "center top",
            maxWidth: "64rem",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: isMobile ? "16px" : "24px",
          }}
        >
          {/* ── TABLET (left) ── */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <div style={{
              border: `5px solid ${BEZEL_COLOR}`,
              padding: "7px",
              backgroundColor: BEZEL_BG,
              borderRadius: "24px",
              boxShadow: SHADOW,
            }}>
              {/* Camera dot */}
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#333", margin: "0 auto 5px",
              }} />
              <div style={{
                height: isMobile ? "18rem" : "28rem",
                overflow: "hidden",
                borderRadius: "14px",
              }}>
                {children}
              </div>
              {/* Home button bar */}
              <div style={{
                width: 40, height: 4, borderRadius: 9999,
                background: "#444", margin: "5px auto 0",
              }} />
            </div>
            <p style={{
              textAlign: "center", marginTop: 10,
              fontSize: 11, color: "var(--ds-text-3)",
              fontWeight: 500, letterSpacing: "0.04em",
            }}>Tablet</p>
          </div>

          {/* ── PHONE (right) ── */}
          <div style={{
            flexShrink: 0,
            width: isMobile ? "120px" : "180px",
            // Align bottom of phone with bottom of tablet
            alignSelf: "flex-end",
          }}>
            <div style={{
              border: `4px solid ${BEZEL_COLOR}`,
              padding: "5px",
              backgroundColor: BEZEL_BG,
              borderRadius: "28px",
              boxShadow: SHADOW,
            }}>
              {/* Earpiece */}
              <div style={{
                width: 28, height: 4, borderRadius: 9999,
                background: "#333", margin: "4px auto 5px",
              }} />
              <div style={{
                height: isMobile ? "22rem" : "34rem",
                overflow: "hidden",
                borderRadius: "20px",
              }}>
                <DashboardMockupMobile />
              </div>
              {/* Home indicator */}
              <div style={{
                width: 36, height: 4, borderRadius: 9999,
                background: "#444", margin: "5px auto 2px",
              }} />
            </div>
            <p style={{
              textAlign: "center", marginTop: 10,
              fontSize: 11, color: "var(--ds-text-3)",
              fontWeight: 500, letterSpacing: "0.04em",
            }}>Mobile</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
