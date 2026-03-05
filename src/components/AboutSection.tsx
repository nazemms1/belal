import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  IconMapPin, IconCalendar, IconLanguage, IconMail, IconPhone,
  IconBrain, IconCode, IconPalette, IconMovie
} from '@tabler/icons-react'
import classes from './AboutSection.module.css'

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
}
const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
}

const pillars = [
  { icon: IconBrain,   color: '#a855f7', label: 'AI Engineering',      desc: 'LLM, RAG, LangChain, PyTorch, NLP — building intelligent systems.' },
  { icon: IconCode,    color: '#6366f1', label: 'QA & Development',     desc: 'Robust testing, clean code, Agile/Scrum, performance & security.' },
  { icon: IconPalette, color: '#ec4899', label: 'Graphic Design',       desc: 'Photoshop, Illustrator, Figma, InDesign — brand-level visual work.' },
  { icon: IconMovie,   color: '#f59e0b', label: 'Motion Graphics',      desc: 'After Effects, Premiere — cinematic animations and storytelling.' },
]

const info = [
  { icon: IconMapPin,   v: 'Damascus, Syria' },
  { icon: IconCalendar, v: 'July 10, 2000' },
  { icon: IconLanguage, v: 'English & Arabic' },
  { icon: IconMail,     v: 'Belaltabba@gmail.com' },
  { icon: IconPhone,    v: '+963 957 952 855' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className={classes.section} ref={ref}>
      <div className={classes.inner}>

         <motion.div
          className={classes.left}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.div variants={fadeUp} className={classes.eyebrow}>
            <span className={classes.eyebrowLine} />
            About Me
          </motion.div>

          <motion.h2 variants={fadeUp} className={classes.heading}>
            Bridging technology<br />& creativity
          </motion.h2>

          <motion.p variants={fadeUp} className={classes.body}>
            I'm a versatile professional with a rare combination of skills: rigorous QA engineering,
            AI development, and award-calibre graphic & motion design. Currently a{' '}
            <strong>QA Engineer at Atlantic Xchange</strong> and{' '}
            <strong>Senior Graphic Designer at Scandinavia Tech</strong>, I operate confidently across
            the full spectrum — from writing test plans to training AI models to crafting brand identities.
          </motion.p>

          <motion.p variants={fadeUp} className={classes.body}>
            My <strong>Bachelor's in Informatics Engineering</strong> (AI major) from Arab International
            University anchors my technical depth, while 9+ years of freelance design work proves my
            creative range. I bring both precision and imagination to every project.
          </motion.p>

           <motion.div variants={fadeUp} className={classes.infoGrid}>
            {info.map(({ icon: Icon, v }) => (
              <div key={v} className={classes.infoItem}>
                <Icon size={15} className={classes.infoIcon} />
                <span>{v}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

         <motion.div
          className={classes.right}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
           <motion.div variants={fadeLeft} className={classes.avatarBlock}>
            <div className={classes.avatarRing}>
              <div className={classes.avatarInner}>
                <span className={classes.avatarInitials}>BA</span>
              </div>
            </div>
            <div className={classes.avatarGlow} />
             <motion.div
              className={classes.floatTag1}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <IconBrain size={14} /> AI Engineer
            </motion.div>
            <motion.div
              className={classes.floatTag2}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <IconPalette size={14} /> Motion Designer
            </motion.div>
          </motion.div>

           <motion.div variants={fadeUp} className={classes.pillars}>
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                className={classes.pillarCard}
                style={{ '--accent-local': p.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className={classes.pillarIcon} style={{ background: `${p.color}18`, borderColor: `${p.color}30` }}>
                  <p.icon size={20} color={p.color} />
                </div>
                <div>
                  <p className={classes.pillarLabel}>{p.label}</p>
                  <p className={classes.pillarDesc}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
