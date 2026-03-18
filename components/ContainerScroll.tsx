"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import DashboardMockupMobile from "@/components/DashboardMockupMobile";
import DashboardMockupMobileAgent from "@/components/DashboardMockupMobileAgent";
import DashboardMockupMobileTour from "@/components/DashboardMockupMobileTour";

// ── Device logical dimensions ─────────────────────────────────────────────────
// Phone: 9:19.5 portrait | Tablet: 4:3 landscape
// ScaledScreen renders at these sizes then CSS-scales to fit the bezel.
const TABLET_LOGICAL_W = 1200;
const TABLET_LOGICAL_H = 900;
const PHONE_LOGICAL_W  = 280;
const PHONE_LOGICAL_H  = 607;   // 280 × (19.5/9) ≈ 607

const BEZEL_COLOR = "#5a5a5a";
const BEZEL_BG    = "#1a1a1a";
const SHADOW      = "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a";

// ── useDeviceSize ─────────────────────────────────────────────────────────────
// Returns a sizing object derived from current viewport width.
// All bezel values scale proportionally so they look correct on any screen.
function useDeviceSize() {
  const [vw, setVw] = React.useState(1280);
  React.useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw < 640;

  // Phone bezel values — scale with viewport
  // Reference: at 390px vw the phone bezel is ~300px wide → ratio ≈ 0.77
  // At 1280px vw the phone column is ~24% ≈ 307px → similar absolute size
  // We want bezel chrome to be ~4-5% of device width
  const phonePct = isMobile ? Math.round(vw * 0.77) : Math.round(vw * 0.24 * 0.96);
  const pBorder  = Math.max(2, Math.round(phonePct * 0.016));   // ~1.6% of device width
  const pPad     = Math.max(3, Math.round(phonePct * 0.020));
  const pRadius  = Math.max(18, Math.round(phonePct * 0.115));  // ~11.5% → nice pill
  const pScreenR = Math.max(12, Math.round(phonePct * 0.082));
  const pEarW    = Math.max(20, Math.round(phonePct * 0.115));
  const pEarH    = Math.max(3,  Math.round(phonePct * 0.014));
  const pHomeW   = Math.max(22, Math.round(phonePct * 0.125));
  const pHomeH   = pEarH;

  // Tablet bezel values — tablet column is ~68% of container (maxWidth 64rem = 1024px on desktop)
  const tabletPct = isMobile ? 0 : Math.round(Math.min(vw, 1024) * 0.68 * 0.96);
  const tBorder   = Math.max(3, Math.round(tabletPct * 0.008));
  const tPad      = Math.max(4, Math.round(tabletPct * 0.010));
  const tRadius   = Math.max(14, Math.round(tabletPct * 0.026));
  const tScreenR  = Math.max(8,  Math.round(tabletPct * 0.016));
  const tDotSize  = Math.max(4,  Math.round(tabletPct * 0.008));
  const tHomeW    = Math.max(24, Math.round(tabletPct * 0.050));
  const tHomeH    = Math.max(2,  Math.round(tabletPct * 0.004));

  return { isMobile, pBorder, pPad, pRadius, pScreenR, pEarW, pEarH, pHomeW, pHomeH, tBorder, tPad, tRadius, tScreenR, tDotSize, tHomeW, tHomeH, phonePct }
}

