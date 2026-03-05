import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import classes from './Navbar.module.css'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50))

  useEffect(() => {
    const onScroll = () => {
      for (const l of [...links].reverse()) {
        const el = document.getElementById(l.id)
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(l.id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = (id: string) => {
    setMobileOpen(false)
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`${classes.nav} ${scrolled ? classes.scrolled : ''}`}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
         <motion.button
          className={classes.logo}
          onClick={() => nav('home')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className={classes.logoMark}>BA</span>
          <span className={classes.logoText}>Belal<span className={classes.logoDot}>.</span></span>
        </motion.button>

         <nav className={classes.desktopLinks}>
          {links.map(l => (
            <motion.button
              key={l.id}
              className={`${classes.link} ${active === l.id ? classes.linkActive : ''}`}
              onClick={() => nav(l.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  className={classes.linkUnderline}
                  layoutId="navUnderline"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

         <div className={classes.right}>
          <motion.a
            href="mailto:Belaltabba@gmail.com"
            className={classes.cta}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Hire me
          </motion.a>
          <button
            className={`${classes.burger} ${mobileOpen ? classes.burgerOpen : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.header>

       <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={classes.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                className={`${classes.mobileLink} ${active === l.id ? classes.mobileLinkActive : ''}`}
                onClick={() => nav(l.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
