import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Star,
  Scissors,
  Trees,
  Droplets,
  Sprout,
  CheckCircle2,
  Lock,
  LogIn,
  UserPlus,
  LogOut,
  Search,
  Trash2,
  RefreshCw,
  Eye,
  ClipboardList,
  MessageSquareText,
  ArrowRight,
  ShieldCheck,
  Hammer,
} from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "coronavirusc555@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isAdminUser(user) {
  return Boolean(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
}

const contact = {
  phone: "210 123 4567",
  mobile: "693 722 7901",
  email: "alexioukipouros@gmail.com",
  area: "Εξυπηρέτηση εντός Αττικής",
  hours: "Δευ - Σαβ: 08:00 - 18:00",
};

const featuredWorks = [
  {
    title: "Καθαρισμός αυλής",
    text: "Απομάκρυνση χόρτων, κλαδιών και άχρηστων φυτικών υλικών.",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Συντήρηση πρασίνου",
    text: "Τακτική φροντίδα για καθαρή και περιποιημένη εικόνα.",
    img: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Φυτεύσεις",
    text: "Επιλογή φυτών που ταιριάζουν στον χώρο και στο κλίμα.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85",
  },
];

const services = [
  {
    icon: Scissors,
    category: "Συντήρηση",
    title: "Κλαδέματα & καθαρισμοί",
    text: "Κλάδεμα δέντρων, καθάρισμα αυλής, θάμνων και ξερών χόρτων με τακτοποιημένη παράδοση χώρου.",
  },
  {
    icon: Trees,
    category: "Κήποι",
    title: "Τακτική συντήρηση κήπου",
    text: "Προγραμματισμένη φροντίδα για κατοικίες και επαγγελματικούς χώρους σε όλη την Αττική.",
  },
  {
    icon: Droplets,
    category: "Πότισμα",
    title: "Αυτόματο πότισμα",
    text: "Έλεγχος, ρύθμιση και τοποθέτηση αυτόματου ποτίσματος για σωστή χρήση νερού.",
  },
  {
    icon: Sprout,
    category: "Φυτεύσεις",
    title: "Φυτεύσεις & διαμόρφωση",
    text: "Επιλογή φυτών, προτάσεις για τον χώρο και διαμόρφωση με βάση τις ανάγκες του κήπου.",
  },
];

const projectGallery = [
  {
    title: "Καθαρισμός εξωτερικού χώρου",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Περιποίηση φυτών",
    img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Συντήρηση γκαζόν",
    img: "https://images.unsplash.com/photo-1599685315640-1b57fe70f3e2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Διαμόρφωση κήπου",
    img: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1200&q=85",
  },
];

const defaultReviews = [
  {
    id: "default-1",
    name: "Μαρία Π.",
    rating: 5,
    text: "Άμεση επικοινωνία, καθαρή δουλειά και πολύ καλή συμπεριφορά.",
    approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-2",
    name: "Γιώργος Κ.",
    rating: 5,
    text: "Ήρθαν στην ώρα τους και άφησαν την αυλή πολύ καθαρή.",
    approved: true,
    created_at: new Date().toISOString(),
  },
];

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString("el-GR");
  } catch {
    return "";
  }
}

function Stars({ rating, setRating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => setRating?.(n)} aria-label={`${n} αστέρια`}>
          <Star size={18} fill={n <= rating ? "currentColor" : "none"} className={n <= rating ? "filled" : ""} />
        </button>
      ))}
    </div>
  );
}

