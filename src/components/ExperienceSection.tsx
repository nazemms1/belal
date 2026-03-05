import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconBriefcase, IconPalette, IconMovie, IconSchool } from '@tabler/icons-react'
import classes from './ExperienceSection.module.css'

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
}

const items = [
  {
    icon: IconBriefcase,
    color: '#a855f7',
    title: 'QA Engineer & Software Tester',
    org: 'Atlantic Xchange',
    location: 'USA · Remote',
    period: 'Sep 2022 – 2024',
    tag: 'Full-Time',
    bullets: [
      'Crafting robust applications with hands-on software development experience',
      'White box & black box testing — test plans, test cases, thorough coverage',
      'Strong SQL & scripting knowledge for data manipulation and test automation',
      'Agile/Scrum framework participation with iterative development cycles',
      'Performance and security testing to safeguard software integrity',
    ]
  },
  {
    icon: IconPalette,
    color: '#6366f1',
    title: 'Senior Graphic Designer',
    org: 'Scandinavia Tech',
    location: 'Dubai, UAE',
    period: 'Feb 2023 – Dec 2023',
    tag: 'Full-Time',
    bullets: [
      'Visual assets for branding, marketing campaigns, and digital media',
      'Collaborating with clients and stakeholders to translate briefs into compelling design',
      'End-to-end ownership: ideation → mock-ups → final execution',
      'Mentoring junior designers and ensuring brand guideline adherence',
      'Staying ahead of design trends and emerging technologies',
    ]
  },
  {
    icon: IconMovie,
    color: '#ec4899',
    title: 'Motion Graphic Designer',
    org: 'Freelance',
    location: 'Damascus, Syria',
    period: '2017 – 2024',
    tag: 'Freelance',
    bullets: [
      'Captivating motion graphics and visual narratives across industries',
      'Adobe suite proficiency — After Effects, Premiere, Photoshop, Illustrator',
      'Storyboards and animations for effective message delivery',
      'Various animation styles: kinetic typography, 2D motion, explainer videos',
    ]
  },
  {
    icon: IconPalette,
    color: '#f59e0b',
    title: 'Graphic Designer',
    org: 'Freelance',
    location: 'Damascus, Syria',
    period: '2015 – 2024',
    tag: 'Freelance',
    bullets: [
      'Impactful visual solutions for global clients across diverse sectors',
      'Expertise in Adobe Photoshop, Illustrator, InDesign, XD, and Figma',
      'Adapting design styles to suit varied branding and project objectives',
      'Long-term client relationships through exceptional creative service',
    ]
  },
  {
    icon: IconSchool,
    color: '#06b6d4',
    title: 'B.Sc. Informatics Engineering — AI Major',
    org: 'Arab International University',
    location: 'Damascus, Syria',
    period: '2024',
    tag: 'Education',
    bullets: [
      'Graduated with a focus on Artificial Intelligence and intelligent systems',
      'Deep learning, NLP, computer vision, and AI application development',
      'Graduation project: ChatPDF — AI-powered PDF assistant with 7 features',
    ]
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className={classes.section} ref={ref}>
      <div className={classes.inner}>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={classes.header}>
          <motion.div variants={fadeUp} className={classes.eyebrow}>
            <span className={classes.eyebrowLine} />
            Experience
          </motion.div>
          <motion.h2 variants={fadeUp} className={classes.heading}>
            Professional journey
          </motion.h2>
          <motion.p variants={fadeUp} className={classes.sub}>
            From Damascus to Dubai — a track record spanning QA, design, AI, and motion graphics.
          </motion.p>
        </motion.div>

        <div className={classes.timeline}>
          {items.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}

function TimelineItem({ item, index, inView }: { item: typeof items[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      className={classes.timelineItem}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
       <div className={classes.connector}>
        <div className={classes.iconWrap} style={{ background: `${item.color}18`, borderColor: `${item.color}40` }}>
          <item.icon size={20} color={item.color} />
        </div>
        {index < items.length - 1 && (
          <div className={classes.line} style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }} />
        )}
      </div>

       <motion.div
        className={classes.card}
        style={{ '--item-color': item.color } as React.CSSProperties}
        whileHover={{ x: 4, transition: { duration: 0.2 } }}
      >
        <div className={classes.cardTop}>
          <div className={classes.cardLeft}>
            <h3 className={classes.title}>{item.title}</h3>
            <div className={classes.meta}>
              <span className={classes.org} style={{ color: item.color }}>{item.org}</span>
              <span className={classes.metaSep}>·</span>
              <span className={classes.loc}>{item.location}</span>
            </div>
          </div>
          <div className={classes.cardRight}>
            <span className={classes.tag} style={{ color: item.color, borderColor: `${item.color}40`, background: `${item.color}0f` }}>
              {item.tag}
            </span>
            <span className={classes.period}>{item.period}</span>
          </div>
        </div>
        <ul className={classes.bullets}>
          {item.bullets.map(b => (
            <li key={b} className={classes.bullet}>
              <span className={classes.bulletDot} style={{ background: item.color }} />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
