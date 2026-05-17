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
  Scissors,
  Sprout,
  Droplets,
  Trees,
  Shovel,
  Star,
  Send,
  Lock,
  LogOut,
  Inbox,
  Trash2,
  Eye,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Search,
  UserPlus,
  LogIn,
  Users,
  Database,
  MessageSquareText,
  BadgeCheck,
  ClipboardList,
  Clock3,
  Flower2,
  Wifi,
  WifiOff,
  Wand2,
  CheckCircle2,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);
const supabase = hasSupabase ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "coronavirusc555@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isAdminUser(user) {
  return Boolean(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
}

const localMessagesKey = "gardennoir_messages";
const localReviewsKey = "gardennoir_reviews";
const localUsersKey = "gardennoir_users";
const localSessionKey = "gardennoir_session";

const defaultMessages = [
  {
    id: "demo-1",
    name: "Μαρία",
    surname: "Παπαδοπούλου",
    phone: "6980001111",
    subject: "Θέλω καθάρισμα αυλής και κλάδεμα δύο δέντρων.",
    read: false,
    status: "Νέο",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const defaultReviews = [
  {
    id: "r1",
    name: "Ελένη Κ.",
    rating: 5,
    text: "Η αυλή μας άλλαξε τελείως. Καθαρή δουλειά, ωραίες ιδέες και πολύ προσεγμένη εικόνα.",
    approved: true,
    created_at: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: "r2",
    name: "Παναγιώτης Μ.",
    rating: 5,
    text: "Το αυτόματο πότισμα δουλεύει άψογα. Ο κήπος δείχνει ζωντανός χωρίς να ασχολούμαι κάθε μέρα.",
    approved: true,
    created_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: "r3",
    name: "Σοφία Α.",
    rating: 4,
    text: "Πολύ καλή οργάνωση, καθαρό αποτέλεσμα και ευγενική επικοινωνία από την πρώτη στιγμή.",
    approved: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

const services = [
  {
    icon: Scissors,
    title: "Κλάδεμα ακριβείας",
    tag: "Ασφάλεια & σχήμα",
    text: "Σωστό κλάδεμα δέντρων, θάμνων και φρακτών, ώστε ο κήπος να αναπνέει και να δείχνει καθαρός.",
    steps: ["Έλεγχος φυτού", "Καθαρή κοπή", "Συμμάζεμα χώρου"],
  },
  {
    icon: Sprout,
    title: "Σχεδιασμός φύτευσης",
    tag: "Φυτά που αντέχουν",
    text: "Επιλογή φυτών με βάση ήλιο, σκιά, χώμα και νερό, για όμορφο αποτέλεσμα που κρατάει.",
    steps: ["Μελέτη χώρου", "Πρόταση φυτών", "Φύτευση"],
  },
  {
    icon: Droplets,
    title: "Έξυπνο πότισμα",
    tag: "Λιγότερη σπατάλη",
    text: "Ρύθμιση αυτόματου ποτίσματος για σωστές ώρες, σωστή ποσότητα νερού και υγιή φυτά.",
    steps: ["Έλεγχος δικτύου", "Ρύθμιση ζωνών", "Δοκιμή πίεσης"],
  },
  {
    icon: Trees,
    title: "Premium γκαζόν",
    tag: "Καθαρή εικόνα",
    text: "Κούρεμα, λίπανση και φροντίδα για γκαζόν που φαίνεται περιποιημένο και όχι απλά κομμένο.",
    steps: ["Κούρεμα", "Θρέψη", "Πρόγραμμα συντήρησης"],
  },
  {
    icon: Shovel,
    title: "Καθαρισμός αυλής",
    tag: "Άμεση αλλαγή",
    text: "Απομάκρυνση χόρτων, ξερών κλαδιών και άχρηστων φυτικών υλικών.",
    steps: ["Καθαρισμός", "Σακούλιασμα", "Τελικό φινίρισμα"],
  },
  {
    icon: ShieldCheck,
    title: "Μηνιαία φροντίδα VIP",
    tag: "Χωρίς άγχος",
    text: "Σταθερές επισκέψεις για έλεγχο φυτών, ποτίσματος, γκαζόν και εποχικών εργασιών.",
    steps: ["Πλάνο μήνα", "Εργασίες", "Αναφορά πελάτη"],
  },
];

const projects = [
  {
    title: "Μεταμόρφωση αυλής με γκαζόν",
    category: "Before / After φροντίδα",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Φύτευση εποχικών λουλουδιών",
    category: "Χρώμα χωρίς υπερβολή",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Κλάδεμα και καθάρισμα φράχτη",
    category: "Περιποιημένη περίφραξη",
    img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Μοντέρνα γωνιά χαλάρωσης",
    category: "Αισθητική κήπου",
    img: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Φυσικός κήπος με πέτρα",
    category: "Διαμόρφωση χώρου",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Επαγγελματική φροντίδα φυτών",
    category: "Συντήρηση πρασίνου",
    img: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=1400&q=85",
  },
];

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function formatDate(value) {
  return new Date(value).toLocaleString("el-GR");
}

function BackendBadge({ backendMode }) {
  return (
    <motion.div
      className={`backend-badge ${backendMode === "supabase" ? "ok" : "demo"}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.04, y: -2 }}
    >
      {backendMode === "supabase" ? <Wifi size={15} /> : <WifiOff size={15} />}
      {backendMode === "supabase" ? "Supabase backend ενεργό" : "Demo mode: localStorage"}
    </motion.div>
  );
}

function AnimatedBackground() {
  const particles = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  return (
    <div className="animated-bg">
      <motion.div
        className="aurora aurora-a"
        animate={{ x: [0, 90, -30, 0], y: [0, -40, 60, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora aurora-b"
        animate={{ x: [0, -80, 40, 0], y: [0, 60, -50, 0], scale: [1, 0.9, 1.18, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora aurora-c"
        animate={{ rotate: [0, 20, -12, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((p) => (
        <motion.span
          key={p}
          className="particle"
          style={{
            left: `${(p * 17) % 100}%`,
            top: `${(p * 23) % 100}%`,
            width: 4 + (p % 5) * 2,
            height: 4 + (p % 5) * 2,
          }}
          animate={{
            y: [0, -40, 15, 0],
            x: [0, p % 2 ? 18 : -18, 4, 0],
            opacity: [0.1, 0.55, 0.25, 0.1],
            scale: [1, 1.55, 0.8, 1],
          }}
          transition={{ duration: 7 + p * 0.25, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ClickBloom({ x, y, id }) {
  return (
    <motion.div
      className="click-bloom"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 1, rotate: 0 }}
      animate={{ scale: 1.8, opacity: 0, rotate: 110 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((p) => (
          <span key={`${id}-${p}`} style={{ transform: `rotate(${p * 45}deg) translateY(-18px)` }} />
        ))}
        <b />
      </div>
    </motion.div>
  );
}

function Header({ view, setView, currentUser, setCurrentUser, openAuth }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    setView("site");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem(localSessionKey);
    setCurrentUser(null);
  };

  const nav = [
    ["Αρχική", "home"],
    ["Υπηρεσίες", "services"],
    ["Έργα", "projects"],
    ["Αξιολογήσεις", "reviews"],
    ["Επικοινωνία", "contact"],
  ];

  return (
    <motion.header
      className="header"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <button className="brand" onClick={() => go("home")}>
        <motion.span className="brand-icon" whileHover={{ rotate: 14, scale: 1.08 }} whileTap={{ scale: 0.94 }}>
          <Leaf size={24} />
        </motion.span>
        <span>
          <b>GardenNoir</b>
          <small>κηπουρικές υπηρεσίες</small>
        </span>
      </button>

      <nav className="nav desktop">
        {nav.map(([label, id]) => (
          <motion.button key={id} onClick={() => go(id)} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            {label}
          </motion.button>
        ))}

        {currentUser ? (
          <motion.button className="signup-btn" onClick={logout} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            {currentUser.name} / Logout
          </motion.button>
        ) : (
          <>
            <motion.button className="login-btn" onClick={() => openAuth("login")} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
              <LogIn size={16} /> Login
            </motion.button>
            <motion.button className="signup-btn" onClick={() => openAuth("signup")} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
              <UserPlus size={16} /> Sign Up
            </motion.button>
          </>
        )}
      </nav>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>{label}</button>
            ))}
            {currentUser ? (
              <button onClick={logout}>{currentUser.name} / Logout</button>
            ) : (
              <>
                <button onClick={() => openAuth("login")}>Login</button>
                <button onClick={() => openAuth("signup")}>Sign Up</button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function AuthModal({ type, setType, onClose, users, setUsers, setCurrentUser }) {
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

    try {
      if (supabase) {
        if (type === "signup") {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
          });

          if (error) throw error;

          if (data.user) {
            await supabase.from("profiles").upsert({
              id: data.user.id,
              name,
              email,
            });
          }

          if (data.session) {
            setCurrentUser({ id: data.user.id, name, email });
            onClose();
          } else {
            setInfo("Ο λογαριασμός δημιουργήθηκε. Αν ζητά email confirmation, έλεγξε το email σου και μετά κάνε Login.");
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;

          const user = data.user;
          setCurrentUser({
            id: user.id,
            name: user.user_metadata?.name || user.email.split("@")[0],
            email: user.email,
          });
          onClose();
        }
      } else {
        if (type === "signup") {
          if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
            setError("Υπάρχει ήδη λογαριασμός με αυτό το email.");
            setLoading(false);
            return;
          }

          const user = { id: crypto.randomUUID(), name, email, password };
          const next = [user, ...users];
          setUsers(next);
          saveLocal(localUsersKey, next);
          saveLocal(localSessionKey, user);
          setCurrentUser(user);
          onClose();
        } else {
          const user = users.find((u) => u.email === email && u.password === password);
          if (!user) {
            setError("Λάθος email ή κωδικός.");
            setLoading(false);
            return;
          }
          saveLocal(localSessionKey, user);
          setCurrentUser(user);
          onClose();
        }
      }
    } catch (err) {
      setError(err.message || "Κάτι πήγε λάθος.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form
        className="auth-box"
        onSubmit={submit}
        initial={{ y: 60, scale: 0.9, opacity: 0, rotateX: 8 }}
        animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ y: 40, scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        <div className="auth-head">
          <div>
            <p>Πρόσβαση πελάτη</p>
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

        <button className="main-btn" disabled={loading}>
          {loading ? <><RefreshCw className="spin" size={18} /> Περίμενε...</> : type === "signup" ? "Sign Up" : "Login"}
        </button>

        <button
          className="switch-auth"
          type="button"
          onClick={() => setType(type === "signup" ? "login" : "signup")}
        >
          {type === "signup" ? "Έχω ήδη λογαριασμό — Login" : "Δεν έχω λογαριασμό — Sign Up"}
        </button>
      </motion.form>
    </motion.div>
  );
}

function Stars({ rating, setRating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button key={n} type="button" onClick={() => setRating?.(n)} whileHover={{ scale: 1.22, rotate: 8 }} whileTap={{ scale: 0.88 }}>
          <Star className={n <= rating ? "star-filled" : "star-empty"} fill={n <= rating ? "currentColor" : "none"} />
        </motion.button>
      ))}
    </div>
  );
}

function SiteView({ messages, setMessages, reviews, setReviews, currentUser, openAuth, backendMode }) {
  const [form, setForm] = useState({ name: "", surname: "", phone: "", subject: "" });
  const [reviewForm, setReviewForm] = useState({ name: "", text: "" });
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [error, setError] = useState("");

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
    : "0.0";

  const submitMessage = async (e) => {
    e.preventDefault();
    setError("");

    const clean = {
      name: form.name.trim(),
      surname: form.surname.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
    };

    if (!clean.name || !clean.surname || !clean.phone || !clean.subject) {
      setError("Συμπλήρωσε όλα τα πεδία.");
      return;
    }

    try {
      if (supabase) {
        const newMessage = {
          id: crypto.randomUUID(),
          ...clean,
          read: false,
          status: "Νέο",
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("messages")
          .insert({
            ...clean,
            read: false,
            status: "Νέο",
          });

        if (error) throw error;

        if (isAdminUser(currentUser)) {
          setMessages((prev) => [newMessage, ...prev]);
        }
      } else {
        const next = [
          {
            id: crypto.randomUUID(),
            ...clean,
            read: false,
            status: "Νέο",
            created_at: new Date().toISOString(),
          },
          ...messages,
        ];
        setMessages(next);
        saveLocal(localMessagesKey, next);
      }

      setForm({ name: "", surname: "", phone: "", subject: "" });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err.message || "Δεν στάλθηκε το μήνυμα.");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");

    const name = currentUser?.name || reviewForm.name.trim();
    const text = reviewForm.text.trim();

    if (!name || !text) {
      setError("Συμπλήρωσε όνομα και αξιολόγηση.");
      return;
    }

    try {
      if (supabase) {
        const newReview = {
          id: crypto.randomUUID(),
          name,
          text,
          rating,
          approved: false,
          user_id: currentUser?.id || null,
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("reviews")
          .insert({
            name,
            text,
            rating,
            approved: false,
            user_id: currentUser?.id || null,
          });

        if (error) throw error;

        if (isAdminUser(currentUser)) {
          setReviews((prev) => [newReview, ...prev]);
        }
      } else {
        const next = [
          {
            id: crypto.randomUUID(),
            name,
            text,
            rating,
            approved: false,
            created_at: new Date().toISOString(),
          },
          ...reviews,
        ];
        setReviews(next);
        saveLocal(localReviewsKey, next);
      }

      setReviewForm({ name: "", text: "" });
      setRating(5);
      setReviewSent(true);
      setTimeout(() => setReviewSent(false), 3000);
    } catch (err) {
      setError(err.message || "Δεν δημοσιεύτηκε η αξιολόγηση.");
    }
  };

  return (
    <main>
      <section id="home" className="hero">
        <div className="hero-grid">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <motion.div className="pill" initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
              <Sparkles size={16} /> Κηπουρικές εργασίες με συνέπεια
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
              Οικογενειακή κηπουρική επιχείρηση με 25+ χρόνια εμπειρίας.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
              Αναλαμβάνουμε κλαδέματα, καθαρισμούς, φυτεύσεις, αυτόματο πότισμα και συντήρηση κήπων σε όλη την Αττική, με ταχύτητα, συνέπεια και επαγγελματικό αποτέλεσμα.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <motion.button className="main-btn" whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.94 }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Ζητήστε προσφορά <ChevronRight size={20} />
              </motion.button>
              <motion.button className="ghost-btn" whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.94 }} onClick={() => currentUser ? document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }) : openAuth("signup")}>
                <UserPlus size={18} /> Δημιουργία λογαριασμού
              </motion.button>
            </motion.div>

            <motion.div className="stats" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              {[
                ["25+", "χρόνια εμπειρίας"],
                ["Αττική", "περιοχές εξυπηρέτησης"],
                [average, "οικογενειακή εμπειρία"],
              ].map(([n, t]) => (
                <motion.div key={t} whileHover={{ y: -6, scale: 1.03, rotate: -0.5 }}>
                  <b>{n}</b><span>{t}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-card"
            initial={{ opacity: 0, scale: 0.9, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=1400&q=85"
              alt="GardenNoir"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div className="image-caption" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.75 }}>
              <b>Άμεση επικοινωνία</b>
              <span>Ερχόμαστε στον χώρο σας, βλέπουμε την εργασία και προτείνουμε καθαρή λύση χωρίς υπερβολές.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section business-proof">
        <div className="proof-main">
          <span className="eyebrow">Εμπειρία & εμπιστοσύνη</span>
          <h2>25+ χρόνια επαγγελματικής εμπειρίας στην κηπουρική.</h2>
          <p>
            Η GardenNoir είναι οικογενειακή επιχείρηση που αναλαμβάνει κηπουρικές εργασίες
            σε όλη την Αττική. Δίνουμε έμφαση στη συνέπεια, στην καθαρή παράδοση του χώρου
            και στην άμεση επικοινωνία με τον πελάτη.
          </p>
        </div>
        <div className="proof-points">
          <div><CheckCircle2 /><b>Άμεση εξυπηρέτηση</b><span>Γρήγορη επικοινωνία και καθαρή συνεννόηση.</span></div>
          <div><CheckCircle2 /><b>Επαγγελματικό αποτέλεσμα</b><span>Περιποιημένη εικόνα και καθαρός χώρος μετά την εργασία.</span></div>
          <div><CheckCircle2 /><b>Εντός Αττικής</b><span>Εξυπηρέτηση σε κατοικίες και επαγγελματικούς χώρους.</span></div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-head">
          <span>Υπηρεσίες</span>
          <h2>Οργανωμένες κηπουρικές υπηρεσίες για σπίτια και επαγγελματικούς χώρους.</h2>
          <p>Από μικρές αυλές μέχρι μεγάλους εξωτερικούς χώρους, η δουλειά γίνεται με συνέπεια και σωστή οργάνωση.</p>
        </div>

        <div className="cards">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                className="service-card"
                key={s.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, rotateX: 2, rotateY: i % 2 ? 2 : -2 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
              >
                <motion.div className="card-shine" animate={{ x: ["-120%", "150%"] }} transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.35 }} />
                <div className="service-top">
                  <motion.div className="service-icon" whileHover={{ rotate: 9, scale: 1.07 }}><Icon /></motion.div>
                  <span>{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="steps">
                  {s.steps.map((step, idx) => (
                    <motion.div key={step} whileHover={{ x: 6 }}>
                      <b>{idx + 1}</b>{step}
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section why">
        <div>
          <span>Γιατί βοηθάει</span>
          <h2>Με εμπειρία 25+ ετών, προσφέρουμε καθαρή εικόνα, σωστή συντήρηση και άμεση εξυπηρέτηση εντός Αττικής.</h2>
        </div>
        <div className="why-grid">
          {[
            "Μειώνει τον κίνδυνο από ξερά χόρτα και παρατημένους χώρους.",
            "Κρατά τα φυτά υγιή με σωστό κλάδεμα και πότισμα.",
            "Κάνει την αυλή πιο όμορφη για οικογένεια και επισκέπτες.",
            "Εξοικονομεί χρόνο από δύσκολες και βαριές εργασίες.",
            "Δημιουργεί καλύτερη πρώτη εντύπωση σε σπίτι ή επαγγελματικό χώρο.",
            "Προλαμβάνει ακριβά λάθη, όπως λάθος φυτά ή υπερβολικό νερό.",
          ].map((item, i) => (
            <motion.div className="why-item" key={item} initial={{ opacity: 0, x: i % 2 ? 25 : -25 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ x: 8, scale: 1.02 }} viewport={{ once: true }}>
              <ShieldCheck />
              <p>{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-head center">
          <span>Έργα</span>
          <h2>Ενδεικτικές εργασίες κήπου</h2>
          <p>Ενδεικτικές εικόνες που δείχνουν το ύφος των υπηρεσιών μας: καθαριότητα, τάξη και περιποιημένο αποτέλεσμα.</p>
        </div>

        <div className="gallery">
          {projects.map((p, i) => (
            <motion.article className="project-card" key={p.title} whileHover={{ y: -10, scale: 1.02 }} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <img src={p.img} alt={p.title} />
              <div>
                <span>{p.category}</span>
                <h3>{p.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="reviews" className="section reviews-section">
        <div className="reviews-head">
          <div>
            <span>Αξιολογήσεις</span>
            <h2>Τι λένε οι πελάτες μας.</h2>
          </div>
          <motion.div className="rating-box" whileHover={{ scale: 1.04, rotate: -1 }}>
            <b>{average}/5</b>
            <span>{reviews.length} αξιολογήσεις</span>
          </motion.div>
        </div>

        <div className="reviews-grid">
          <div className="review-list">
            <AnimatePresence>
              {reviews.map((r, i) => (
                <motion.div className="review-card" key={r.id} layout initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -7, rotate: i % 2 ? 0.5 : -0.5 }}>
                  <div className="review-top">
                    <div>
                      <h3>{r.name}</h3>
                      <small>{formatDate(r.created_at)}</small>
                    </div>
                    <BadgeCheck />
                  </div>
                  <Stars rating={Number(r.rating)} />
                  <p>“{r.text}”</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.form className="review-form" onSubmit={submitReview} whileHover={{ y: -4 }}>
            <Flower2 size={36} />
            <h3>Γράψε αξιολόγηση</h3>
            <p>Η αξιολόγησή σας ελέγχεται πριν δημοσιευτεί, ώστε να διατηρούμε την ποιότητα και την αξιοπιστία των σχολίων.</p>

            {!currentUser ? (
              <input
                placeholder="Το όνομά σου"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              />
            ) : (
              <div className="logged-note">Συνδεδεμένος ως {currentUser.name}</div>
            )}

            <Stars rating={rating} setRating={setRating} />

            <textarea
              rows="5"
              placeholder="Πώς ήταν η δουλειά του κηπουρού;"
              value={reviewForm.text}
              onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
            />

            <button className="main-btn">Δημοσίευση αξιολόγησης</button>
            {reviewSent && <div className="success">Η αξιολόγησή σας καταχωρήθηκε και θα εμφανιστεί μετά από έλεγχο.</div>}
          </motion.form>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span>Επικοινωνία</span>
          <h2>Ζητήστε προσφορά για τον χώρο σας.</h2>
          <p>Στείλτε μας τι εργασία χρειάζεστε και θα επικοινωνήσουμε μαζί σας για κόστος, διαθεσιμότητα και λεπτομέρειες.</p>

          <a href="tel:+302101234567"><Phone /> 210 123 4567</a>
          <a href="mailto:alexioukipouros@gmail.com"><Mail /> alexioukipouros@gmail.com</a>
          <div><MapPin /> Εξυπηρέτηση εντός Αττικής</div>
        </motion.div>

        <motion.form className="contact-form" onSubmit={submitMessage} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="two">
            <input placeholder="Όνομα" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Επίθετο" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
          </div>

          <input placeholder="Τηλέφωνο" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <textarea
            rows="6"
            placeholder="Τι δουλειά χρειάζεται η αυλή;"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <button className="main-btn"><Send size={18} /> Αποστολή αιτήματος</button>

          {sent && <div className="success">Το αίτημά σας καταχωρήθηκε επιτυχώς. Θα επικοινωνήσουμε μαζί σας σύντομα.</div>}
          {error && <div className="error">{error}</div>}
        </motion.form>
      </section>

      <footer>
        © 2026 GardenNoir — Κηπουρικές υπηρεσίες εντός Αττικής.
      </footer>
    </main>
  );
}

function AdminView({ messages, setMessages, reviews, setReviews, users, backendMode, currentUser, openAuth }) {
  const adminAllowed = isAdminUser(currentUser);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Όλα");
  const [selected, setSelected] = useState(null);

  const unread = messages.filter((m) => !m.read).length;
  const avg = reviews.length ? (reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length).toFixed(1) : "0.0";

  const filtered = messages.filter((m) => {
    const text = `${m.name} ${m.surname} ${m.phone} ${m.subject}`.toLowerCase();
    const okSearch = text.includes(search.toLowerCase());
    const okFilter = filter === "Όλα" || m.status === filter;
    return okSearch && okFilter;
  });

  const updateMessage = async (id, data) => {
    if (supabase) {
      const { error } = await supabase.from("messages").update(data).eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }

    const next = messages.map((m) => (m.id === id ? { ...m, ...data } : m));
    setMessages(next);
    if (!supabase) saveLocal(localMessagesKey, next);
    if (selected?.id === id) setSelected({ ...selected, ...data });
  };

  const deleteMessage = async (id) => {
    if (supabase) {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }

    const next = messages.filter((m) => m.id !== id);
    setMessages(next);
    if (!supabase) saveLocal(localMessagesKey, next);
    setSelected(null);
  };

  const approveReview = async (id) => {
    if (supabase) {
      const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }

    const next = reviews.map((r) => (r.id === id ? { ...r, approved: true } : r));
    setReviews(next);
    if (!supabase) saveLocal(localReviewsKey, next);
  };

  const hideReview = async (id) => {
    if (supabase) {
      const { error } = await supabase.from("reviews").update({ approved: false }).eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }

    const next = reviews.map((r) => (r.id === id ? { ...r, approved: false } : r));
    setReviews(next);
    if (!supabase) saveLocal(localReviewsKey, next);
  };

  const deleteReview = async (id) => {
    if (supabase) {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }

    const next = reviews.filter((r) => r.id !== id);
    setReviews(next);
    if (!supabase) saveLocal(localReviewsKey, next);
  };

  const pendingReviews = reviews.filter((r) => r.approved === false);


  if (!adminAllowed) {
    return (
      <main className="admin-login">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <span>Admin Διαχείριση</span>
          <h1>Ιδιωτική πρόσβαση διαχειριστή.</h1>
          <p>Η πρόσβαση σε αυτή την περιοχή επιτρέπεται μόνο σε εξουσιοδοτημένο διαχειριστή.</p>
          {currentUser ? (
            <p className="error">Το email <b>{currentUser.email}</b> δεν έχει δικαιώματα admin.</p>
          ) : (
            <p>Δεν είσαι συνδεδεμένος.</p>
          )}
        </motion.div>

        <motion.div className="admin-access-card" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
          <Lock size={44} />
          <h2>Admin Login</h2>
          <p>Χρησιμοποίησε το εξουσιοδοτημένο email διαχείρισης.</p>
          <button className="main-btn" onClick={() => openAuth("login")}>Login ως admin</button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="admin">
      <div className="admin-head">
        <div>
          <span>Διαχείριση</span>
          <h1>GardenNoir Admin</h1>
        </div>
        <div className="admin-user-pill">
          <ShieldCheck size={18} />
          {currentUser?.email}
        </div>
      </div>

      <div className="admin-stats">
        {[
          [Inbox, messages.length, "Αιτήματα"],
          [Eye, unread, "Αδιάβαστα"],
          [Users, users.length, "Μέλη"],
          [BarChart3, avg, "Rating"],
          [Database, backendMode, "Backend"],
        ].map(([Icon, n, t]) => (
          <motion.div key={t} whileHover={{ y: -7, scale: 1.03 }}>
            <Icon /><b>{n}</b><span>{t}</span>
          </motion.div>
        ))}
      </div>

      <section className="review-moderation">
        <div className="moderation-head">
          <div>
            <span>Review Approval</span>
            <h2>Κριτικές που περιμένουν έγκριση</h2>
          </div>
          <b>{pendingReviews.length} pending</b>
        </div>

        {pendingReviews.length === 0 ? (
          <p className="empty">Δεν υπάρχουν κριτικές για έγκριση.</p>
        ) : (
          <div className="moderation-list">
            {pendingReviews.map((r) => (
              <motion.div className="moderation-card" key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}>
                <div>
                  <h3>{r.name}</h3>
                  <small>{formatDate(r.created_at)}</small>
                  <Stars rating={Number(r.rating)} />
                  <p>“{r.text}”</p>
                </div>
                <div className="moderation-actions">
                  <button className="approve-btn" onClick={() => approveReview(r.id)}>Έγκριση</button>
                  <button className="delete-btn small" onClick={() => deleteReview(r.id)}>Διαγραφή</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="approved-reviews-mini">
          <h3>Εγκεκριμένες κριτικές</h3>
          {reviews.filter((r) => r.approved !== false).slice(0, 4).map((r) => (
            <div className="approved-mini-row" key={r.id}>
              <span>{r.name} — {r.rating}/5</span>
              <button onClick={() => hideReview(r.id)}>Κρύψε</button>
            </div>
          ))}
        </div>
      </section>

      <div className="admin-grid">
        <section className="admin-list">
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Αναζήτηση..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="filters">
            {["Όλα", "Νέο", "Σε επικοινωνία", "Κλεισμένο"].map((f) => (
              <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <AnimatePresence>
            {filtered.map((m) => (
              <motion.button
                className={`message-item ${selected?.id === m.id ? "selected" : ""}`}
                key={m.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileHover={{ y: -3 }}
                onClick={() => {
                  setSelected(m);
                  updateMessage(m.id, { read: true });
                }}
              >
                <b>{m.name} {m.surname}</b>
                <span>{m.phone}</span>
                <p>{m.subject}</p>
                {!m.read && <em>Νέο</em>}
              </motion.button>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && <p className="empty">Δεν βρέθηκαν μηνύματα.</p>}
        </section>

        <section className="admin-detail">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="detail-head">
                  <div>
                    <span>Customer Request</span>
                    <h2>{selected.name} {selected.surname}</h2>
                  </div>
                  <button className="delete-btn" onClick={() => deleteMessage(selected.id)}><Trash2 /></button>
                </div>

                <div className="detail-cards">
                  <div><Phone /><span>Τηλέφωνο</span><b>{selected.phone}</b></div>
                  <div><Clock3 /><span>Ημερομηνία</span><b>{formatDate(selected.created_at)}</b></div>
                  <div><ClipboardList /><span>Status</span><b>{selected.status}</b></div>
                </div>

                <div className="subject-box">
                  <span>Θέμα εργασίας</span>
                  <p>{selected.subject}</p>
                </div>

                <div className="status-buttons">
                  {["Νέο", "Σε επικοινωνία", "Κλεισμένο"].map((s) => (
                    <button key={s} className={selected.status === s ? "active" : ""} onClick={() => updateMessage(selected.id, { status: s })}>
                      {s}
                    </button>
                  ))}
                </div>

                <div className="admin-actions">
                  <a href={`tel:${selected.phone}`}>Κλήση πελάτη</a>
                  <a href="mailto:alexioukipouros@gmail.com?subject=Απάντηση στο αίτημά σας">Απάντηση email</a>
                </div>
              </motion.div>
            ) : (
              <motion.div className="no-selected" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MessageSquareText size={64} />
                <h2>Διάλεξε ένα αίτημα</h2>
                <p>Το admin panel λειτουργεί σαν μικρό CRM για τον κηπουρό.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState(() => window.location.hash === "#admin" ? "admin" : "site");
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [backendMode, setBackendMode] = useState(hasSupabase ? "supabase" : "localStorage");
  const [blooms, setBlooms] = useState([]);

  useEffect(() => {
    async function load() {
      if (supabase) {
        try {
          const { data: rev, error: revErr } = await supabase
            .from("reviews")
            .select("*")
            .eq("approved", true)
            .order("created_at", { ascending: false });

          if (revErr) throw revErr;

          setMessages([]);
          setReviews((rev && rev.length) ? rev : defaultReviews);
          setBackendMode("supabase");

          const { data } = await supabase.auth.getSession();
          const user = data.session?.user;
          if (user) {
            setCurrentUser({
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split("@")[0],
            });
          }
        } catch (err) {
          console.error(err);
          setMessages(readLocal(localMessagesKey, defaultMessages));
          setReviews(readLocal(localReviewsKey, defaultReviews));
          setUsers(readLocal(localUsersKey, []));
          setBackendMode("localStorage");
        }
      } else {
        setMessages(readLocal(localMessagesKey, defaultMessages));
        setReviews(readLocal(localReviewsKey, defaultReviews));
        setUsers(readLocal(localUsersKey, []));
        const session = readLocal(localSessionKey, null);
        if (session) setCurrentUser(session);
      }
    }

    load();

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

  useEffect(() => {
    const handler = (e) => {
      if (!e.target?.closest?.("button,a,input,textarea")) return;
      const id = crypto.randomUUID();
      setBlooms((old) => [...old, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBlooms((old) => old.filter((item) => item.id !== id)), 900);
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!supabase || !isAdminUser(currentUser)) return;

    async function loadAdminData() {
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
        console.error("Admin data load failed:", err);
        alert("Δεν φορτώθηκαν τα admin δεδομένα. Έλεγξε τα Supabase RLS policies.");
      }
    }

    loadAdminData();
  }, [currentUser?.email]);

  useEffect(() => {
    const syncHashRoute = () => {
      setView(window.location.hash === "#admin" ? "admin" : "site");
    };

    syncHashRoute();
    window.addEventListener("hashchange", syncHashRoute);
    return () => window.removeEventListener("hashchange", syncHashRoute);
  }, []);

  const openAuth = (type) => setAuthType(type);

  return (
    <>
      <Style />
      <div className="app">
        <AnimatedBackground />

        <Header
          view={view}
          setView={setView}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          openAuth={openAuth}
        />

        <AnimatePresence mode="wait">
          {view === "site" ? (
            <motion.div key="site" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }}>
              <SiteView
                messages={messages}
                setMessages={setMessages}
                reviews={reviews.filter((r) => r.approved !== false)}
                setReviews={setReviews}
                currentUser={currentUser}
                openAuth={openAuth}
                backendMode={backendMode}
              />
            </motion.div>
          ) : (
            <motion.div key="admin" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }}>
              <AdminView
                messages={messages}
                setMessages={setMessages}
                reviews={reviews}
                setReviews={setReviews}
                users={users}
                backendMode={backendMode}
                currentUser={currentUser}
                openAuth={openAuth}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {authType && (
            <AuthModal
              type={authType}
              setType={setAuthType}
              onClose={() => setAuthType(null)}
              users={users}
              setUsers={setUsers}
              setCurrentUser={setCurrentUser}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {blooms.map((b) => <ClickBloom key={b.id} {...b} />)}
        </AnimatePresence>
      </div>
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
        overflow-x: hidden;
        background:
          radial-gradient(circle at 10% 14%, rgba(72, 112, 55, .18), transparent 25%),
          radial-gradient(circle at 90% 18%, rgba(179, 143, 83, .13), transparent 25%),
          radial-gradient(circle at 50% 0%, rgba(255, 255, 255, .75), transparent 34%),
          linear-gradient(180deg, #f8f3e8 0%, #f1eadc 58%, #f7f3ea 100%);
        color: #1d261b;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body::before,
      body::after {
        content: "";
        position: fixed;
        top: 0;
        bottom: 0;
        width: clamp(110px, 14vw, 280px);
        pointer-events: none;
        z-index: 0;
        opacity: .85;
      }
      body::before {
        left: 0;
        background:
          radial-gradient(circle at left 16%, rgba(62, 99, 45, .20), transparent 45%),
          radial-gradient(circle at left 58%, rgba(181, 143, 82, .10), transparent 43%),
          linear-gradient(180deg, rgba(70,107,53,.08) 0%, transparent 34%, rgba(70,107,53,.06) 72%, transparent 100%);
      }
      body::after {
        right: 0;
        background:
          radial-gradient(circle at right 18%, rgba(62, 99, 45, .18), transparent 44%),
          radial-gradient(circle at right 66%, rgba(181, 143, 82, .11), transparent 42%),
          linear-gradient(180deg, rgba(70,107,53,.04) 0%, transparent 28%, rgba(70,107,53,.07) 74%, transparent 100%);
      }
      button, input, textarea { font-family: inherit; }
      button { cursor: pointer; }

      .app, main {
        position: relative;
        z-index: 1;
        background: transparent;
        min-height: 100vh;
      }

      .animated-bg,
      .aurora,
      .particle,
      .click-bloom {
        display: none !important;
      }

      .top-contact-bar {
        position: relative;
        z-index: 60;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 26px;
        background: linear-gradient(135deg, #345a28, #466b35);
        color: #fff;
        font-size: 14px;
        font-weight: 850;
      }
      .top-contact-bar span {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        white-space: nowrap;
      }
      .top-contact-bar svg {
        color: #e6f4d8;
      }

      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        height: 78px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(250, 246, 237, .88);
        backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(140, 124, 95, .18);
        box-shadow: 0 10px 30px rgba(48, 55, 39, .05);
        padding: 0 34px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        border: 0;
        background: transparent;
        color: #21351f;
        text-align: left;
      }
      .brand-icon {
        width: 48px;
        height: 48px;
        border-radius: 17px;
        background: linear-gradient(135deg, #345a28, #6f8f44);
        color: #fff;
        display: grid;
        place-items: center;
        box-shadow: 0 12px 24px rgba(70, 107, 53, .18);
      }
      .brand b { display: block; font-size: 20px; color: #1d261b; }
      .brand small { display: block; color: #6a7b55; font-weight: 800; }

      .nav { display: flex; align-items: center; gap: 8px; }
      .nav button, .mobile-menu button {
        border: 0;
        background: transparent;
        color: #263323;
        font-weight: 800;
        padding: 10px 13px;
        border-radius: 999px;
      }
      .nav button:hover, .mobile-menu button:hover { background: #ece3d2; color: #263323; }
      .admin-btn { display: none !important; }
      .login-btn, .soft-btn {
        background: #eee6d8 !important;
        color: #273621 !important;
        border: 0 !important;
      }
      .signup-btn, .main-btn {
        background: linear-gradient(135deg, #345a28, #5f7f38) !important;
        color: #fff !important;
        border: 0 !important;
        box-shadow: 0 14px 28px rgba(70,107,53,.20);
      }
      .main-btn, .ghost-btn {
        border-radius: 999px;
        padding: 14px 22px;
        font-weight: 900;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
      }
      .ghost-btn {
        background: rgba(255,255,255,.78);
        color: #273621;
        border: 1px solid rgba(158, 139, 103, .22);
        box-shadow: 0 12px 26px rgba(58,63,47,.07);
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
        top: 76px;
        left: 0;
        right: 0;
        background: #f7f3ea;
        border-bottom: 1px solid #e2dacb;
        padding: 12px 20px;
        display: grid;
        gap: 6px;
      }
      .mobile-menu button {
        text-align: left;
        border-radius: 12px;
      }

      .hero {
        position: relative;
        min-height: auto;
        max-width: 1220px;
        margin: 0 auto;
        padding: 74px 28px 54px;
        display: grid;
        align-items: center;
      }
      .hero::before {
        content: "";
        position: absolute;
        inset: 28px 14px 8px;
        border-radius: 42px;
        background:
          linear-gradient(135deg, rgba(255,255,255,.62), rgba(255,255,255,.18)),
          radial-gradient(circle at 22% 18%, rgba(112, 143, 77, .18), transparent 32%);
        border: 1px solid rgba(146, 127, 91, .16);
        box-shadow: 0 30px 90px rgba(62, 71, 51, .08);
        z-index: -1;
      }
      .hero-grid {
        display: grid;
        grid-template-columns: 1.05fr .95fr;
        gap: 44px;
        align-items: center;
      }
      .pill, .section-head span, .why span, .reviews-head span, .contact-info span, .admin-head span, .admin-login span {
        color: #466b35;
        text-transform: uppercase;
        letter-spacing: .16em;
        font-size: 12px;
        font-weight: 1000;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(234, 242, 223, .82);
        border: 1px solid rgba(114, 143, 86, .22);
        color: #36572b;
        border-radius: 999px;
        padding: 10px 14px;
        text-transform: none;
        letter-spacing: 0;
        font-size: 14px;
        box-shadow: 0 12px 28px rgba(70,107,53,.08);
      }

      h1 {
        font-size: clamp(42px, 6vw, 72px);
        line-height: 1;
        letter-spacing: -2.8px;
        margin: 18px 0;
        color: #172214;
        max-width: 820px;
      }
      .hero p {
        color: #586650;
        font-size: 19px;
        line-height: 1.7;
        max-width: 680px;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 14px;
        margin-top: 28px;
      }

      .stats {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        max-width: 620px;
      }
      .stats div {
        background: rgba(255,255,255,.82);
        border: 1px solid rgba(158, 139, 103, .20);
        border-radius: 20px;
        padding: 17px;
        box-shadow: 0 14px 34px rgba(58,63,47,.07);
      }
      .stats b {
        display: block;
        color: #466b35;
        font-size: 27px;
      }
      .stats span {
        color: #6a715e;
        font-size: 13px;
        font-weight: 800;
      }

      .hero-image-card {
        position: relative;
        background: rgba(255,255,255,.82);
        border: 1px solid rgba(158, 139, 103, .22);
        border-radius: 34px;
        padding: 10px;
        box-shadow: 0 28px 70px rgba(58,63,47,.16);
        overflow: hidden;
      }
      .hero-image-card::before { display: none; }
      .hero-image-card img {
        width: 100%;
        height: 520px;
        border-radius: 24px;
        object-fit: cover;
        display: block;
      }
      .image-caption {
        position: static;
        background: transparent;
        border: 0;
        padding: 16px 12px 8px;
        color: #273621;
        backdrop-filter: none;
      }
      .image-caption b {
        color: #466b35;
        display: block;
        margin-bottom: 6px;
      }
      .image-caption span {
        color: #273621;
        font-weight: 850;
        font-size: 17px;
      }

      .business-proof {
        max-width: 1180px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 22px;
        align-items: stretch;
      }
      .proof-main,
      .proof-points {
        background: rgba(255,255,255,.88);
        border: 1px solid rgba(158, 139, 103, .20);
        border-radius: 30px;
        box-shadow: 0 18px 45px rgba(58,63,47,.09);
        padding: 32px;
      }
      .proof-main h2 {
        color: #172214;
        font-size: clamp(30px, 4vw, 46px);
        line-height: 1.08;
        letter-spacing: -1.6px;
        margin: 12px 0;
      }
      .proof-main p {
        color: #65705c;
        line-height: 1.75;
        font-size: 17px;
      }
      .proof-points {
        display: grid;
        gap: 12px;
      }
      .proof-points div {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 12px;
        row-gap: 4px;
        background: #f7f3ea;
        border: 1px solid #eee4d5;
        border-radius: 18px;
        padding: 16px;
      }
      .proof-points svg {
        grid-row: span 2;
        color: #466b35;
        margin-top: 2px;
      }
      .proof-points b {
        color: #1b2817;
      }
      .proof-points span {
        color: #65705c;
        font-weight: 760;
        line-height: 1.5;
      }

      .section {
        max-width: 1180px;
        margin: 0 auto;
        padding: 70px 28px;
      }
      .section h2, .why h2, .reviews-head h2, .contact-info h2, .admin h1, .admin-login h1 {
        font-size: clamp(32px, 4vw, 50px);
        letter-spacing: -1.8px;
        line-height: 1.06;
        margin: 12px 0 0;
        color: #172214;
      }
      .section-head { margin-bottom: 28px; }
      .section-head p, .why p, .contact-info p {
        color: #65705c;
        line-height: 1.7;
        font-size: 17px;
      }

      .cards, .gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .service-card, .review-card, .review-form, .contact-form, .contact-info, .admin-list, .admin-detail, .admin-stats div, .auth-box, .admin-login form, .admin-access-card, .review-moderation {
        background: rgba(255,255,255,.86);
        border: 1px solid rgba(158, 139, 103, .20);
        border-radius: 26px;
        backdrop-filter: blur(10px);
        box-shadow: 0 18px 45px rgba(58,63,47,.09);
      }

      .service-card {
        padding: 24px;
        position: relative;
        overflow: hidden;
      }
      .card-shine { display: none; }
      .service-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 18px;
      }
      .service-icon {
        width: 54px;
        height: 54px;
        display: grid;
        place-items: center;
        border-radius: 16px;
        background: #eaf2df;
        color: #466b35;
      }
      .service-top span {
        color: #466b35;
        font-size: 12px;
        font-weight: 900;
        background: #f3eadb;
        padding: 8px 10px;
        border-radius: 999px;
      }
      .service-card h3 {
        font-size: 22px;
        margin: 0 0 10px;
        color: #1b2817;
      }
      .service-card p {
        color: #65705c;
        line-height: 1.65;
      }
      .steps { display: none; }

      .why {
        display: grid;
        grid-template-columns: .85fr 1.15fr;
        gap: 28px;
        background: linear-gradient(135deg, rgba(255,255,255,.88), rgba(246,241,230,.78));
        border: 1px solid rgba(158, 139, 103, .20);
        border-radius: 32px;
        padding: 42px;
        box-shadow: 0 22px 54px rgba(58,63,47,.08);
      }
      .why-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .why-item {
        display: flex;
        gap: 10px;
        padding: 16px;
        border-radius: 18px;
        background: #f7f3ea;
        border: 1px solid #eee4d5;
      }
      .why-item svg { color: #466b35; flex: 0 0 auto; margin-top: 3px; }
      .why-item p {
        margin: 0;
        color: #4f5d47;
        font-weight: 760;
      }

      .project-card {
        position: relative;
        overflow: hidden;
        height: auto;
        border-radius: 26px;
        border: 1px solid rgba(158, 139, 103, .20);
        background: rgba(255,255,255,.86);
        box-shadow: 0 18px 45px rgba(58,63,47,.09);
      }
      .project-card img {
        width: 100%;
        height: 280px;
        object-fit: cover;
        display: block;
        transition: .3s;
      }
      .project-card:hover img { transform: scale(1.03); }
      .project-card::after { display: none; }
      .project-card div {
        position: static;
        padding: 18px;
      }
      .project-card span {
        color: #466b35;
        font-weight: 900;
      }
      .project-card h3 {
        color: #1b2817;
        margin: 8px 0 0;
        font-size: 21px;
      }

      .reviews-section {
        background: transparent;
        border: 0;
        border-radius: 0;
        margin-bottom: 0;
      }
      .reviews-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 24px;
      }
      .rating-box {
        background: #466b35;
        color: #fff;
        padding: 18px 22px;
        border-radius: 22px;
        min-width: 150px;
      }
      .rating-box b { display: block; font-size: 34px; color: #fff; }
      .rating-box span { font-weight: 900; color: #fff; }
      .reviews-grid {
        display: grid;
        grid-template-columns: 1.1fr .9fr;
        gap: 22px;
      }
      .review-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      .review-card {
        padding: 22px;
      }
      .review-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .review-top h3 { margin: 0; color: #1b2817; }
      .review-top small { color: #798170; font-weight: 800; }
      .review-top svg { color: #466b35; }
      .stars {
        display: flex;
        gap: 3px;
        margin: 10px 0;
      }
      .stars button {
        border: 0;
        padding: 0;
        background: transparent;
        color: inherit;
      }
      .stars svg { width: 18px; height: 18px; }
      .star-filled { color: #d59b21; }
      .star-empty { color: #c7b98e; }
      .review-card p {
        color: #596451;
        line-height: 1.7;
      }
      .review-form {
        padding: 26px;
      }
      .review-form svg { color: #466b35; }
      .review-form h3 {
        color: #1b2817;
        font-size: 25px;
        margin: 10px 0;
      }
      .review-form p {
        color: #65705c;
        line-height: 1.6;
      }

      input, textarea {
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
      input:focus, textarea:focus {
        border-color: #466b35;
        box-shadow: 0 0 0 4px rgba(70,107,53,.12);
      }
      input::placeholder, textarea::placeholder { color: #8f9488; }

      .logged-note, .success, .error {
        padding: 13px 15px;
        border-radius: 15px;
        font-weight: 900;
        margin: 12px 0;
      }
      .logged-note, .success {
        background: #e4f2d8;
        color: #2f5427;
      }
      .error {
        background: #f7dfdc;
        color: #8d2f24;
      }

      .contact-section {
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 20px;
      }
      .contact-info, .contact-form {
        padding: 30px;
      }
      .contact-info a, .contact-info div:not(:first-child) {
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
      .contact-info svg { color: #466b35; }
      .two {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      footer {
        max-width: 1180px;
        margin: 0 auto;
        padding: 32px 28px 50px;
        text-align: center;
        color: #65705c;
        border-top: 1px solid #e2dacb;
      }

      .backend-badge { display: none !important; }

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
        background: #fff;
        border-radius: 26px;
        border: 1px solid #e2dacb;
        padding: 26px;
        box-shadow: 0 24px 70px rgba(0,0,0,.18);
      }
      .auth-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 18px;
      }
      .auth-head p {
        margin: 0;
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
      .switch-auth {
        width: 100%;
        background: transparent;
        color: #466b35;
        border: 0;
        margin-top: 12px;
        font-weight: 900;
      }
      .spin { animation: spin 1s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }

      .admin-login {
        min-height: calc(100vh - 76px);
        display: grid;
        place-items: center;
        padding: 40px 20px;
      }
      .admin-login form, .admin-access-card {
        padding: 34px;
        max-width: 520px;
        width: 100%;
      }
      .admin-access-card svg, .admin-login svg {
        color: #466b35;
        margin-bottom: 12px;
      }
      .admin-access-card h2 {
        margin: 0 0 10px;
        color: #172214;
      }
      .admin-access-card p {
        color: #65705c;
        line-height: 1.6;
      }
      .admin-user-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #fff;
        background: #466b35;
        border-radius: 999px;
        padding: 12px 16px;
        font-weight: 1000;
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
      .admin-head p {
        color: #65705c;
        margin: 8px 0 0;
      }
      .admin-stats {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 14px;
        margin-bottom: 22px;
      }
      .admin-stats div {
        padding: 18px;
      }
      .admin-stats svg { color: #466b35; margin-bottom: 10px; }
      .admin-stats b { display: block; font-size: 24px; color: #1b2817; }
      .admin-stats span { color: #65705c; font-weight: 900; font-size: 13px; }
      .review-moderation {
        padding: 24px;
        margin-bottom: 20px;
      }
      .moderation-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 18px;
        margin-bottom: 18px;
      }
      .moderation-head h2 {
        margin: 8px 0 0;
        font-size: 30px;
        color: #172214;
      }
      .moderation-head b {
        background: #e4f2d8;
        color: #2f5427;
        padding: 10px 14px;
        border-radius: 999px;
      }
      .moderation-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      .moderation-card {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        background: #f7f3ea;
        border: 1px solid #eee4d5;
        padding: 18px;
        border-radius: 18px;
      }
      .moderation-card h3 { margin: 0; color: #1b2817; }
      .moderation-card small { color: #798170; font-weight: 800; }
      .moderation-card p { color: #596451; line-height: 1.6; }
      .moderation-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 110px;
      }
      .approve-btn {
        border: 0;
        background: #466b35;
        color: #fff;
        border-radius: 999px;
        padding: 11px 14px;
        font-weight: 1000;
      }
      .delete-btn {
        background: #a23b2a;
        color: #fff;
        border: 0;
        border-radius: 999px;
        padding: 11px 14px;
        font-weight: 1000;
      }
      .approved-reviews-mini {
        margin-top: 18px;
        border-top: 1px solid #e2dacb;
        padding-top: 18px;
      }
      .approved-mini-row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 0;
        border-bottom: 1px solid #eee7db;
        color: #596451;
        font-weight: 800;
      }
      .approved-mini-row button {
        border: 0;
        background: #eee6d8;
        color: #273621;
        border-radius: 999px;
        padding: 8px 12px;
        font-weight: 900;
      }

      .admin-grid {
        display: grid;
        grid-template-columns: .95fr 1.05fr;
        gap: 20px;
      }
      .admin-list, .admin-detail {
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
      .search-box svg { color: #466b35; }
      .search-box input {
        background: transparent;
        border: 0;
        margin: 0;
        box-shadow: none;
      }
      .filters, .status-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 14px;
      }
      .filters button, .status-buttons button {
        border: 0;
        border-radius: 999px;
        background: #eee6d8;
        color: #273621;
        padding: 10px 13px;
        font-weight: 900;
      }
      .filters .active, .status-buttons .active {
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
      .message-item span { color: #65705c; font-weight: 850; }
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
        font-weight: 1000;
      }
      .empty { color: #65705c; font-weight: 800; }
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
      .detail-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 14px;
      }
      .detail-cards div {
        background: #f7f3ea;
        border-radius: 16px;
        padding: 14px;
      }
      .detail-cards svg { color: #466b35; margin-bottom: 7px; }
      .detail-cards span { display: block; color: #65705c; font-weight: 900; font-size: 12px; }
      .detail-cards b { display: block; margin-top: 4px; color: #1d261b; }
      .subject-box {
        background: #f7f3ea;
        color: #1d261b;
        border-radius: 18px;
        padding: 20px;
        margin-bottom: 14px;
      }
      .subject-box span {
        color: #466b35;
        font-weight: 1000;
        text-transform: uppercase;
        letter-spacing: .12em;
        font-size: 12px;
      }
      .subject-box p {
        font-size: 17px;
        font-weight: 800;
        line-height: 1.7;
      }
      .admin-actions {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .admin-actions a {
        background: #eee6d8;
        color: #273621;
        text-decoration: none;
        text-align: center;
        padding: 14px;
        border-radius: 999px;
        font-weight: 1000;
      }
      .admin-actions a:first-child {
        background: #466b35;
        color: #fff;
      }
      .no-selected {
        height: 100%;
        display: grid;
        place-items: center;
        text-align: center;
        color: #65705c;
      }
      .no-selected svg { color: #466b35; margin: 0 auto 18px; }


      @media (max-width: 1200px) {
        body::before,
        body::after {
          width: 90px;
          opacity: .55;
        }
      }
      @media (max-width: 980px) {
        .top-contact-bar {
          height: auto;
          padding: 9px 12px;
          flex-wrap: wrap;
          gap: 10px 16px;
          font-size: 13px;
        }
        .business-proof { grid-template-columns: 1fr; }

        .desktop { display: none; }
        .menu-btn { display: block; }
        .hero-grid, .why, .reviews-grid, .contact-section, .admin-grid, .admin-login { grid-template-columns: 1fr; }
        .cards, .gallery, .review-list, .moderation-list { grid-template-columns: repeat(2, 1fr); }
        .admin-stats { grid-template-columns: repeat(2, 1fr); }
        .hero-image-card img { height: 400px; }
      }
      @media (max-width: 640px) {
        .header { padding: 0 18px; }
        .hero, .section, .admin { padding-left: 18px; padding-right: 18px; }
        h1 { font-size: 42px; }
        .stats, .cards, .gallery, .review-list, .why-grid, .two, .detail-cards, .status-buttons, .admin-actions, .moderation-list { grid-template-columns: 1fr; }
        .reviews-head, .admin-head, .detail-head, .moderation-head { flex-direction: column; align-items: stretch; }
        .moderation-card { flex-direction: column; }
      }
    `}</style>
  );
}