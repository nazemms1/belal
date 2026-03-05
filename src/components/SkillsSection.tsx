import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import classes from "./SkillsSection.module.css";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const categories = [
  {
    title: "QA & Testing",
    color: "#a855f7",
    items: [
      { name: "Manual Testing (Black/White Box)" },
      { name: "Test Plans & Test Cases" },
      { name: "Performance & Security Testing" },
      { name: "Agile / Scrum" },
      { name: "SQL & Scripting" },
    ],
  },
  {
    title: "Development & AI",
    color: "#6366f1",
    items: [
      { name: "HTML / CSS / JavaScript" },
      { name: "Python", pct: 80 },
      { name: "LLM / RAG / LangChain" },
      { name: "React / Front-End" },
      { name: "Django / Flutter / Git" },
    ],
  },
  {
    title: "Design & Motion",
    color: "#ec4899",
    items: [
      { name: "Adobe After Effects", pct: 93 },
      { name: "Adobe Photoshop", pct: 91 },
      { name: "Adobe Illustrator", pct: 88 },
      { name: "Figma / Adobe XD", pct: 85 },
      { name: "Premiere / InDesign", pct: 83 },
    ],
  },
];

const tools = [
  { name: "Selenium", cat: "QA" },
  { name: "Postman", cat: "QA" },
  { name: "JIRA", cat: "QA" },
  { name: "Python", cat: "Dev" },
  { name: "JavaScript", cat: "Dev" },
  { name: "React", cat: "Dev" },
  { name: "LangChain", cat: "AI" },
  { name: "PyTorch", cat: "AI" },
  { name: "OpenCV", cat: "AI" },
  { name: "After Effects", cat: "Design" },
  { name: "Photoshop", cat: "Design" },
  { name: "Illustrator", cat: "Design" },
  { name: "Figma", cat: "Design" },
  { name: "Premiere Pro", cat: "Design" },
  { name: "InDesign", cat: "Design" },
  { name: "Adobe XD", cat: "Design" },
  { name: "Flutter", cat: "Dev" },
  { name: "Django", cat: "Dev" },
  { name: "Git", cat: "Dev" },
  { name: "SQL", cat: "QA" },
];

const catColors: Record<string, string> = {
  QA: "#a855f7",
  Dev: "#6366f1",
  AI: "#06b6d4",
  Design: "#ec4899",
};

function SkillBar({
  name,

  color,
  i,
}: {
  name: string;

  color: string;
  i: number;
}) {
  const ref = useRef(null);
  return (
    <div ref={ref} className={classes.barRow}>
      <div className={classes.barMeta}>
        <span className={classes.barName}>{name}</span>
      </div>
      <div className={classes.barTrack}>
        <motion.div
          className={classes.barFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          transition={{ duration: 1.1, delay: i * 0.07, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className={classes.section} ref={ref}>
      <div className={classes.inner}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={classes.header}
        >
          <motion.div variants={fadeUp} className={classes.eyebrow}>
            <span className={classes.eyebrowLine} />
            Skills & Expertise
          </motion.div>
          <motion.h2 variants={fadeUp} className={classes.heading}>
            A complete creative
            <br />& technical toolkit
          </motion.h2>
          <motion.p variants={fadeUp} className={classes.sub}>
            9+ years of design experience. 2+ years of QA engineering. AI
            development with real project delivery.
          </motion.p>
        </motion.div>


        <div className={classes.grid}>
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              className={classes.categoryCard}
              style={{ "--cat-color": cat.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className={classes.catHeader}>
                <span
                  className={classes.catDot}
                  style={{ background: cat.color }}
                />
                <span className={classes.catTitle}>{cat.title}</span>
              </div>
              <div className={classes.bars}>
                {cat.items.map((item, i) => (
                  <SkillBar
                    key={item.name}
                    name={item.name}
                    color={cat.color}
                    i={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

         <motion.div
          className={classes.toolCloud}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className={classes.toolCloudLabel}>Tools I work with</p>
          <div className={classes.toolList}>
            {tools.map((t, i) => (
              <motion.span
                key={t.name}
                className={classes.toolChip}
                style={
                  { "--chip-color": catColors[t.cat] } as React.CSSProperties
                }
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.03 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {t.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
