"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DashboardMockupMobile from "@/components/DashboardMockupMobile";
import DashboardMockupMobileAgent from "@/components/DashboardMockupMobileAgent";
import DashboardMockupMobileTour from "@/components/DashboardMockupMobileTour";

// ── Device constants ──────────────────────────────────────────────────────────
//
// Phone: 9:19.5 — industry standard (matches iPhone 14/15, Pixel 8, Galaxy S24)
// Tablet: 4:3 landscape (iPad standard) — always wider than tall
//
// The ScaledScreen trick:
//   Dashboard renders at a fixed LOGICAL size (e.g. 1200×900 for tablet),
//   then a CSS transform: scale() shrinks it to fit the bezel pixel-perfectly.
//   This means all px font sizes, spacing, etc. stay proportionally correct
//   at every viewport width — no microscopic text at small sizes.

const PHONE_ASPECT  = 19.5 / 9;   // height = width * this  (portrait)
const TABLET_ASPECT = 3 / 4;      // height = width * this  (landscape 4:3)

// Logical render dimensions — dashboard is designed for these sizes
const TABLET_LOGICAL_W = 1200;
const TABLET_LOGICAL_H = 900;
const PHONE_LOGICAL_W  = 280;   // mobile dashboards designed for ~280px natural width
const PHONE_LOGICAL_H  = 607;   // maintains 9:19.5 ratio (280 * 19.5/9 ≈ 607)

const BEZEL_COLOR = "#5a5a5a";
const BEZEL_BG    = "#1a1a1a";
const SHADOW      = "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a";

// ── ScaledScreen ─────────────────────────────────────────────────────────────
// Renders children at logicalW × logicalH then CSS-scales to fit the container.
// ResizeObserver recalculates scale whenever the bezel changes size.
function ScaledScreen({
  logicalW, logicalH, borderRadius, children
}: {
  logicalW: number
  logicalH: number
  borderRadius: number
  children: React.ReactNode
}) {
  const outerRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const recalc = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      if (!w || !h) return
      setScale(Math.min(w / logicalW, h / logicalH))
    }
    recalc()
    const ro = new ResizeObserver(recalc)
    ro.observe(el)
    return () => ro.disconnect()
  }, [logicalW, logicalH])

  return (
    <div
      ref={outerRef}
      style={{
        position: "relative",
        width: "100%",
        // Enforce aspect ratio via padding-bottom trick
        paddingBottom: `${(logicalH / logicalW) * 100}%`,
        overflow: "hidden",
        borderRadius,
        background: BEZEL_BG,
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius }}>
        <div style={{
          width: logicalW,
          height: logicalH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}>
          {children}
        </div>
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
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate    = useTransform(scrollYProgress, [0, 0.55], [14, 0]);
  const scale     = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 0.88 : 0.96, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.55], [0, -20]);
  const opacity   = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);

  const MobileContent = role === 'agent'
    ? DashboardMockupMobileAgent
    : role === 'tour'
    ? DashboardMockupMobileTour
    : DashboardMockupMobile;

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? "auto" : "64rem",
        minHeight: isMobile ? "unset" : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        padding: isMobile ? "24px 16px 40px" : "16px",
      }}
    >
      <div style={{ width: "100%", position: "relative", perspective: isMobile ? "800px" : "1200px" }}>

        {/* Title */}
        <motion.div
          style={{
            translateY: isMobile ? 0 : translate,
            maxWidth: "64rem",
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {titleComponent}
        </motion.div>

        {/* ── MOBILE VIEWPORT: phone only, big and prominent ── */}
        {isMobile ? (
          <motion.div
            style={{
              rotateX: rotate,
              scale,
              opacity,
              transformOrigin: "center top",
              margin: "0 auto",
              maxWidth: "300px",   // phone fills ~77% of 390px viewport
            }}
          >
            {/* Phone bezel */}
            <div style={{
              border: `4px solid ${BEZEL_COLOR}`,
              padding: "5px",
              backgroundColor: BEZEL_BG,
              borderRadius: "36px",
              boxShadow: SHADOW,
            }}>
              {/* Earpiece */}
              <div style={{
                width: 32, height: 4, borderRadius: 9999,
                background: "#3a3a3a", margin: "4px auto 5px",
              }} />
              {/* Screen — 9:19.5, content scales to fit */}
              <ScaledScreen
                logicalW={PHONE_LOGICAL_W}
                logicalH={PHONE_LOGICAL_H}
                borderRadius={24}
              >
                <MobileContent />
              </ScaledScreen>
              {/* Home indicator */}
              <div style={{
                width: 36, height: 4, borderRadius: 9999,
                background: "#3a3a3a", margin: "5px auto 3px",
              }} />
            </div>
            <p style={{
              textAlign: "center", marginTop: 10,
              fontSize: 11, color: "var(--ds-text-3)",
              fontWeight: 500, letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>Mobile</p>
          </motion.div>
        ) : (
          /* ── DESKTOP VIEWPORT: tablet + phone side by side ── */
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
              gap: "28px",
            }}
          >
            {/* ── TABLET — landscape 4:3 ── */}
            <div style={{ flex: "0 0 68%", minWidth: 0 }}>
              <div style={{
                border: `5px solid ${BEZEL_COLOR}`,
                padding: "7px",
                backgroundColor: BEZEL_BG,
                borderRadius: "20px",
                boxShadow: SHADOW,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#3a3a3a", margin: "0 auto 4px",
                }} />
                <ScaledScreen
                  logicalW={TABLET_LOGICAL_W}
                  logicalH={TABLET_LOGICAL_H}
                  borderRadius={12}
                >
                  {children}
                </ScaledScreen>
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
            <div style={{ flex: "0 0 24%", minWidth: 0, alignSelf: "flex-end" }}>
              <div style={{
                border: `4px solid ${BEZEL_COLOR}`,
                padding: "5px",
                backgroundColor: BEZEL_BG,
                borderRadius: "28px",
                boxShadow: SHADOW,
              }}>
                <div style={{
                  width: 28, height: 4, borderRadius: 9999,
                  background: "#3a3a3a", margin: "3px auto 4px",
                }} />
                <ScaledScreen
                  logicalW={PHONE_LOGICAL_W}
                  logicalH={PHONE_LOGICAL_H}
                  borderRadius={18}
                >
                  <MobileContent />
                </ScaledScreen>
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
        )}

      </div>
    </div>
  );
};
