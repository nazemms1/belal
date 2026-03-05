import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react'
import classes from './ProjectsSection.module.css'

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
}

const projects = [
  {
    num: '01',
    title: 'ChatPDF',
    subtitle: 'AI-Powered Document Intelligence Platform',
    period: 'Sep 2023 – Feb 2024',
    type: 'Graduation Project · Team of 5',
    role: 'AI Engineer',
    description: 'Leveraged generative AI to revolutionize how people interact with PDF documents — from intelligent Q&A to quiz generation, OCR, and audio transcription.',
    roleDetail: 'Built the "Chat with Your PDF" feature (LLM + RAG pipeline) and the "Generate Quiz" feature using prompt engineering and LangChain.',
    features: [
      'Chat with Your PDF (LLM + RAG)',
      'Auto Quiz Generation from content',
      'OCR from handwritten images',
      'Audio → PDF transcription',
      'Document summarization',
      'PDF merge, split & editing',
      'Multi-format conversion',
    ],
    tech: ['Generative AI', 'LLM', 'RAG', 'LangChain', 'PyTorch', 'NLP', 'OpenCV', 'Django', 'Flutter', 'Git'],
    accent: '#a855f7',
    accent2: '#6366f1',
  },
  {
    num: '02',
    title: 'Bus Reservation System',
    subtitle: 'Interactive Web Booking Application',
    period: 'Jul 2023 – Sep 2023',
    type: 'Pre-Graduation Project · Solo',
    role: 'Front-End Developer',
    description: 'A fully responsive web application for bus ticket booking — seat selection, real-time availability, and booking confirmation with a clean, intuitive UX.',
    roleDetail: 'Sole developer, responsible for all front-end architecture, design, and interactive seat-selection logic.',
    features: [
      'Visual interactive seat selection',
      'Real-time availability updates',
      'Booking confirmation flow',
      'Fully responsive design',
      'Dynamic route navigation',
      'User-friendly form UX',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    accent: '#6366f1',
    accent2: '#06b6d4',
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className={classes.section} ref={ref}>
      <div className={classes.inner}>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={classes.header}>
          <motion.div variants={fadeUp} className={classes.eyebrow}>
            <span className={classes.eyebrowLine} />
            Projects
          </motion.div>
          <motion.h2 variants={fadeUp} className={classes.heading}>
            Featured work
          </motion.h2>
          <motion.p variants={fadeUp} className={classes.sub}>
            Real deliverables. Real impact. Built with modern AI and front-end technologies.
          </motion.p>
        </motion.div>

        <div className={classes.projects}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectCard({ project: p, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      className={classes.card}
      style={{ '--p-accent': p.accent, '--p-accent2': p.accent2 } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
       <div className={classes.cardGlow} />

       <div className={classes.cardHeader}>
        <div className={classes.numWrap}>
          <span className={classes.num}>{p.num}</span>
          <span className={classes.typeLabel}>{p.type}</span>
        </div>
        <div className={classes.links}>
          <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className={classes.iconLink} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
            <IconBrandGithub size={17} />
          </motion.a>
          <motion.a href="#" className={classes.iconLink} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
            <IconExternalLink size={17} />
          </motion.a>
        </div>
      </div>

       <div className={classes.cardBody}>
        <div className={classes.cardMain}>
          <div>
            <h3 className={classes.title}>{p.title}</h3>
            <p className={classes.subtitle}>{p.subtitle}</p>
          </div>
          <span className={classes.roleBadge} style={{ color: p.accent, borderColor: `${p.accent}35`, background: `${p.accent}10` }}>
            {p.role}
          </span>
          <p className={classes.desc}>{p.description}</p>
          <p className={classes.roleDetail}><strong>My contribution:</strong> {p.roleDetail}</p>

           <div className={classes.techRow}>
            {p.tech.map(t => (
              <span key={t} className={classes.techChip}>{t}</span>
            ))}
          </div>
        </div>

         <div className={classes.featuresPanel}>
          <p className={classes.featuresLabel}>Key Features</p>
          <div className={classes.featuresList}>
            {p.features.map((f, i) => (
              <motion.div
                key={f}
                className={classes.featureItem}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              >
                <span className={classes.featureDot} style={{ background: p.accent }} />
                {f}
              </motion.div>
            ))}
          </div>
          <div className={classes.periodBadge}>
            {p.period}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
