"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TABLET_LOGICAL_W = 1200;
const TABLET_LOGICAL_H = 900;

const BEZEL_COLOR = "#5a5a5a";
const BEZEL_BG = "#1a1a1a";
const SHADOW = "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a";

function useDeviceSize() {
  const [vw, setVw] = React.useState(1280);
  React.useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw < 640;

  const tabletPct = Math.round(Math.min(vw, 1024) * (isMobile ? 0.92 : 0.88));
  const tBorder = Math.max(3, Math.round(tabletPct * 0.005));
  const tPad = Math.max(4, Math.round(tabletPct * 0.007));
  const tRadius = Math.max(14, Math.round(tabletPct * 0.02));
  const tScreenR = Math.max(8, Math.round(tabletPct * 0.012));
  const tDotSize = Math.max(4, Math.round(tabletPct * 0.006));
  const tHomeW = Math.max(24, Math.round(tabletPct * 0.04));
  const tHomeH = Math.max(2, Math.round(tabletPct * 0.003));

  return { isMobile, tBorder, tPad, tRadius, tScreenR, tDotSize, tHomeW, tHomeH };
}

function ScaledScreen({
  logicalW, logicalH, borderRadius, children
}: {
  logicalW: number
  logicalH: number
  borderRadius: number
  children: React.ReactNode
}) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const recalc = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;
      setScale(Math.min(w / logicalW, h / logicalH));
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [logicalW, logicalH]);

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
        <div
          style={{
            width: logicalW,
            height: logicalH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

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

  const sz = useDeviceSize();
  const { isMobile } = sz;

  const rotate = useTransform(scrollYProgress, [0, 0.55], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [isMobile ? 0.88 : 0.96, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.55], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);

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

        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            transformOrigin: "center top",
            maxWidth: "56rem",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              border: `${sz.tBorder}px solid ${BEZEL_COLOR}`,
              padding: `${sz.tPad}px`,
              backgroundColor: BEZEL_BG,
              borderRadius: sz.tRadius,
              boxShadow: SHADOW,
            }}
          >
            <div
              style={{
                width: sz.tDotSize,
                height: sz.tDotSize,
                borderRadius: "50%",
                background: "#3a3a3a",
                margin: `0 auto ${sz.tPad - 2}px`,
              }}
            />
            <ScaledScreen logicalW={TABLET_LOGICAL_W} logicalH={TABLET_LOGICAL_H} borderRadius={sz.tScreenR}>
              {children}
            </ScaledScreen>
            <div
              style={{
                width: sz.tHomeW,
                height: sz.tHomeH,
                borderRadius: 9999,
                background: "#3a3a3a",
                margin: `${sz.tPad - 2}px auto 0`,
              }}
            />
          </div>
{/* "Coming in June" removed — showing realistic dashboard */}
        </motion.div>
      </div>
    </div>
  );
};