// ── ScaledScreen ─────────────────────────────────────────────────────────────
// Renders children at logicalW × logicalH then CSS-scales to fit.
// ResizeObserver recalculates whenever bezel changes size.
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

  const sz = useDeviceSize();
  const { isMobile } = sz;

  const rotate    = useTransform(scrollYProgress, [0, 0.55], [14, 0]);
  const scale     = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 0.88 : 0.96, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.55], [0, -20]);
  const opacity   = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);

  const MobileContent = role === 'agent'
    ? DashboardMockupMobileAgent
    : role === 'tour'
    ? DashboardMockupMobileTour
    : DashboardMockupMobile;

  // Phone bezel — shared across mobile-only and desktop phone column
  const PhoneBezel = ({ width }: { width?: string }) => (
    <div style={{ margin: "0 auto", maxWidth: width }}>
      <div style={{
        border: `${sz.pBorder}px solid ${BEZEL_COLOR}`,
        padding: `${sz.pPad}px`,
        backgroundColor: BEZEL_BG,
        borderRadius: sz.pRadius,
        boxShadow: SHADOW,
      }}>
        {/* Earpiece pill */}
        <div style={{
          width: sz.pEarW, height: sz.pEarH, borderRadius: 9999,
          background: "#3a3a3a", margin: `${sz.pPad}px auto ${sz.pPad + 1}px`,
        }} />
        <ScaledScreen logicalW={PHONE_LOGICAL_W} logicalH={PHONE_LOGICAL_H} borderRadius={sz.pScreenR}>
          <MobileContent />
        </ScaledScreen>
        {/* Home indicator */}
        <div style={{
          width: sz.pHomeW, height: sz.pHomeH, borderRadius: 9999,
          background: "#3a3a3a", margin: `${sz.pPad + 1}px auto ${sz.pPad}px`,
        }} />
      </div>
      <p style={{
        textAlign: "center", marginTop: Math.max(6, sz.pBorder * 2),
        fontSize: Math.max(9, Math.round(sz.phonePct * 0.038)),
        color: "var(--ds-text-3)", fontWeight: 500,
        letterSpacing: "0.05em", textTransform: "uppercase",
      }}>Mobile</p>
    </div>
  )

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? "auto" : "64rem",
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

        {/* ── MOBILE: phone only, prominent ── */}
        {isMobile ? (
          <motion.div style={{ rotateX: rotate, scale, opacity, transformOrigin: "center top" }}>
            <PhoneBezel width="300px" />
          </motion.div>

        ) : (
          /* ── DESKTOP: tablet + phone side by side ── */
          <motion.div
            style={{
              rotateX: rotate, scale, opacity,
              transformOrigin: "center top",
              maxWidth: "64rem", margin: "0 auto",
              display: "flex", alignItems: "flex-end",
              justifyContent: "center", gap: "28px",
            }}
          >
            {/* ── TABLET — landscape 4:3 ── */}
            <div style={{ flex: "0 0 68%", minWidth: 0 }}>
              <div style={{
                border: `${sz.tBorder}px solid ${BEZEL_COLOR}`,
                padding: `${sz.tPad}px`,
                backgroundColor: BEZEL_BG,
                borderRadius: sz.tRadius,
                boxShadow: SHADOW,
              }}>
                {/* Front camera dot */}
                <div style={{
                  width: sz.tDotSize, height: sz.tDotSize, borderRadius: "50%",
                  background: "#3a3a3a", margin: `0 auto ${sz.tPad - 2}px`,
                }} />
                <ScaledScreen logicalW={TABLET_LOGICAL_W} logicalH={TABLET_LOGICAL_H} borderRadius={sz.tScreenR}>
                  {children}
                </ScaledScreen>
                {/* Home bar */}
                <div style={{
                  width: sz.tHomeW, height: sz.tHomeH, borderRadius: 9999,
                  background: "#3a3a3a", margin: `${sz.tPad - 2}px auto 0`,
                }} />
              </div>
              <p style={{
                textAlign: "center", marginTop: Math.max(6, sz.tBorder * 2),
                fontSize: Math.max(9, Math.round(sz.tBorder * 4)),
                color: "var(--ds-text-3)", fontWeight: 500,
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}>Tablet</p>
            </div>

            {/* ── PHONE — portrait 9:19.5 ── */}
            <div style={{ flex: "0 0 24%", minWidth: 0, alignSelf: "flex-end" }}>
              <PhoneBezel />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
