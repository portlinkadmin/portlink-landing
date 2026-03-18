"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DashboardMockupMobile from "@/components/DashboardMockupMobile";
import DashboardMockupMobileAgent from "@/components/DashboardMockupMobileAgent";
import DashboardMockupMobileTour from "@/components/DashboardMockupMobileTour";

// ── Device constants ──────────────────────────────────────────────────────────
//
// Phone: 9:19.5 — industry standard (matches iPhone 14/15, Pixel 8, Galaxy S24)
//   width / height = 9 / 19.5  →  height = width * (19.5 / 9)
//
// Tablet: 4:3 landscape (iPad standard) — wider than it is tall
//   width / height = 4 / 3  →  height = width * (3 / 4)
//
// These ratios are enforced with paddingBottom trick so they never deform.

const PHONE_ASPECT  = 19.5 / 9;   // height = width * this
const TABLET_ASPECT = 3 / 4;      // height = width * this  (landscape 4:3)

const BEZEL_COLOR = "#5a5a5a";
const BEZEL_BG    = "#1a1a1a";
const SHADOW      = "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a";

// ── Aspect-ratio box ──────────────────────────────────────────────────────────
// paddingBottom = (h/w)*100% locks the intrinsic aspect ratio.
// The inner div is absolutely positioned to fill it.
function AspectBox({ ratio, children, borderRadius }: {
  ratio: number
  children: React.ReactNode
  borderRadius: number
}) {
  return (
    <div style={{ position: "relative", paddingBottom: `${ratio * 100}%`, width: "100%" }}>
      <div style={{
        position: "absolute", inset: 0,
        overflow: "hidden",
        borderRadius,
      }}>
        {children}
      </div>
    </div>
  )
}

// ── ContainerScroll ───────────────────────────────────────────────────────────
export const ContainerScroll = ({
  titleComponent,
  children,
  role = 'cruise',
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  role?: 'cruise' | 'agent' | 'tour';
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

  // Phone bezel padding (top earpiece + bottom indicator)
  const phonePad = 5;    // px — inner padding inside bezel frame
  const phoneBorder = 4; // px
  const tabletPad = 7;
  const tabletBorder = 5;

  return (
    <div
      ref={containerRef}
      style={{
        // Container height drives how long the scroll animation lasts
        height: isMobile ? "44rem" : "64rem",
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

        {/* ── Devices row ── */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            transformOrigin: "center top",
            maxWidth: "64rem",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",   // bottom-align so phone sits alongside tablet
            justifyContent: "center",
            gap: isMobile ? "12px" : "28px",
          }}
        >
          {/* ── TABLET — landscape 4:3 ── */}
          <div style={{
            // Tablet takes ~70% of available width, phone takes ~25%
            flex: "0 0 68%",
            minWidth: 0,
          }}>
            <div style={{
              border: `${tabletBorder}px solid ${BEZEL_COLOR}`,
              padding: `${tabletPad}px`,
              backgroundColor: BEZEL_BG,
              borderRadius: "20px",
              boxShadow: SHADOW,
            }}>
              {/* Front camera dot — centred on top edge */}
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#3a3a3a", margin: "0 auto 4px",
              }} />
              {/* Screen — locked to 4:3 landscape */}
              <AspectBox ratio={TABLET_ASPECT} borderRadius={12}>
                {children}
              </AspectBox>
              {/* Home-bar indicator */}
              <div style={{
                width: 36, height: 3, borderRadius: 9999,
                background: "#3a3a3a", margin: "4px auto 0",
              }} />
            </div>
            <p style={{
              textAlign: "center", marginTop: 8,
              fontSize: 11, color: "var(--ds-text-3)",
              fontWeight: 500, letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>Tablet</p>
          </div>

          {/* ── PHONE — portrait 9:19.5 ── */}
          <div style={{
            flex: "0 0 24%",
            minWidth: 0,
            alignSelf: "flex-end",
          }}>
            <div style={{
              border: `${phoneBorder}px solid ${BEZEL_COLOR}`,
              padding: `${phonePad}px`,
              backgroundColor: BEZEL_BG,
              borderRadius: "28px",
              boxShadow: SHADOW,
            }}>
              {/* Earpiece pill */}
              <div style={{
                width: 28, height: 4, borderRadius: 9999,
                background: "#3a3a3a", margin: "3px auto 4px",
              }} />
              {/* Screen — locked to 9:19.5 portrait */}
              <AspectBox ratio={PHONE_ASPECT} borderRadius={18}>
                {role === 'agent' ? <DashboardMockupMobileAgent /> : role === 'tour' ? <DashboardMockupMobileTour /> : <DashboardMockupMobile />}
              </AspectBox>
              {/* Home indicator */}
              <div style={{
                width: 32, height: 4, borderRadius: 9999,
                background: "#3a3a3a", margin: "4px auto 2px",
              }} />
            </div>
            <p style={{
              textAlign: "center", marginTop: 8,
              fontSize: 11, color: "var(--ds-text-3)",
              fontWeight: 500, letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>Mobile</p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
