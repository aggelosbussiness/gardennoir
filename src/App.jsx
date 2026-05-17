import React, { useEffect, useMemo, useState } from "react";
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
  ShieldCheck,
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

const services = [
  {
    icon: Scissors,
    category: "Συντήρηση",
    title: "Κλαδέματα & καθαρισμοί",
    text: "Κλάδεμα δέντρων, καθάρισμα αυλής, θάμνων και ξερών χόρτων με τακτοποιημένη παράδοση χώρου.",
    image: "https://images.unsplash.com/photo-1599685315640-1b57fe70f3e2?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Trees,
    category: "Κήποι",
    title: "Τακτική συντήρηση κήπου",
    text: "Προγραμματισμένη φροντίδα για κατοικίες και επαγγελματικούς χώρους σε όλη την Αττική.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Droplets,
    category: "Πότισμα",
    title: "Αυτόματο πότισμα",
    text: "Έλεγχος, ρύθμιση και τοποθέτηση αυτόματου ποτίσματος για σωστή χρήση νερού.",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Sprout,
    category: "Φυτεύσεις",
    title: "Φυτεύσεις & διαμόρφωση",
    text: "Επιλογή φυτών, προτάσεις για τον χώρο και διαμόρφωση με βάση τις ανάγκες του κήπου.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
];

const projects = [
  {
    title: "Καθαρισμός εξωτερικού χώρου",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Συντήρηση πρασίνου",
    img: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Περιποίηση φυτών",
    img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Αυτόματο πότισμα",
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
    ["Η εταιρεία", "about"],
    ["Υπηρεσίες", "services"],
    ["Έργα", "projects"],
    ["Αξιολογήσεις", "reviews"],
    ["Επικοινωνία", "contact"],
  ];

  return (
    <>
      <div className="topbar">
        <span><MapPin size={15} /> {contact.area}</span>
        <a href={`tel:${contact.phone.replaceAll(" ", "")}`}><Phone size={15} /> {contact.phone}</a>
        <a href={`tel:${contact.mobile.replaceAll(" ", "")}`}>{contact.mobile}</a>
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
    <main>
      <section id="home" className="hero">
        <div className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1500&q=85"
            alt="Κηπουρικές εργασίες στην Αττική"
          />
          <div className="hero-overlay">
            <span>Κηπουρικές υπηρεσίες εντός Αττικής</span>
            <h1>Οικογενειακή κηπουρική επιχείρηση με 25+ χρόνια εμπειρίας.</h1>
            <p>
              Αναλαμβάνουμε συντήρηση κήπων, κλαδέματα, καθαρισμούς, φυτεύσεις
              και αυτόματο πότισμα με ταχύτητα, συνέπεια και καθαρό αποτέλεσμα.
            </p>
            <div className="hero-actions">
              <button className="green-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Ζητήστε προσφορά
              </button>
              <a className="white-btn" href={`tel:${contact.phone.replaceAll(" ", "")}`}>
                <Phone size={18} /> {contact.phone}
              </a>
            </div>
          </div>
        </div>

        <aside className="quote-panel">
          <span>CONTACT US</span>
          <h2>{contact.phone}</h2>
          <p>Καλέστε μας ή στείλτε αίτημα και θα επικοινωνήσουμε μαζί σας για διαθεσιμότητα και κόστος.</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </aside>
      </section>

      <section className="quick-stats">
        <div><b>25+</b><span>χρόνια εμπειρίας</span></div>
        <div><b>Αττική</b><span>περιοχές εξυπηρέτησης</span></div>
        <div><b>Άμεσα</b><span>επικοινωνία & εκτίμηση</span></div>
        <div><b>{avg}/5</b><span>μέση αξιολόγηση</span></div>
      </section>

      <section id="about" className="about-section">
        <div>
          <span className="eyebrow">A few words about us</span>
          <h2>Επαγγελματική φροντίδα κήπων με εμπειρία και συνέπεια.</h2>
        </div>
        <div>
          <p>
            Η GardenNoir είναι οικογενειακή επιχείρηση που δραστηριοποιείται στις κηπουρικές
            υπηρεσίες εντός Αττικής. Με εμπειρία άνω των 25 ετών, αναλαμβάνουμε εργασίες
            για κατοικίες και επαγγελματικούς χώρους με στόχο την καθαρή εικόνα, τη σωστή
            συντήρηση και την άμεση εξυπηρέτηση.
          </p>
          <button className="green-btn" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            Δείτε υπηρεσίες
          </button>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-title">
          <span>GET A BETTER GARDEN</span>
          <h2>Οι υπηρεσίες μας</h2>
          <p>Από την πιο απλή εργασία μέχρι την ολοκληρωμένη φροντίδα του κήπου.</p>
        </div>

        <div className="service-layout">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                className="service-box"
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <img src={service.image} alt={service.title} />
                <div>
                  <span>{service.category}</span>
                  <Icon />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="why-strip">
        <div>
          <CheckCircle2 />
          <h3>Γρήγορη εξυπηρέτηση</h3>
          <p>Άμεση επικοινωνία και σωστή συνεννόηση για την εργασία.</p>
        </div>
        <div>
          <CheckCircle2 />
          <h3>Καθαρό αποτέλεσμα</h3>
          <p>Ο χώρος παραδίδεται περιποιημένος μετά την ολοκλήρωση.</p>
        </div>
        <div>
          <CheckCircle2 />
          <h3>Πραγματική εμπειρία</h3>
          <p>25+ χρόνια στην κηπουρική και στη συντήρηση εξωτερικών χώρων.</p>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-title">
          <span>Projects</span>
          <h2>Ενδεικτικές εργασίες</h2>
          <p>Εικόνες που δείχνουν το ύφος της δουλειάς: τάξη, καθαριότητα και περιποιημένο αποτέλεσμα.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <img src={project.img} alt={project.title} />
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="slogan">
        <h2>Ένας περιποιημένος κήπος αλλάζει την εικόνα όλου του χώρου.</h2>
        <button className="green-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          Ζητήστε προσφορά
        </button>
      </section>

      <section id="reviews" className="section">
        <div className="section-title">
          <span>Reviews</span>
          <h2>Αξιολογήσεις πελατών</h2>
        </div>

        <div className="reviews-wrap">
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
          <span>CONTACT</span>
          <h2>Request a quote</h2>
          <p>Στείλτε μας τι εργασία χρειάζεστε και θα επικοινωνήσουμε μαζί σας για λεπτομέρειες.</p>

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

          <button className="green-btn"><Send size={18} /> SEND</button>

          {sent && <div className="success">Το αίτημά σας καταχωρήθηκε επιτυχώς. Θα επικοινωνήσουμε μαζί σας σύντομα.</div>}
          {error && <div className="error">{error}</div>}
        </form>
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
    </>
  );
}

function Style() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background: #f7f3ea;
        color: #1d261b;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        overflow-x: hidden;
      }
      button, input, textarea, select { font-family: inherit; }
      button { cursor: pointer; }
      main { background: #f7f3ea; min-height: 100vh; }

      .topbar {
        background: #2f5427;
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
        position: sticky;
        top: 0;
        z-index: 50;
        height: 78px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(250, 246, 237, .94);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid #e2dacb;
        padding: 0 34px;
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
      .brand b { display: block; font-size: 21px; }
      .brand small { display: block; color: #607054; font-weight: 850; }

      .nav {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .nav button {
        border: 0;
        background: transparent;
        color: #263323;
        font-weight: 850;
        padding: 10px 12px;
        border-radius: 999px;
      }
      .nav button:hover { background: #ece3d2; }

      .green-btn, .white-btn, .light-btn, .danger-btn, .link-btn {
        border: 0;
        border-radius: 999px;
        font-weight: 950;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
      }
      .green-btn {
        background: linear-gradient(135deg, #345a28, #5f7f38);
        color: #fff;
        padding: 14px 22px;
        box-shadow: 0 14px 28px rgba(70,107,53,.20);
      }
      .green-btn.small { padding: 10px 14px; }
      .white-btn, .light-btn {
        background: #fff;
        color: #273621;
        padding: 12px 16px;
        border: 1px solid #e0d7c8;
        box-shadow: 0 10px 24px rgba(58,63,47,.06);
      }
      .danger-btn {
        background: #a23b2a;
        color: #fff;
        padding: 10px 14px;
      }
      .link-btn {
        background: transparent;
        color: #345a28;
        margin-top: 10px;
        width: 100%;
      }
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
        top: 78px;
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
        font-weight: 900;
      }

      .hero {
        max-width: 1240px;
        margin: 0 auto;
        padding: 34px 28px 26px;
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 22px;
      }
      .hero-media {
        position: relative;
        min-height: 590px;
        border-radius: 34px;
        overflow: hidden;
        box-shadow: 0 26px 70px rgba(51, 60, 42, .17);
        background: #1f2a1a;
      }
      .hero-media img {
        width: 100%;
        height: 100%;
        min-height: 590px;
        object-fit: cover;
        display: block;
        filter: saturate(1.02);
      }
      .hero-media::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(20,35,19,.78), rgba(20,35,19,.36) 48%, rgba(20,35,19,.18));
      }
      .hero-overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 770px;
        padding: 54px;
        color: #fff;
      }
      .hero-overlay span, .section-title span, .eyebrow, .contact-card span, .admin-head span {
        color: #dff2c8;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: .16em;
        font-weight: 1000;
      }
      .hero-overlay h1 {
        font-size: clamp(42px, 5.4vw, 78px);
        line-height: .98;
        letter-spacing: -2.8px;
        margin: 16px 0;
        color: #fff;
      }
      .hero-overlay p {
        font-size: 19px;
        line-height: 1.75;
        color: rgba(255,255,255,.86);
        max-width: 680px;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 20px;
      }
      .quote-panel {
        background: #fff;
        border: 1px solid #e2dacb;
        border-radius: 34px;
        padding: 28px;
        box-shadow: 0 18px 45px rgba(58,63,47,.10);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .quote-panel span {
        color: #466b35;
        font-weight: 1000;
        letter-spacing: .16em;
        font-size: 12px;
      }
      .quote-panel h2 {
        color: #172214;
        font-size: 34px;
        margin: 14px 0;
      }
      .quote-panel p {
        color: #65705c;
        line-height: 1.7;
      }
      .quote-panel a {
        color: #345a28;
        font-weight: 950;
        text-decoration: none;
        margin-top: 12px;
      }

      .quick-stats {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 28px 56px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
      }
      .quick-stats div {
        background: #fff;
        border: 1px solid #e2dacb;
        border-radius: 22px;
        padding: 22px;
        box-shadow: 0 14px 34px rgba(58,63,47,.07);
      }
      .quick-stats b {
        display: block;
        color: #466b35;
        font-size: 30px;
        margin-bottom: 4px;
      }
      .quick-stats span {
        color: #65705c;
        font-weight: 850;
      }

      .about-section {
        max-width: 1180px;
        margin: 0 auto 26px;
        padding: 44px;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 30px;
        background: #fff;
        border: 1px solid #e2dacb;
        border-radius: 32px;
        box-shadow: 0 18px 45px rgba(58,63,47,.08);
      }
      .about-section h2, .section-title h2, .slogan h2, .contact-card h2, .admin h1 {
        color: #172214;
        font-size: clamp(34px, 4.4vw, 56px);
        line-height: 1.05;
        letter-spacing: -1.9px;
        margin: 12px 0;
      }
      .about-section p, .section-title p, .contact-card p {
        color: #65705c;
        line-height: 1.8;
        font-size: 17px;
      }

      .section {
        max-width: 1180px;
        margin: 0 auto;
        padding: 70px 28px;
      }
      .section-title {
        text-align: center;
        margin-bottom: 30px;
      }
      .section-title span {
        color: #466b35;
      }
      .service-layout {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
      }
      .service-box {
        background: #fff;
        border: 1px solid #e2dacb;
        border-radius: 28px;
        overflow: hidden;
        box-shadow: 0 18px 45px rgba(58,63,47,.08);
        display: grid;
        grid-template-columns: 190px 1fr;
      }
      .service-box img {
        width: 100%;
        height: 100%;
        min-height: 230px;
        object-fit: cover;
      }
      .service-box div {
        padding: 24px;
      }
      .service-box span {
        color: #466b35;
        font-weight: 1000;
        text-transform: uppercase;
        letter-spacing: .12em;
        font-size: 12px;
      }
      .service-box svg {
        color: #466b35;
        display: block;
        margin: 14px 0;
      }
      .service-box h3 {
        color: #1b2817;
        font-size: 24px;
        margin: 0 0 10px;
      }
      .service-box p {
        color: #65705c;
        line-height: 1.65;
      }

      .why-strip {
        max-width: 1180px;
        margin: 0 auto;
        padding: 34px 28px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .why-strip div {
        background: #e8f1dd;
        border: 1px solid #d6e4c8;
        border-radius: 24px;
        padding: 24px;
      }
      .why-strip svg {
        color: #466b35;
      }
      .why-strip h3 {
        color: #172214;
        margin-bottom: 8px;
      }
      .why-strip p {
        color: #65705c;
        line-height: 1.6;
      }

      .project-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
      }
      .project-card {
        background: #fff;
        border: 1px solid #e2dacb;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 14px 34px rgba(58,63,47,.08);
      }
      .project-card img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        display: block;
      }
      .project-card h3 {
        margin: 0;
        padding: 17px;
        color: #1b2817;
        font-size: 19px;
      }

      .slogan {
        max-width: 1180px;
        margin: 20px auto;
        padding: 54px 32px;
        border-radius: 34px;
        background:
          linear-gradient(135deg, rgba(47,84,39,.92), rgba(78,113,55,.90)),
          url("https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1400&q=80");
        background-size: cover;
        background-position: center;
        color: #fff;
        text-align: center;
      }
      .slogan h2 {
        color: #fff;
        max-width: 820px;
        margin: 0 auto 20px;
      }

      .reviews-wrap {
        display: grid;
        grid-template-columns: 1.1fr .9fr;
        gap: 20px;
      }
      .review-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      .review-card, .review-form, .contact-card, .quote-form, .admin-review-box, .message-list, .message-detail, .admin-login-card, .auth-box {
        background: #fff;
        border: 1px solid #e2dacb;
        border-radius: 26px;
        box-shadow: 0 14px 34px rgba(58,63,47,.08);
      }
      .review-card, .review-form {
        padding: 24px;
      }
      .review-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .review-top h3 {
        margin: 0;
        color: #1b2817;
      }
      .review-top small {
        color: #798170;
      }
      .review-card p, .review-form p {
        color: #65705c;
        line-height: 1.7;
      }
      .review-form svg {
        color: #466b35;
      }
      .review-form h3 {
        font-size: 25px;
        color: #172214;
        margin: 10px 0;
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
      .stars .filled {
        color: #d59b21;
      }

      .contact-section {
        max-width: 1180px;
        margin: 0 auto;
        padding: 70px 28px 80px;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 20px;
      }
      .contact-card, .quote-form {
        padding: 30px;
      }
      .contact-card span {
        color: #466b35;
      }
      .contact-card a, .contact-card div {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #f7f3ea;
        color: #1d261b;
        text-decoration: none;
        font-weight: 900;
        padding: 14px;
        border-radius: 16px;
        margin-top: 10px;
      }
      .contact-card svg {
        color: #466b35;
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
        font-weight: 900;
        margin-top: 12px;
      }
      .success {
        background: #e4f2d8;
        color: #2f5427;
      }
      .error {
        background: #f7dfdc;
        color: #8d2f24;
      }

      footer {
        background: #253b20;
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
        font-weight: 1000;
        letter-spacing: .14em;
        text-transform: uppercase;
        font-size: 12px;
      }
      .auth-head h2 {
        margin: 7px 0 0;
        color: #172214;
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
      }
      .admin-login-card p {
        color: #65705c;
      }
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
      .admin-head span {
        color: #466b35;
      }
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
      }
      .admin-section-head span {
        background: #e4f2d8;
        color: #2f5427;
        border-radius: 999px;
        padding: 8px 12px;
        font-weight: 1000;
      }
      .admin-review-list {
        display: grid;
        gap: 12px;
      }
      .admin-review-card {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        background: #f7f3ea;
        border-radius: 18px;
        padding: 16px;
      }
      .admin-review-card h3 {
        margin: 0;
      }
      .admin-review-card p {
        color: #596451;
      }
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
      .approved-mini h3 {
        margin: 0 0 8px;
      }
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
        font-weight: 900;
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
        background: #f7f3ea;
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
        font-weight: 900;
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
      .message-item b {
        display: block;
        font-size: 17px;
      }
      .message-item span {
        color: #65705c;
        font-weight: 850;
      }
      .message-item p {
        color: #596451;
        line-height: 1.5;
      }
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
        font-weight: 1000;
      }
      .empty {
        color: #65705c;
        font-weight: 800;
      }
      .detail-head {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 18px;
      }
      .detail-head h2 {
        margin: 0;
        color: #172214;
      }
      .detail-head p {
        margin: 6px 0 0;
        color: #65705c;
      }
      .detail-info {
        display: grid;
        gap: 10px;
      }
      .detail-info div {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        background: #f7f3ea;
        border-radius: 16px;
        padding: 14px;
        color: #1d261b;
        font-weight: 850;
      }
      .detail-info svg {
        color: #466b35;
      }
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
        .hero, .about-section, .reviews-wrap, .contact-section, .admin-grid { grid-template-columns: 1fr; }
        .quote-panel { order: -1; }
        .service-layout { grid-template-columns: 1fr; }
        .project-grid, .quick-stats, .why-strip { grid-template-columns: repeat(2, 1fr); }
        .review-list { grid-template-columns: 1fr; }
      }
      @media (max-width: 680px) {
        .header { padding: 0 18px; }
        .topbar { justify-content: flex-start; }
        .hero, .section, .contact-section, .admin { padding-left: 18px; padding-right: 18px; }
        .hero-media, .hero-media img { min-height: 610px; }
        .hero-overlay { padding: 30px; justify-content: end; }
        .hero-overlay h1 { font-size: 40px; }
        .quick-stats, .project-grid, .why-strip, .two { grid-template-columns: 1fr; }
        .service-box { grid-template-columns: 1fr; }
        .service-box img { height: 220px; }
        .admin-review-card { flex-direction: column; }
      }
    `}</style>
  );
}