function Header({ currentUser, setCurrentUser, openAuth }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    window.location.hash = "";
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setCurrentUser(null);
  };

  const links = [
    ["Αρχική", "home"],
    ["Έργα", "works"],
    ["Η ιστορία μας", "story"],
    ["Υπηρεσίες", "services"],
    ["Αξιολογήσεις", "reviews"],
    ["Επικοινωνία", "contact"],
  ];

  return (
    <>
      <div className="topbar">
        <span><MapPin size={15} /> {contact.area}</span>
        <a href={`tel:${contact.phone.replaceAll(" ", "")}`}><Phone size={15} /> {contact.phone}</a>
        <a href={`mailto:${contact.email}`}><Mail size={15} /> {contact.email}</a>
        <span><Clock size={15} /> {contact.hours}</span>
      </div>

      <header className="header">
        <button className="brand" onClick={() => go("home")}>
          <span><Leaf size={27} /></span>
          <div>
            <b>GardenNoir</b>
            <small>κηπουρικές υπηρεσίες</small>
          </div>
        </button>

        <nav className="nav desktop">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}

          {currentUser ? (
            <button className="light-btn" onClick={logout}><LogOut size={17} /> Έξοδος</button>
          ) : (
            <>
              <button className="light-btn" onClick={() => openAuth("login")}><LogIn size={17} /> Login</button>
              <button className="green-btn small" onClick={() => openAuth("signup")}><UserPlus size={17} /> Sign Up</button>
            </>
          )}
        </nav>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {links.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
              {currentUser ? (
                <button onClick={logout}>Έξοδος</button>
              ) : (
                <>
                  <button onClick={() => openAuth("login")}>Login</button>
                  <button onClick={() => openAuth("signup")}>Sign Up</button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function AuthModal({ type, setType, onClose, setCurrentUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password || (type === "signup" && !name)) {
      setError("Συμπλήρωσε όλα τα πεδία.");
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError("Η σύνδεση δεν είναι διαθέσιμη αυτή τη στιγμή.");
      setLoading(false);
      return;
    }

    try {
      if (type === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").upsert({ id: data.user.id, name, email });
        }

        if (data.session) {
          setCurrentUser({ id: data.user.id, name, email });
          onClose();
        } else {
          setInfo("Ο λογαριασμός δημιουργήθηκε. Αν ζητηθεί επιβεβαίωση email, έλεγξε τα εισερχόμενά σου.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const user = data.user;
        setCurrentUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email.split("@")[0],
        });
        onClose();
      }
    } catch (err) {
      setError(err.message || "Κάτι πήγε λάθος.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form className="auth-box" onSubmit={submit} initial={{ y: 26, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
        <div className="auth-head">
          <div>
            <span>{type === "signup" ? "Νέος λογαριασμός" : "Σύνδεση"}</span>
            <h2>{type === "signup" ? "Δημιουργία λογαριασμού" : "Σύνδεση πελάτη"}</h2>
          </div>
          <button type="button" onClick={onClose}><X /></button>
        </div>

        {type === "signup" && (
          <input placeholder="Όνομα" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}

        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Κωδικός" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        {error && <div className="error">{error}</div>}
        {info && <div className="success">{info}</div>}

        <button className="green-btn" disabled={loading}>
          {loading ? <><RefreshCw className="spin" size={18} /> Παρακαλώ περίμενε</> : type === "signup" ? "Sign Up" : "Login"}
        </button>

        <button className="link-btn" type="button" onClick={() => setType(type === "signup" ? "login" : "signup")}>
          {type === "signup" ? "Έχω ήδη λογαριασμό — Login" : "Δεν έχω λογαριασμό — Sign Up"}
        </button>
      </motion.form>
    </motion.div>
  );
}

function PublicSite({ reviews, currentUser, openAuth }) {
  const [form, setForm] = useState({ name: "", surname: "", phone: "", subject: "", service: "Συντήρηση κήπου" });
  const [reviewForm, setReviewForm] = useState({ name: "", text: "" });
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [error, setError] = useState("");

  const approvedReviews = reviews.filter((r) => r.approved !== false);
  const avg = approvedReviews.length
    ? (approvedReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / approvedReviews.length).toFixed(1)
    : "5.0";

  const submitMessage = async (e) => {
    e.preventDefault();
    setError("");

    const clean = {
      name: form.name.trim(),
      surname: form.surname.trim(),
      phone: form.phone.trim(),
      subject: `[${form.service}] ${form.subject.trim()}`,
    };

    if (!clean.name || !clean.surname || !clean.phone || !form.subject.trim()) {
      setError("Συμπληρώστε όλα τα πεδία.");
      return;
    }

    try {
      if (!supabase) throw new Error("No backend");

      const { error } = await supabase.from("messages").insert({
        ...clean,
        read: false,
        status: "Νέο",
      });

      if (error) throw error;

      setForm({ name: "", surname: "", phone: "", subject: "", service: "Συντήρηση κήπου" });
      setSent(true);
      setTimeout(() => setSent(false), 4200);
    } catch (err) {
      console.error(err);
      setError("Το αίτημα δεν στάλθηκε. Παρακαλώ δοκιμάστε ξανά ή καλέστε μας τηλεφωνικά.");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");

    const name = currentUser?.name || reviewForm.name.trim();
    const text = reviewForm.text.trim();

    if (!name || !text) {
      setError("Συμπληρώστε όνομα και αξιολόγηση.");
      return;
    }

    try {
      if (!supabase) throw new Error("No backend");

      const { error } = await supabase.from("reviews").insert({
        name,
        text,
        rating,
        approved: false,
        user_id: currentUser?.id || null,
      });

      if (error) throw error;

      setReviewForm({ name: "", text: "" });
      setRating(5);
      setReviewSent(true);
      setTimeout(() => setReviewSent(false), 4200);
    } catch (err) {
      console.error(err);
      setError("Η αξιολόγηση δεν στάλθηκε. Παρακαλώ δοκιμάστε ξανά.");
    }
  };

  return (
    <main className="site-shell">
      <section id="home" className="hero">
        <div className="hero-copy">
          <span className="eyebrow">25+ χρόνια εμπειρίας στην Αττική</span>
          <h1>Κηπουρικές υπηρεσίες με πραγματική εμπειρία και καθαρό αποτέλεσμα.</h1>
          <p>
            Οικογενειακή επιχείρηση που αναλαμβάνει κλαδέματα, καθαρισμούς, φυτεύσεις,
            συντήρηση κήπων και αυτόματο πότισμα σε όλη την Αττική.
          </p>

          <div className="hero-actions">
            <button className="green-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Ζητήστε προσφορά <ArrowRight size={18} />
            </button>
            <a className="white-btn" href={`tel:${contact.phone.replaceAll(" ", "")}`}>
              <Phone size={18} /> {contact.phone}
            </a>
          </div>

          <div className="hero-trust">
            <div><b>25+</b><span>χρόνια εμπειρίας</span></div>
            <div><b>Αττική</b><span>εξυπηρέτηση</span></div>
            <div><b>{avg}/5</b><span>αξιολόγηση</span></div>
          </div>

          <div className="hero-service-tags">
            <span>Κλαδέματα</span>
            <span>Καθαρισμοί</span>
            <span>Συντήρηση</span>
            <span>Πότισμα</span>
          </div>
        </div>

        <div className="hero-showcase">
          <img className="main-hero-img" src="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1400&q=85" alt="Κηπουρικές εργασίες" />
          <div className="floating-card">
            <ShieldCheck />
            <b>Άμεση εκτίμηση εργασίας</b>
            <span>Επικοινωνούμε για κόστος και διαθεσιμότητα.</span>
          </div>

          <div className="side-proof-card">
            <Hammer />
            <b>Καθαρή παράδοση</b>
            <span>Ο χώρος μένει τακτοποιημένος μετά την εργασία.</span>
          </div>
        </div>
      </section>

      <section id="works" className="featured-works">
        <div className="section-heading left">
          <span>Τα έργα μας</span>
          <h2>Πριν τις υπηρεσίες, δείχνουμε τη δουλειά.</h2>
          <p>
            Ο πελάτης θέλει πρώτα να δει εικόνα, καθαριότητα και αποτέλεσμα.
            Γι’ αυτό τα έργα μπαίνουν μπροστά: δείχνουν τι μπορεί να γίνει σε έναν χώρο.
          </p>
        </div>

        <div className="work-cards">
          {featuredWorks.map((work, index) => (
            <motion.article
              className={`work-card ${index === 0 ? "large" : ""}`}
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={work.img} alt={work.title} />
              <div>
                <span>0{index + 1}</span>
                <h3>{work.title}</h3>
                <p>{work.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="story" className="story-section">
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1599685315640-1b57fe70f3e2?auto=format&fit=crop&w=1200&q=85" alt="Εμπειρία στην κηπουρική" />
        </div>

        <div className="story-copy">
          <span className="eyebrow">Η ιστορία μας</span>
          <h2>Οικογενειακή επιχείρηση με 25+ χρόνια στον χώρο της κηπουρικής.</h2>
          <p>
            Η GardenNoir δημιουργήθηκε πάνω σε πραγματική εμπειρία στην κηπουρική
            και στη φροντίδα εξωτερικών χώρων. Δεν βασιζόμαστε σε έτοιμες λύσεις·
            βλέπουμε τον χώρο, ακούμε την ανάγκη του πελάτη και προτείνουμε πρακτική λύση.
          </p>
          <p>
            Στόχος μας είναι κάθε εργασία να παραδίδεται καθαρά, γρήγορα και με εικόνα
            που κάνει τον χώρο πιο όμορφο και πιο εύχρηστο.
          </p>

          <div className="story-points">
            <div><CheckCircle2 /><span>Συνέπεια στα ραντεβού</span></div>
            <div><CheckCircle2 /><span>Καθαρή παράδοση χώρου</span></div>
            <div><CheckCircle2 /><span>Εξυπηρέτηση εντός Αττικής</span></div>
          </div>

          <div className="story-note">
            <b>Η φιλοσοφία μας</b>
            <span>Κάθε κήπος χρειάζεται σωστή ματιά, πρακτική λύση και φροντίδα που κρατάει στον χρόνο.</span>
          </div>
        </div>
      </section>

      <section className="experience-band">
        <div>
          <b>25+</b>
          <span>χρόνια εμπειρίας</span>
        </div>
        <div>
          <b>2</b>
          <span>γενιές στη δουλειά</span>
        </div>
        <div>
          <b>Άμεσα</b>
          <span>επικοινωνία & εκτίμηση</span>
        </div>
        <div>
          <b>Καθαρά</b>
          <span>παράδοση χώρου</span>
        </div>
      </section>

      <section className="process-strip">
        <div>
          <span>01</span>
          <b>Μιλάμε για την εργασία</b>
          <p>Μας λέτε τι χρειάζεται ο χώρος και κλείνουμε την επικοινωνία.</p>
        </div>
        <div>
          <span>02</span>
          <b>Βλέπουμε τον χώρο</b>
          <p>Εκτιμούμε την εργασία και προτείνουμε καθαρή λύση.</p>
        </div>
        <div>
          <span>03</span>
          <b>Οργανώνουμε την εκτέλεση</b>
          <p>Γίνεται η εργασία με συνέπεια, ταχύτητα και τάξη.</p>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-heading">
          <span>Υπηρεσίες</span>
          <h2>Οργανωμένες εργασίες για κάθε εξωτερικό χώρο.</h2>
          <p>Από καθαρισμούς και κλαδέματα μέχρι τακτική συντήρηση και αυτόματο πότισμα.</p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                className="service-card"
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <span>{service.category}</span>
                <Icon />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="why-panel">
        <div className="why-copy">
          <span>Γιατί να μας επιλέξετε</span>
          <h2>Η διαφορά φαίνεται στην οργάνωση και στο τελικό αποτέλεσμα.</h2>
        </div>

        <div className="why-list">
          <div><CheckCircle2 /><b>Γρήγορη εξυπηρέτηση</b><p>Άμεση επικοινωνία και καθαρή συνεννόηση για την εργασία.</p></div>
          <div><CheckCircle2 /><b>Πραγματική εμπειρία</b><p>25+ χρόνια στον χώρο της κηπουρικής και συντήρησης πρασίνου.</p></div>
          <div><CheckCircle2 /><b>Καθαρή παράδοση</b><p>Ο χώρος παραδίδεται περιποιημένος μετά την ολοκλήρωση.</p></div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <span>Gallery</span>
          <h2>Ενδεικτικές εικόνες εργασιών</h2>
        </div>

        <div className="gallery-grid">
          {projectGallery.map((project) => (
            <article className="gallery-card" key={project.title}>
              <img src={project.img} alt={project.title} />
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span>Ζητήστε προσφορά</span>
          <h2>Θέλετε να καθαρίσετε, να συντηρήσετε ή να ανανεώσετε τον κήπο σας;</h2>
        </div>
        <button className="white-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Επικοινωνήστε μαζί μας
        </button>
      </section>

      <section id="reviews" className="section reviews-section">
        <div className="section-heading">
          <span>Αξιολογήσεις</span>
          <h2>Τι λένε οι πελάτες μας</h2>
        </div>

        <div className="reviews-layout">
          <div className="review-list">
            {approvedReviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-top">
                  <div>
                    <h3>{review.name}</h3>
                    <small>{formatDate(review.created_at)}</small>
                  </div>
                  <Stars rating={Number(review.rating)} />
                </div>
                <p>“{review.text}”</p>
              </article>
            ))}
          </div>

          <form className="review-form" onSubmit={submitReview}>
            <Star size={30} />
            <h3>Αφήστε αξιολόγηση</h3>
            <p>Οι αξιολογήσεις δημοσιεύονται μετά από έλεγχο.</p>

            {!currentUser && (
              <input
                placeholder="Το όνομά σας"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              />
            )}

            <Stars rating={rating} setRating={setRating} />
            <textarea
              rows="4"
              placeholder="Γράψτε την εμπειρία σας"
              value={reviewForm.text}
              onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
            />
            <button className="green-btn">Αποστολή αξιολόγησης</button>
            {reviewSent && <div className="success">Η αξιολόγησή σας καταχωρήθηκε και θα εμφανιστεί μετά από έλεγχο.</div>}
          </form>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-card">
          <span>Επικοινωνία</span>
          <h2>Πείτε μας τι χρειάζεται ο χώρος σας.</h2>
          <p>Στείλτε μας την εργασία που θέλετε και θα επικοινωνήσουμε μαζί σας για λεπτομέρειες, κόστος και διαθεσιμότητα.</p>

          <a href={`tel:${contact.phone.replaceAll(" ", "")}`}><Phone /> {contact.phone}</a>
          <a href={`tel:${contact.mobile.replaceAll(" ", "")}`}><Phone /> {contact.mobile}</a>
          <a href={`mailto:${contact.email}`}><Mail /> {contact.email}</a>
          <div><MapPin /> {contact.area}</div>
        </div>

        <form className="quote-form" onSubmit={submitMessage}>
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            <option>Συντήρηση κήπου</option>
            <option>Κλάδεμα / καθαρισμός</option>
            <option>Αυτόματο πότισμα</option>
            <option>Φυτεύσεις</option>
            <option>Άλλη εργασία</option>
          </select>

          <div className="two">
            <input placeholder="Όνομα" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Επίθετο" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
          </div>

          <input placeholder="Τηλέφωνο" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <textarea
            rows="5"
            placeholder="Περιγράψτε τι χρειάζεται ο χώρος σας"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <button className="green-btn"><Send size={18} /> Αποστολή αιτήματος</button>

          {sent && <div className="success">Το αίτημά σας καταχωρήθηκε επιτυχώς. Θα επικοινωνήσουμε μαζί σας σύντομα.</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </section>

      <section className="final-trust">
        <div><CheckCircle2 /><span>Οικογενειακή επιχείρηση</span></div>
        <div><CheckCircle2 /><span>25+ χρόνια εμπειρίας</span></div>
        <div><CheckCircle2 /><span>Εξυπηρέτηση εντός Αττικής</span></div>
        <div><CheckCircle2 /><span>Καθαρό επαγγελματικό αποτέλεσμα</span></div>
      </section>

      <footer>
        <div>
          <b>GardenNoir</b>
          <span>Οικογενειακή κηπουρική επιχείρηση με 25+ χρόνια εμπειρίας.</span>
        </div>
        <small>© 2026 GardenNoir. Κηπουρικές υπηρεσίες εντός Αττικής.</small>
      </footer>
    </main>
  );
}

function AdminPanel({ currentUser, openAuth }) {
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Όλα");
  const [loading, setLoading] = useState(false);

  const allowed = isAdminUser(currentUser);

  const loadAdminData = async () => {
    if (!supabase || !allowed) return;
    setLoading(true);

    try {
      const [{ data: msg, error: msgErr }, { data: rev, error: revErr }] = await Promise.all([
        supabase.from("messages").select("*").order("created_at", { ascending: false }),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      ]);

      if (msgErr) throw msgErr;
      if (revErr) throw revErr;

      setMessages(msg || []);
      setReviews(rev || []);
    } catch (err) {
      console.error(err);
      alert("Δεν φορτώθηκαν τα δεδομένα. Έλεγξε ότι είσαι συνδεδεμένος με admin email.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [currentUser?.email]);

  const updateMessage = async (id, data) => {
    const { error } = await supabase.from("messages").update(data).eq("id", id);
    if (error) return alert(error.message);

    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
    if (selected?.id === id) setSelected({ ...selected, ...data });
  };

  const deleteMessage = async (id) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) return alert(error.message);

    setMessages((prev) => prev.filter((m) => m.id !== id));
    setSelected(null);
  };

  const approveReview = async (id) => {
    const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id);
    if (error) return alert(error.message);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
  };

  const hideReview = async (id) => {
    const { error } = await supabase.from("reviews").update({ approved: false }).eq("id", id);
    if (error) return alert(error.message);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: false } : r)));
  };

  const deleteReview = async (id) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return alert(error.message);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  if (!allowed) {
    return (
      <main className="admin-login">
        <div className="admin-login-card">
          <Lock size={42} />
          <h1>Περιοχή διαχειριστή</h1>
          <p>Η πρόσβαση επιτρέπεται μόνο σε εξουσιοδοτημένο διαχειριστή.</p>

          {currentUser ? (
            <div className="error">Το email {currentUser.email} δεν έχει δικαιώματα διαχείρισης.</div>
          ) : (
            <button className="green-btn" onClick={() => openAuth("login")}>Σύνδεση διαχειριστή</button>
          )}
        </div>
      </main>
    );
  }

  const filtered = messages.filter((m) => {
    const text = `${m.name} ${m.surname} ${m.phone} ${m.subject}`.toLowerCase();
    const okSearch = text.includes(search.toLowerCase());
    const okFilter = filter === "Όλα" || m.status === filter;
    return okSearch && okFilter;
  });

  const pendingReviews = reviews.filter((r) => r.approved === false);

  return (
    <main className="admin">
      <div className="admin-head">
        <div>
          <span>Admin</span>
          <h1>Διαχείριση αιτημάτων</h1>
          <p>Συνδεδεμένος ως {currentUser.email}</p>
        </div>
        <button className="light-btn" onClick={loadAdminData}>{loading ? "Φόρτωση..." : "Ανανέωση"}</button>
      </div>

      <section className="admin-review-box">
        <div className="admin-section-head">
          <h2>Κριτικές για έγκριση</h2>
          <span>{pendingReviews.length} pending</span>
        </div>

        {pendingReviews.length === 0 ? (
          <p className="empty">Δεν υπάρχουν νέες κριτικές.</p>
        ) : (
          <div className="admin-review-list">
            {pendingReviews.map((r) => (
              <article key={r.id} className="admin-review-card">
                <div>
                  <h3>{r.name}</h3>
                  <Stars rating={Number(r.rating)} />
                  <p>{r.text}</p>
                </div>
                <div>
                  <button className="green-btn small" onClick={() => approveReview(r.id)}>Έγκριση</button>
                  <button className="danger-btn" onClick={() => deleteReview(r.id)}>Διαγραφή</button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="approved-mini">
          <h3>Εγκεκριμένες κριτικές</h3>
          {reviews.filter((r) => r.approved !== false).slice(0, 5).map((r) => (
            <div key={r.id}>
              <span>{r.name} — {r.rating}/5</span>
              <button onClick={() => hideReview(r.id)}>Απόκρυψη</button>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-grid">
        <div className="message-list">
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Αναζήτηση αιτήματος" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="filters">
            {["Όλα", "Νέο", "Σε επικοινωνία", "Κλεισμένο"].map((f) => (
              <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          {filtered.map((m) => (
            <button
              className={`message-item ${selected?.id === m.id ? "selected" : ""}`}
              key={m.id}
              onClick={() => {
                setSelected(m);
                updateMessage(m.id, { read: true });
              }}
            >
              <b>{m.name} {m.surname}</b>
              <span>{m.phone}</span>
              <p>{m.subject}</p>
              {!m.read && <em>Νέο</em>}
            </button>
          ))}

          {filtered.length === 0 && <p className="empty">Δεν υπάρχουν αιτήματα.</p>}
        </div>

        <div className="message-detail">
          {selected ? (
            <>
              <div className="detail-head">
                <div>
                  <h2>{selected.name} {selected.surname}</h2>
                  <p>{formatDate(selected.created_at)}</p>
                </div>
                <button className="danger-btn" onClick={() => deleteMessage(selected.id)}><Trash2 size={18} /> Διαγραφή</button>
              </div>

              <div className="detail-info">
                <div><Phone size={18} /><span>{selected.phone}</span></div>
                <div><ClipboardList size={18} /><span>{selected.subject}</span></div>
                <div><Eye size={18} /><span>{selected.status}</span></div>
              </div>

              <div className="status-row">
                {["Νέο", "Σε επικοινωνία", "Κλεισμένο"].map((s) => (
                  <button key={s} className={selected.status === s ? "active" : ""} onClick={() => updateMessage(selected.id, { status: s })}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="no-message">
              <MessageSquareText size={54} />
              <h2>Διάλεξε αίτημα</h2>
              <p>Εδώ θα φαίνονται οι λεπτομέρειες του πελάτη.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash === "#admin" ? "admin" : "site");
  const [currentUser, setCurrentUser] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const sync = () => setRoute(window.location.hash === "#admin" ? "admin" : "site");
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    async function init() {
      if (!supabase) {
        setReviews(defaultReviews);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user) {
        setCurrentUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email.split("@")[0],
        });
      }

      const { data: rev, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (!error) setReviews((rev && rev.length) ? rev : defaultReviews);
      else setReviews(defaultReviews);
    }

    init();

    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user;
        if (user) {
          setCurrentUser({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email.split("@")[0],
          });
        } else {
          setCurrentUser(null);
        }
      });

      return () => data.subscription.unsubscribe();
    }
  }, []);

  return (
    <>
      <Style />
      <div className="page-bg">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} openAuth={setAuthType} />

        <AnimatePresence mode="wait">
          {route === "admin" ? (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AdminPanel currentUser={currentUser} openAuth={setAuthType} />
            </motion.div>
          ) : (
            <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PublicSite reviews={reviews} currentUser={currentUser} openAuth={setAuthType} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {authType && (
            <AuthModal
              type={authType}
              setType={setAuthType}
              onClose={() => setAuthType(null)}
              setCurrentUser={setCurrentUser}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        color: #182315;
        font-family: "Manrope", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        overflow-x: hidden;
        background: #f2eadb;
        text-rendering: geometricPrecision;
      }
      button, input, textarea, select { font-family: inherit; }
      button { cursor: pointer; }

      .page-bg {
        position: relative;
        min-height: 100vh;
        overflow: hidden;
        background:
          radial-gradient(circle at 12% 8%, rgba(70,107,53,.25), transparent 22%),
          radial-gradient(circle at 85% 10%, rgba(184,145,86,.20), transparent 24%),
          radial-gradient(circle at 8% 78%, rgba(70,107,53,.15), transparent 28%),
          linear-gradient(180deg, #f8f0e2 0%, #eee4d2 46%, #f9f4ea 100%);
      }

      .page-bg::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: .18;
        background:
          url("data:image/svg+xml,%3Csvg width='520' height='520' viewBox='0 0 520 520' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23345a28' stroke-width='1.1' stroke-opacity='.34'%3E%3Cpath d='M80 450 C110 350 95 250 160 160 C205 98 285 62 390 72'/%3E%3Cpath d='M154 164 C145 208 168 230 202 250'/%3E%3Cpath d='M210 128 C205 170 226 198 266 220'/%3E%3Cpath d='M276 92 C276 130 300 158 342 178'/%3E%3Cpath d='M338 73 C350 108 382 130 430 136'/%3E%3Cpath d='M66 472 C130 405 210 380 318 392'/%3E%3Cpath d='M142 426 C168 390 204 372 250 370'/%3E%3Cpath d='M226 398 C250 370 282 356 326 358'/%3E%3C/g%3E%3C/svg%3E");
        background-size: 560px 560px;
        background-position: left 80px top 120px;
        background-repeat: no-repeat;
      }

      .page-bg::after {
        content: "";
        position: fixed;
        right: -70px;
        bottom: -90px;
        width: 620px;
        height: 620px;
        pointer-events: none;
        z-index: 0;
        opacity: .16;
        background:
          url("data:image/svg+xml,%3Csvg width='620' height='620' viewBox='0 0 620 620' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23345a28' stroke-width='1.2' stroke-opacity='.42'%3E%3Cpath d='M510 80 C430 135 390 210 382 316 C375 420 320 498 218 562'/%3E%3Cpath d='M386 310 C430 286 462 248 478 196'/%3E%3Cpath d='M370 392 C418 374 456 336 482 278'/%3E%3Cpath d='M326 470 C380 456 426 420 462 358'/%3E%3Cpath d='M250 548 C306 540 356 510 400 452'/%3E%3Cpath d='M532 108 C486 112 452 98 428 66'/%3E%3Cpath d='M486 178 C438 180 400 160 372 122'/%3E%3Cpath d='M448 256 C398 254 356 230 324 188'/%3E%3C/g%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        filter: blur(.2px);
      }

      .page-bg .site-shell::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 120px;
        width: min(1000px, 82vw);
        height: 1px;
        transform: translateX(-50%);
        background: linear-gradient(90deg, transparent, rgba(70,107,53,.26), transparent);
        pointer-events: none;
      }

      @keyframes imageFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-7px); }
      }

      @keyframes softDrift {
        0%, 100% { background-position: left 80px top 120px; }
        50% { background-position: left 95px top 145px; }
      }

      .page-bg::before {
        animation: softDrift 18s ease-in-out infinite;
      }


      main, footer { position: relative; z-index: 1; }
      main { padding-top: 120px; }

      .topbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: linear-gradient(135deg, #24451d, #35602a);
        color: #fff;
        min-height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        padding: 8px 18px;
        font-size: 14px;
        font-weight: 800;
        flex-wrap: wrap;
        box-shadow: 0 10px 24px rgba(31, 55, 25, .16);
      }
      .topbar span, .topbar a {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: #fff;
        text-decoration: none;
      }
      .topbar svg { color: #e1f1d5; }

      .header {
        position: fixed;
        top: 42px;
        left: 0;
        right: 0;
        z-index: 99;
        height: 78px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(250, 246, 237, .90);
        backdrop-filter: blur(22px);
        border-bottom: 1px solid rgba(128, 111, 81, .16);
        padding: 0 34px;
        box-shadow: 0 18px 40px rgba(43, 53, 34, .08);
      }
      .brand {
        border: 0;
        background: transparent;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
        color: #1d261b;
      }
      .brand > span {
        width: 50px;
        height: 50px;
        border-radius: 18px;
        background: linear-gradient(135deg, #345a28, #6f8f44);
        color: #fff;
        display: grid;
        place-items: center;
        box-shadow: 0 14px 26px rgba(70,107,53,.18);
      }
      .brand b { display: block; font-size: 21px; letter-spacing: -.03em; }
      .brand small { display: block; color: #607054; font-weight: 800; font-size: 13px; }

      .nav { display: flex; align-items: center; gap: 8px; }
      .nav button {
        border: 0;
        background: transparent;
        color: #263323;
        font-weight: 800;
        padding: 10px 12px;
        border-radius: 999px;
      }
      .nav button:hover { background: rgba(70,107,53,.09); }

      .green-btn, .white-btn, .light-btn, .danger-btn, .link-btn {
        border: 0;
        border-radius: 999px;
        font-weight: 850;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
      }
      .green-btn {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #345a28, #5f7f38);
        color: #fff;
        padding: 14px 22px;
        box-shadow: 0 14px 28px rgba(70,107,53,.18);
        transition: transform .22s ease, box-shadow .22s ease;
      }
      .green-btn::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-120%);
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
        transition: transform .55s ease;
      }
      .green-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 18px 34px rgba(70,107,53,.24);
      }
      .green-btn:hover::after {
        transform: translateX(120%);
      }
      .green-btn.small { padding: 10px 14px; }
      .white-btn, .light-btn {
        background: rgba(255,255,255,.72);
        color: #273621;
        padding: 12px 16px;
        border: 1px solid rgba(128, 111, 81, .20);
      }
      .danger-btn { background: #a23b2a; color: #fff; padding: 10px 14px; }
      .link-btn { background: transparent; color: #345a28; margin-top: 10px; width: 100%; }

      .menu-btn {
        display: none;
        border: 0;
        background: #eee6d8;
        color: #273621;
        border-radius: 12px;
        padding: 10px;
      }
      .mobile-menu {
        position: absolute;
        top: 120px;
        left: 0;
        right: 0;
        background: #f7f3ea;
        border-bottom: 1px solid #e2dacb;
        padding: 12px 20px;
        display: grid;
        gap: 6px;
      }
      .mobile-menu button {
        border: 0;
        background: transparent;
        text-align: left;
        padding: 13px;
        border-radius: 12px;
        color: #263323;
        font-weight: 850;
      }

      .hero {
        max-width: 1240px;
        margin: 0 auto;
        padding: 68px 28px 56px;
        display: grid;
        grid-template-columns: .92fr 1.08fr;
        gap: 48px;
        align-items: center;
      }
      .eyebrow, .section-heading span, .why-copy span, .contact-card span, .admin-head span {
        color: #466b35;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: .15em;
        font-weight: 900;
      }
      .hero-copy h1 {
        color: #162311;
        font-size: clamp(46px, 5.9vw, 84px);
        line-height: .95;
        letter-spacing: -3.6px;
        margin: 16px 0;
        font-weight: 900;
      }
      .hero-copy p {
        color: #56624d;
        font-size: 19px;
        line-height: 1.75;
        max-width: 700px;
        font-weight: 500;
      }
      .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
      .hero-trust {
        display: flex;
        flex-wrap: wrap;
        gap: 22px;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid rgba(70,107,53,.18);
      }
      .hero-trust div {
        background: transparent;
        border: 0;
        padding: 0;
      }
      .hero-trust b {
        display: block;
        color: #345a28;
        font-size: 28px;
        font-weight: 900;
        letter-spacing: -.04em;
      }
      .hero-trust span {
        color: #65705c;
        font-weight: 750;
        font-size: 13px;
      }
      .hero-service-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }
      .hero-service-tags span {
        color: #37562d;
        background: rgba(255,255,255,.54);
        border: 1px solid rgba(128,111,81,.14);
        border-radius: 999px;
        padding: 9px 12px;
        font-size: 13px;
        font-weight: 800;
      }

      .hero-showcase { position: relative; }
      .main-hero-img {
        width: 100%;
        height: 620px;
        object-fit: cover;
        display: block;
        border-radius: 44px 44px 120px 44px;
        box-shadow: 0 35px 90px rgba(47, 63, 38, .20);
        border: 10px solid rgba(255,255,255,.54);
        animation: imageFloat 8s ease-in-out infinite;
      }
      .floating-card, .side-proof-card {
        position: absolute;
        background: rgba(255,255,255,.94);
        border: 1px solid rgba(128, 111, 81, .16);
        padding: 18px;
        box-shadow: 0 22px 54px rgba(58,63,47,.14);
      }
      .floating-card {
        left: -24px;
        bottom: 34px;
        max-width: 300px;
        border-radius: 24px 24px 24px 8px;
      }
      .side-proof-card {
        right: -18px;
        top: 34px;
        max-width: 250px;
        border-radius: 24px 8px 24px 24px;
      }
      .floating-card svg, .side-proof-card svg { color: #466b35; }
      .floating-card b, .side-proof-card b {
        display: block;
        margin: 8px 0 4px;
        color: #172214;
        font-weight: 900;
      }
      .floating-card span, .side-proof-card span {
        color: #65705c;
        line-height: 1.5;
        font-weight: 650;
      }

      .featured-works, .story-section, .experience-band, .process-strip, .section, .why-panel, .cta-section, .contact-section, .final-trust {
        max-width: 1180px;
        margin: 0 auto;
        padding-left: 28px;
        padding-right: 28px;
      }

      .section-heading {
        text-align: center;
        margin-bottom: 34px;
      }
      .section-heading.left {
        text-align: left;
        display: grid;
        grid-template-columns: .75fr 1fr;
        gap: 30px;
        align-items: end;
      }
      .section-heading h2, .story-copy h2, .why-copy h2, .cta-section h2, .contact-card h2, .admin h1 {
        color: #172214;
        font-size: clamp(34px, 4.4vw, 58px);
        line-height: 1.04;
        letter-spacing: -2.3px;
        margin: 12px 0;
        font-weight: 900;
      }
      .section-heading p, .story-copy p, .contact-card p {
        color: #65705c;
        line-height: 1.78;
        font-size: 17px;
        font-weight: 500;
      }

      .featured-works {
        padding-top: 44px;
        padding-bottom: 74px;
      }
      .work-cards {
        display: grid;
        grid-template-columns: 1.25fr .85fr;
        grid-template-rows: repeat(2, 270px);
        gap: 18px;
      }
      .work-card {
        position: relative;
        overflow: hidden;
        border-radius: 38px;
        box-shadow: 0 22px 64px rgba(58,63,47,.13);
        background: #1d2c18;
      }
      .work-card.large {
        grid-row: span 2;
        border-radius: 46px 46px 46px 120px;
      }
      .work-card:not(.large):nth-child(2) { border-radius: 80px 36px 36px 36px; }
      .work-card:not(.large):nth-child(3) { border-radius: 36px 36px 80px 36px; }
      .work-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform .65s ease, filter .65s ease;
      }
      .work-card:hover img {
        transform: scale(1.055);
        filter: saturate(1.08) contrast(1.02);
      }
      .work-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(17,30,14,.82), rgba(17,30,14,.05));
      }
      .work-card div {
        position: absolute;
        z-index: 2;
        left: 26px;
        right: 26px;
        bottom: 26px;
        color: #fff;
      }
      .work-card span { color: #dff2c8; font-weight: 900; }
      .work-card h3 {
        margin: 6px 0;
        font-size: 28px;
        letter-spacing: -.04em;
      }
      .work-card p {
        margin: 0;
        color: rgba(255,255,255,.82);
        line-height: 1.55;
        font-weight: 500;
      }

      .story-section {
        display: grid;
        grid-template-columns: .85fr 1.15fr;
        gap: 34px;
        padding-top: 46px;
        padding-bottom: 68px;
        align-items: center;
      }
      .story-image img {
        width: 100%;
        height: 560px;
        object-fit: cover;
        border-radius: 120px 36px 36px 36px;
        display: block;
        box-shadow: 0 28px 75px rgba(58,63,47,.16);
        border: 10px solid rgba(255,255,255,.50);
      }
      .story-copy {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 0 0 0 28px;
        box-shadow: none;
        border-left: 3px solid rgba(70,107,53,.24);
      }
      .story-points {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 20px;
      }
      .story-points div {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(255,255,255,.58);
        border: 1px solid rgba(128,111,81,.13);
        border-radius: 18px;
        padding: 13px;
        color: #273621;
        font-weight: 800;
      }
      .story-points svg { color: #466b35; flex: 0 0 auto; }
      .story-note {
        margin-top: 16px;
        padding: 18px 0 0;
        border-top: 1px solid rgba(70,107,53,.20);
      }
      .story-note b {
        color: #172214;
        display: block;
        margin-bottom: 5px;
        font-weight: 900;
      }
      .story-note span {
        color: #5a6751;
        line-height: 1.55;
        font-weight: 650;
      }

      .experience-band {
        padding-top: 8px;
        padding-bottom: 42px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        border-top: 1px solid rgba(70,107,53,.18);
        border-bottom: 1px solid rgba(70,107,53,.18);
      }
      .experience-band div {
        background: transparent;
        color: #172214;
        padding: 24px;
        box-shadow: none;
        border-right: 1px solid rgba(70,107,53,.14);
      }
      .experience-band div:last-child { border-right: 0; }
      .experience-band b {
        display: block;
        font-size: 32px;
        font-weight: 900;
        letter-spacing: -.04em;
        color: #345a28;
      }
      .experience-band span {
        color: #65705c;
        font-weight: 750;
      }

      .process-strip {
        padding-top: 42px;
        padding-bottom: 62px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
      }
      .process-strip div {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 10px 26px;
        box-shadow: none;
        border-left: 1px solid rgba(70,107,53,.18);
      }
      .process-strip div:first-child { border-left: 0; }
      .process-strip span {
        color: #466b35;
        font-weight: 900;
        font-size: 13px;
      }
      .process-strip b {
        display: block;
        margin: 8px 0;
        color: #172214;
        font-size: 20px;
        font-weight: 900;
      }
      .process-strip p {
        margin: 0;
        color: #65705c;
        line-height: 1.55;
        font-weight: 550;
      }

      .section {
        padding-top: 62px;
        padding-bottom: 62px;
      }
      .services-section {
        max-width: none;
        padding-left: max(28px, calc((100vw - 1180px) / 2 + 28px));
        padding-right: max(28px, calc((100vw - 1180px) / 2 + 28px));
        background: linear-gradient(135deg, rgba(47,84,39,.08), rgba(255,255,255,.18));
        border-radius: 0;
        border-top: 1px solid rgba(70,107,53,.13);
        border-bottom: 1px solid rgba(70,107,53,.13);
        box-shadow: none;
      }
      .service-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        border-top: 1px solid rgba(70,107,53,.16);
      }
      .service-card {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 28px 22px;
        box-shadow: none;
        border-right: 1px solid rgba(70,107,53,.14);
        transition: transform .22s ease, background .22s ease;
      }
      .service-card:hover {
        transform: translateY(-4px);
        background: rgba(255,255,255,.25);
      }
      .service-card:last-child { border-right: 0; }
      .service-card span {
        color: #466b35;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: .13em;
        font-size: 12px;
      }
      .service-card svg {
        color: #466b35;
        margin: 18px 0;
      }
      .service-card h3 {
        color: #172214;
        font-size: 22px;
        margin: 0 0 10px;
        letter-spacing: -.04em;
        font-weight: 900;
      }
      .service-card p {
        color: #65705c;
        line-height: 1.68;
        font-weight: 520;
      }

      .why-panel {
        padding-top: 70px;
        padding-bottom: 70px;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 28px;
      }
      .why-copy {
        background: #2f5427;
        color: #fff;
        border-radius: 40px 120px 40px 40px;
        padding: 36px;
        box-shadow: 0 20px 50px rgba(47,84,39,.16);
      }
      .why-copy span {
        color: #dff2c8;
        font-weight: 900;
        letter-spacing: .16em;
        text-transform: uppercase;
        font-size: 13px;
      }
      .why-copy h2 { color: #fff; }
      .why-list {
        display: grid;
        gap: 0;
        border-top: 1px solid rgba(70,107,53,.18);
      }
      .why-list div {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 24px 0;
        box-shadow: none;
        border-bottom: 1px solid rgba(70,107,53,.18);
      }
      .why-list svg { color: #466b35; }
      .why-list b {
        display: block;
        margin: 8px 0;
        color: #172214;
        font-size: 21px;
        font-weight: 900;
      }
      .why-list p {
        color: #65705c;
        line-height: 1.65;
        margin: 0;
        font-weight: 520;
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: 1.1fr .9fr .9fr 1.1fr;
        gap: 14px;
      }
      .gallery-card {
        background: transparent;
        border: 0;
        border-radius: 0;
        overflow: visible;
        box-shadow: none;
      }
      .gallery-card img {
        width: 100%;
        height: 260px;
        object-fit: cover;
        display: block;
        border-radius: 30px;
        box-shadow: 0 16px 40px rgba(58,63,47,.10);
        transition: transform .45s ease, box-shadow .45s ease;
      }
      .gallery-card:hover img {
        transform: translateY(-5px) scale(1.015);
        box-shadow: 0 24px 54px rgba(58,63,47,.15);
      }
      .gallery-card:nth-child(1) img { border-radius: 70px 28px 28px 28px; }
      .gallery-card:nth-child(4) img { border-radius: 28px 28px 70px 28px; }
      .gallery-card h3 {
        margin: 0;
        padding: 14px 6px 0;
        color: #172214;
        font-size: 19px;
        font-weight: 850;
      }

      .cta-section {
        margin-top: 22px;
        margin-bottom: 22px;
        padding-top: 52px;
        padding-bottom: 52px;
        padding-left: 42px;
        padding-right: 42px;
        border-radius: 46px 46px 110px 46px;
        background:
          linear-gradient(135deg, rgba(47,84,39,.94), rgba(80,112,55,.90)),
          url("https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1400&q=80");
        background-size: cover;
        background-position: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 22px;
        box-shadow: 0 24px 70px rgba(47,84,39,.20);
      }
      .cta-section span {
        color: #dff2c8;
        text-transform: uppercase;
        letter-spacing: .16em;
        font-weight: 900;
        font-size: 13px;
      }
      .cta-section h2 {
        color: #fff;
        max-width: 790px;
      }

      .reviews-layout {
        display: grid;
        grid-template-columns: 1.08fr .92fr;
        gap: 22px;
      }
      .review-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      .review-card, .review-form, .contact-card, .quote-form, .admin-review-box, .message-list, .message-detail, .admin-login-card, .auth-box {
        background: rgba(255,255,255,.72);
        border: 1px solid rgba(128,111,81,.16);
        border-radius: 26px;
        box-shadow: 0 16px 40px rgba(58,63,47,.08);
      }
      .review-card, .review-form { padding: 24px; }
      .review-card:nth-child(even) { transform: translateY(18px); }
      .review-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .review-top h3 {
        margin: 0;
        color: #172214;
        font-weight: 900;
      }
      .review-top small { color: #798170; }
      .review-card p, .review-form p {
        color: #65705c;
        line-height: 1.7;
      }
      .review-form {
        border-radius: 40px 40px 40px 90px;
      }
      .review-form svg { color: #466b35; }
      .review-form h3 {
        color: #172214;
        font-size: 25px;
        margin: 10px 0;
        font-weight: 900;
      }
      .stars {
        display: flex;
        gap: 3px;
        margin: 8px 0;
      }
      .stars button {
        border: 0;
        background: transparent;
        color: #c7b98e;
        padding: 0;
      }
      .stars .filled { color: #d59b21; }

      .contact-section {
        padding-top: 72px;
        padding-bottom: 64px;
        display: grid;
        grid-template-columns: .86fr 1.14fr;
        gap: 26px;
      }
      .contact-card {
        padding: 32px;
        background: #2f5427;
        color: #fff;
        border-radius: 42px 42px 42px 110px;
      }
      .contact-card span { color: #dff2c8; }
      .contact-card h2 { color: #fff; }
      .contact-card p {
        color: rgba(255,255,255,.78);
        line-height: 1.75;
        font-weight: 520;
      }
      .contact-card a, .contact-card div {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(255,255,255,.10);
        color: #fff;
        text-decoration: none;
        font-weight: 800;
        padding: 14px;
        border-radius: 16px;
        margin-top: 10px;
      }
      .contact-card svg { color: #dff2c8; }
      .quote-form {
        padding: 30px;
        border-radius: 42px;
      }

      input, textarea, select {
        width: 100%;
        border: 1px solid #ded5c5;
        background: #fbfaf6;
        color: #1d261b;
        border-radius: 15px;
        padding: 14px 15px;
        outline: none;
        margin-bottom: 12px;
        resize: none;
        font-size: 15px;
        font-weight: 500;
      }
      input:focus, textarea:focus, select:focus {
        border-color: #466b35;
        box-shadow: 0 0 0 4px rgba(70,107,53,.12);
      }
      .two {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .success, .error {
        padding: 13px 15px;
        border-radius: 15px;
        font-weight: 850;
        margin-top: 12px;
      }
      .success { background: #e4f2d8; color: #2f5427; }
      .error { background: #f7dfdc; color: #8d2f24; }

      .final-trust {
        padding-top: 6px;
        padding-bottom: 34px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px 18px;
      }
      .final-trust div {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #273621;
        font-weight: 800;
      }
      .final-trust svg { color: #466b35; flex: 0 0 auto; }

      footer {
        background:
          radial-gradient(circle at 12% 0%, rgba(223,242,200,.10), transparent 30%),
          #253b20;
        color: rgba(255,255,255,.78);
        padding: 34px 28px;
        display: flex;
        justify-content: center;
        gap: 28px;
        flex-wrap: wrap;
        text-align: center;
      }
      footer b {
        color: #fff;
        display: block;
        font-size: 20px;
        font-weight: 900;
      }

      .modal-bg {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: rgba(29,38,27,.48);
        display: grid;
        place-items: center;
        padding: 20px;
      }
      .auth-box {
        width: 100%;
        max-width: 460px;
        padding: 26px;
      }
      .auth-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 18px;
      }
      .auth-head span {
        color: #466b35;
        font-weight: 900;
        letter-spacing: .14em;
        text-transform: uppercase;
        font-size: 12px;
      }
      .auth-head h2 {
        margin: 7px 0 0;
        color: #172214;
        font-weight: 900;
      }
      .auth-head button {
        border: 0;
        background: #f0eadf;
        color: #1d261b;
        border-radius: 14px;
        padding: 9px;
        height: 42px;
      }
      .spin { animation: spin 1s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }

      .admin-login {
        min-height: calc(100vh - 120px);
        display: grid;
        place-items: center;
        padding: 40px 20px;
      }
      .admin-login-card {
        max-width: 520px;
        padding: 34px;
        text-align: center;
      }
      .admin-login-card svg {
        color: #466b35;
        margin-bottom: 12px;
      }
      .admin-login-card h1 {
        margin: 0 0 10px;
        color: #172214;
        font-weight: 900;
      }
      .admin-login-card p { color: #65705c; }
      .admin {
        max-width: 1200px;
        margin: 0 auto;
        padding: 46px 28px;
      }
      .admin-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 20px;
        margin-bottom: 22px;
      }
      .admin-head span { color: #466b35; }
      .admin-head p {
        color: #65705c;
        margin: 8px 0 0;
      }
      .admin-review-box {
        padding: 24px;
        margin-bottom: 20px;
      }
      .admin-section-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }
      .admin-section-head h2 {
        margin: 0;
        color: #172214;
        font-weight: 900;
      }
      .admin-section-head span {
        background: #e4f2d8;
        color: #2f5427;
        border-radius: 999px;
        padding: 8px 12px;
        font-weight: 850;
      }
      .admin-review-list { display: grid; gap: 12px; }
      .admin-review-card {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        background: #f7f1e6;
        border-radius: 18px;
        padding: 16px;
      }
      .admin-review-card h3 { margin: 0; }
      .admin-review-card p { color: #596451; }
      .admin-review-card > div:last-child {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .approved-mini {
        margin-top: 18px;
        border-top: 1px solid #e2dacb;
        padding-top: 16px;
      }
      .approved-mini h3 { margin: 0 0 8px; }
      .approved-mini div {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #eee7db;
      }
      .approved-mini button {
        border: 0;
        border-radius: 999px;
        background: #eee6d8;
        color: #273621;
        font-weight: 800;
        padding: 8px 10px;
      }
      .admin-grid {
        display: grid;
        grid-template-columns: .95fr 1.05fr;
        gap: 20px;
      }
      .message-list, .message-detail {
        padding: 22px;
        min-height: 560px;
      }
      .search-box {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #f7f1e6;
        border-radius: 16px;
        padding: 0 12px;
        margin-bottom: 12px;
      }
      .search-box input {
        background: transparent;
        border: 0;
        margin: 0;
        box-shadow: none;
      }
      .filters, .status-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 14px;
      }
      .filters button, .status-row button {
        border: 0;
        border-radius: 999px;
        background: #eee6d8;
        color: #273621;
        padding: 10px 13px;
        font-weight: 800;
      }
      .filters .active, .status-row .active {
        background: #466b35;
        color: #fff;
      }
      .message-item {
        position: relative;
        display: block;
        width: 100%;
        text-align: left;
        border: 1px solid #e7dfd1;
        background: #fbfaf6;
        color: #1d261b;
        border-radius: 18px;
        padding: 16px;
        margin-bottom: 10px;
      }
      .message-item.selected, .message-item:hover {
        border-color: #466b35;
        background: #f0f7ea;
      }
      .message-item b { display: block; font-size: 17px; }
      .message-item span { color: #65705c; font-weight: 750; }
      .message-item p { color: #596451; line-height: 1.5; }
      .message-item em {
        position: absolute;
        right: 12px;
        top: 12px;
        background: #466b35;
        color: #fff;
        border-radius: 999px;
        padding: 5px 9px;
        font-size: 12px;
        font-style: normal;
        font-weight: 850;
      }
      .empty { color: #65705c; font-weight: 750; }
      .detail-head {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 18px;
      }
      .detail-head h2 {
        margin: 0;
        color: #172214;
        font-weight: 900;
      }
      .detail-head p {
        margin: 6px 0 0;
        color: #65705c;
      }
      .detail-info { display: grid; gap: 10px; }
      .detail-info div {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        background: #f7f1e6;
        border-radius: 16px;
        padding: 14px;
        color: #1d261b;
        font-weight: 750;
      }
      .detail-info svg { color: #466b35; }
      .no-message {
        height: 100%;
        display: grid;
        place-items: center;
        text-align: center;
        color: #65705c;
      }
      .no-message svg {
        color: #466b35;
        margin-bottom: 14px;
      }

      @media (max-width: 1050px) {
        .desktop { display: none; }
        .menu-btn { display: block; }
        .hero, .story-section, .why-panel, .reviews-layout, .contact-section, .admin-grid { grid-template-columns: 1fr; }
        .hero-showcase { order: -1; }
        .service-grid { grid-template-columns: repeat(2, 1fr); }
        .gallery-grid, .experience-band, .process-strip { grid-template-columns: repeat(2, 1fr); }
        .section-heading.left {
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .work-cards {
          grid-template-columns: 1fr;
          grid-template-rows: none;
        }
        .work-card, .work-card.large {
          height: 330px;
          grid-row: auto;
          border-radius: 34px;
        }
        .review-list { grid-template-columns: 1fr; }
        .cta-section { flex-direction: column; align-items: flex-start; }
        .floating-card { left: 20px; }
        .side-proof-card { right: 20px; }
        .experience-band div, .service-card, .process-strip div {
          border-right: 0;
          border-left: 0;
        }
      }
      @media (max-width: 680px) {
        .header {
          padding: 0 18px;
          top: 42px;
        }
        .topbar {
          position: fixed;
          justify-content: flex-start;
        }
        main {
          padding-top: 150px;
        }
        .hero, .featured-works, .story-section, .experience-band, .process-strip, .section, .why-panel, .contact-section, .final-trust, .admin {
          padding-left: 18px;
          padding-right: 18px;
        }
        .hero-copy h1 { font-size: 42px; letter-spacing: -2px; }
        .main-hero-img {
          height: 450px;
          border-radius: 34px 34px 80px 34px;
        }
        .floating-card, .side-proof-card { position: static; margin-top: 14px; max-width: none; }
        .hero-trust, .service-grid, .gallery-grid, .experience-band, .process-strip, .two, .story-points { grid-template-columns: 1fr; }
        .gallery-grid { display: grid; }
        .story-image img {
          height: 360px;
          border-radius: 80px 30px 30px 30px;
        }
        .story-copy {
          padding-left: 0;
          border-left: 0;
        }
        .contact-card, .cta-section, .why-copy {
          border-radius: 34px;
        }
        .admin-review-card { flex-direction: column; }
      }
    `}</style>
  );
}