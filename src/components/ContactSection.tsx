import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandGithub,
  IconBrandLinkedin,
  IconSend,
  IconCheck,
} from "@tabler/icons-react";
import classes from "./ContactSection.module.css";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const contacts = [
  {
    icon: IconMail,
    label: "Email",
    value: "Belaltabba@gmail.com",
    href: "mailto:Belaltabba@gmail.com",
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: "+963 957 952 855",
    href: "tel:+963957952855",
  },
  { icon: IconMapPin, label: "Location", value: "Damascus, Syria", href: "#" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className={classes.section} ref={ref}>
      <div className={classes.inner}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={classes.header}
        >
          <motion.div variants={fadeUp} className={classes.eyebrow}>
            <span className={classes.eyebrowLine} />
            Contact
          </motion.div>
          <motion.h2 variants={fadeUp} className={classes.heading}>
            Let's work together
          </motion.h2>
          <motion.p variants={fadeUp} className={classes.sub}>
            Open to QA, AI engineering, graphic design, and creative technology
            roles.
          </motion.p>
        </motion.div>

        <div className={classes.layout}>
           <motion.div
            className={classes.infoCol}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className={classes.tagline}>
              Whether you're looking for a meticulous QA engineer, an AI
              developer, or a seasoned visual designer — I'm ready to contribute
              from day one.
            </p>

            <div className={classes.contactList}>
              {contacts.map((c) => (
                <a key={c.label} href={c.href} className={classes.contactItem}>
                  <div className={classes.contactIcon}>
                    <c.icon size={18} />
                  </div>
                  <div>
                    <span className={classes.contactLabel}>{c.label}</span>
                    <span className={classes.contactValue}>{c.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={classes.socials}>
              {[
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
                {
                  icon: IconMail,
                  href: "mailto:Belaltabba@gmail.com",
                  label: "Email",
                },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={classes.socialBtn}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
            </div>

             <div className={classes.availCard}>
              <div className={classes.availDot} />
              <div>
                <p className={classes.availTitle}>
                  Available for opportunities
                </p>
                <p className={classes.availSub}>
                  QA · AI Engineering · Graphic Design · Motion
                </p>
              </div>
            </div>
          </motion.div>

           <motion.div
            className={classes.formWrap}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handle} className={classes.form}>
              <div className={classes.formRow}>
                <div className={classes.field}>
                  <label className={classes.label}>Name</label>
                  <input
                    className={classes.input}
                    placeholder="Your full name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className={classes.field}>
                  <label className={classes.label}>Email</label>
                  <input
                    className={classes.input}
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className={classes.field}>
                <label className={classes.label}>Subject</label>
                <input
                  className={classes.input}
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                />
              </div>
              <div className={classes.field}>
                <label className={classes.label}>Message</label>
                <textarea
                  className={`${classes.input} ${classes.textarea}`}
                  placeholder="Tell me about your project or role..."
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
              </div>
              <motion.button
                type="submit"
                className={`${classes.submitBtn} ${sent ? classes.submitSent : ""}`}
                whileHover={!sent ? { scale: 1.02 } : {}}
                whileTap={!sent ? { scale: 0.98 } : {}}
              >
                {sent ? (
                  <>
                    <IconCheck size={18} /> Message sent!
                  </>
                ) : (
                  <>
                    <IconSend size={18} /> Send message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

       <div className={classes.footer}>
        <p>© {new Date().getFullYear()} Belal Altabbaa</p>
      </div>
    </section>
  );
}
