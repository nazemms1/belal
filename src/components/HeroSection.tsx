import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconArrowRight,
  IconDownload,
} from "@tabler/icons-react";
import classes from "./HeroSection.module.css";

 const roles = [
  "AI Engineer",
  "QA Engineer",
  "Software Developer",
  "Motion Graphic Designer",
  "Senior Graphic Designer",
];

 const orbitBadges = [
  { label: "LLM / RAG", angle: 0, radius: 200, color: "#a855f7" },
  { label: "After Effects", angle: 60, radius: 220, color: "#ec4899" },
  { label: "React", angle: 120, radius: 195, color: "#06b6d4" },
  { label: "QA Testing", angle: 180, radius: 215, color: "#a855f7" },
  { label: "Figma", angle: 240, radius: 200, color: "#f59e0b" },
  { label: "PyTorch", angle: 300, radius: 210, color: "#6366f1" },
];

 const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

 function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={classes.particleCanvas} />;
}

 function MouseSpotlight() {
  const x = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  );
  const y = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  );
  const springX = useSpring(x, { stiffness: 50, damping: 18 });
  const springY = useSpring(y, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className={classes.spotlight}
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

 function OrbitBadges() {
  const [deg, setDeg] = useState(0);
  useEffect(() => {
    let frame: number;
    let last = 0;
    const tick = (ts: number) => {
      if (last) setDeg((d) => d + (ts - last) * 0.012);
      last = ts;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={classes.orbitWrap}>
      <div className={classes.orbitRing} />
      {orbitBadges.map((b) => {
        const angle = ((b.angle + deg) * Math.PI) / 180;
        const x = Math.cos(angle) * 145;
        const y = Math.sin(angle) * 85;
        return (
          <motion.div
            key={b.label}
            className={classes.orbitBadge}
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              borderColor: `${b.color}45`,
              background: `${b.color}12`,
              color: b.color,
            }}
            whileHover={{ scale: 1.18, zIndex: 10 }}
          >
            {b.label}
          </motion.div>
        );
      })}
    </div>
  );
}

 function AnimatedNum({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    const t = setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, 900);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
    };
  }, [target]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
}

 export default function HeroSection() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 700], [0, 100]);
  const opacityFade = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const tick = () => {
      const word = roles[roleIdx.current];
      if (!roleRef.current) return;
      if (!deleting.current) {
        roleRef.current.textContent = word.slice(0, charIdx.current + 1);
        charIdx.current++;
        if (charIdx.current === word.length) {
          deleting.current = true;
          timer.current = setTimeout(tick, 1900);
          return;
        }
      } else {
        roleRef.current.textContent = word.slice(0, charIdx.current - 1);
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
      timer.current = setTimeout(tick, deleting.current ? 40 : 70);
    };
    timer.current = setTimeout(tick, 700);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={classes.hero} id="home">
      <ParticleCanvas />
      <div className={classes.grid} />
      <div className={classes.glowTop} />
      <div className={classes.glowBR} />
      <MouseSpotlight />
      <div className={classes.frameTL} />
      <div className={classes.frameTR} />
      <div className={classes.frameBL} />
      <div className={classes.frameBR2} />

      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className={classes.content}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className={classes.contentInner}
        >
           <div className={classes.textCol}>
            <motion.div variants={fadeUp}>
              <div className={classes.statusPill}>
                <span className={classes.statusDot} />
                <span>Open to opportunities</span>
                <span className={classes.statusSep}>·</span>
                <span className={classes.statusLoc}>Damascus, Syria</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className={classes.nameWrap}>
              <h1 className={classes.nameLine1}>Belal</h1>
              <h1 className={classes.nameLine2}>Altabbaa</h1>
            </motion.div>

            <motion.div variants={fadeUp} className={classes.typeRow}>
              <span className={classes.typePrefix}>Currently a</span>
              <span className={classes.typeHighlight}>
                <span ref={roleRef} />
                <span className={classes.cursor}>|</span>
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className={classes.summary}>
              Merging <strong>AI engineering</strong>,{" "}
              <strong>quality assurance</strong>,{" "}
              <strong>graphic design</strong>, and{" "}
              <strong>motion graphics</strong> into a single, rare professional
              profile — technically precise and visually compelling.
            </motion.p>

            <motion.div variants={fadeUp} className={classes.statsRow}>
              {[
                { n: 9, s: "+", label: "Years Design" },
                { n: 2, s: "+", label: "Years QA" },
                { n: 7, s: "", label: "AI Features" },
                { n: 20, s: "+", label: "Tools" },
              ].map(({ n, s, label }) => (
                <div key={label} className={classes.stat}>
                  <span className={classes.statNum}>
                    <AnimatedNum target={n} suffix={s} />
                  </span>
                  <span className={classes.statLabel}>{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className={classes.btnRow}>
              <motion.a
                href="mailto:Belaltabba@gmail.com"
                className={classes.btnPrimary}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <IconMail size={17} />
                Get in Touch
              </motion.a>
              <motion.button
                className={classes.btnOutline}
                onClick={() => scrollTo("projects")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                View My Work
                <IconArrowRight size={16} />
              </motion.button>
              <motion.a
                href="#"
                className={classes.btnGhost}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Download CV"
              >
                <IconDownload size={16} />
                CV
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className={classes.socialRow}>
              {[
                {
                  icon: IconMail,
                  href: "mailto:Belaltabba@gmail.com",
                  label: "Email",
                },
                {
                  icon: IconBrandGithub,
                  href: "https://github.com",
                  label: "GitHub",
                },
                {
                  icon: IconBrandLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={classes.socialLink}
                  aria-label={label}
                  whileHover={{ scale: 1.18, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

           <motion.div
            className={classes.visualCol}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <OrbitBadges />

            <div className={classes.avatarWrap}>
              <div className={classes.avatarRingOuter} />
              <div className={classes.avatarRingMid} />
              <div className={classes.avatarCore}>
                <span className={classes.avatarInitials}>BA</span>
                <span className={classes.avatarSub}>AI · QA · Design</span>
              </div>
              <div className={classes.avatarPulse} />
            </div>

            <motion.div
              className={classes.floatCard1}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span
                className={classes.floatCardDot}
                style={{ background: "#4ade80" }}
              />
              <div>
                <p className={classes.floatCardTitle}>Atlantic Xchange</p>
                <p className={classes.floatCardSub}>QA Engineer · Remote</p>
              </div>
            </motion.div>

            <motion.div
              className={classes.floatCard2}
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <span
                className={classes.floatCardDot}
                style={{ background: "#a855f7" }}
              />
              <div>
                <p className={classes.floatCardTitle}>ChatPDF · AI</p>
                <p className={classes.floatCardSub}>LLM + RAG Engineer</p>
              </div>
            </motion.div>

            <motion.div
              className={classes.floatCard3}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <span
                className={classes.floatCardDot}
                style={{ background: "#ec4899" }}
              />
              <div>
                <p className={classes.floatCardTitle}>Scandinavia Tech</p>
                <p className={classes.floatCardSub}>Sr. Graphic Designer</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className={classes.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className={classes.scrollLine} />
      </motion.div>
    </section>
  );
}
