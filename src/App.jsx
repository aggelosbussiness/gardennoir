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

const ADMIN_PASSWORD = "garden123";

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
          <small>premium garden care</small>
        </span>
      </button>

      <nav className="nav desktop">
        {nav.map(([label, id]) => (
          <motion.button key={id} onClick={() => go(id)} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
            {label}
          </motion.button>
        ))}

        <motion.button className="admin-btn" onClick={() => setView(view === "admin" ? "site" : "admin")} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
          Admin Panel
        </motion.button>

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
            <button onClick={() => setView(view === "admin" ? "site" : "admin")}>Admin Panel</button>
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
            <p>Client Access</p>
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
        const { data, error } = await supabase
          .from("messages")
          .insert({
            ...clean,
            read: false,
            status: "Νέο",
          })
          .select()
          .single();

        if (error) throw error;
        setMessages((prev) => [data, ...prev]);
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
        const { data, error } = await supabase
          .from("reviews")
          .insert({
            name,
            text,
            rating,
            approved: false,
            user_id: currentUser?.id || null,
          })
          .select()
          .single();

        if (error) throw error;
        setReviews((prev) => [data, ...prev]);
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
              <Sparkles size={16} /> Premium φροντίδα κήπου στην Αθήνα
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
              Η Τέχνη του Κήπου, στο πιο σκοτεινά κομψό της πρόσωπο.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
              Η GardenNoir δημιουργεί και συντηρεί αυλές που φαίνονται ακριβές,
              ήρεμες και ζωντανές. Όχι απλά κηπουρική — εμπειρία χώρου.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <motion.button className="main-btn" whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.94 }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Ζήτα προσφορά <ChevronRight size={20} />
              </motion.button>
              <motion.button className="ghost-btn" whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.94 }} onClick={() => currentUser ? document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }) : openAuth("signup")}>
                <UserPlus size={18} /> Γίνε μέλος πελατών
              </motion.button>
            </motion.div>

            <motion.div className="stats" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              {[
                ["12+", "χρόνια εμπειρίας"],
                ["480+", "κήποι"],
                [average, "μέση αξιολόγηση"],
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
              <b>Garden Signature Scan</b>
              <span>Πρώτη εκτίμηση με πλάνο εργασιών και ιδέες αναβάθμισης</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-head">
          <span>Υπηρεσίες</span>
          <h2>Οργανωμένη κηπουρική με πλάνο, όχι πρόχειρες δουλειές.</h2>
          <p>Κάθε υπηρεσία έχει διαδικασία, καθαρό αποτέλεσμα και σκοπό.</p>
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
          <h2>Ένας σωστός κηπουρός κάνει τον χώρο να πουλάει συναίσθημα.</h2>
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
          <h2>Αληθινές εικόνες κηπουρικής για έμπνευση</h2>
          <p>Φωτογραφίες από πραγματικούς χώρους κηπουρικής στο διαδίκτυο.</p>
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
            <h2>Οι πελάτες αφήνουν τη δική τους εμπειρία.</h2>
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
            <p>Η αξιολόγηση αποθηκεύεται και θα εμφανιστεί μόνο αφού την εγκρίνει ο διαχειριστής.</p>

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
            {reviewSent && <div className="success">Η αξιολόγηση στάλθηκε για έγκριση!</div>}
          </motion.form>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span>Επικοινωνία</span>
          <h2>Κλείσε εκτίμηση για την αυλή σου.</h2>
          <p>Στείλε τι χρειάζεσαι και ο κηπουρός θα επικοινωνήσει για λεπτομέρειες, κόστος και διαθέσιμες ημερομηνίες.</p>

          <a href="tel:+302101234567"><Phone /> 210 123 4567</a>
          <a href="mailto:hello@gardennoir.gr"><Mail /> hello@gardennoir.gr</a>
          <div><MapPin /> Οδός Κυπαρισσιού 18, Χαλάνδρι</div>
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

          {sent && <div className="success">Το μήνυμα στάλθηκε και εμφανίζεται στο Admin Panel.</div>}
          {error && <div className="error">{error}</div>}
        </motion.form>
      </section>

      <footer>
        © 2026 GardenNoir — Επαγγελματική κηπουρική με dark premium αισθητική.
      </footer>
    </main>
  );
}

function AdminView({ messages, setMessages, reviews, setReviews, users, backendMode }) {
  const [logged, setLogged] = useState(sessionStorage.getItem("gardennoir_admin") === "yes");
  const [password, setPassword] = useState("");
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

  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("gardennoir_admin", "yes");
      setLogged(true);
    } else {
      alert("Λάθος κωδικός. Δοκίμασε: garden123");
    }
  };

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


  if (!logged) {
    return (
      <main className="admin-login">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <span>Admin Command Center</span>
          <h1>Το control room του κηπουρού.</h1>
          <p>Backend: <b>{backendMode}</b></p>
          
        </motion.div>

        <motion.form onSubmit={login} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }}>
          <Lock size={44} />
          <input
            type="password"
            placeholder="Κωδικός admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="main-btn">Είσοδος</button>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="admin">
      <div className="admin-head">
        <div>
          <span>Command Center</span>
          <h1>GardenNoir Admin</h1>
        </div>
        <button
          className="ghost-btn"
          onClick={() => {
            sessionStorage.removeItem("gardennoir_admin");
            setLogged(false);
          }}
        >
          <LogOut size={18} /> Έξοδος
        </button>
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
                  <a href="mailto:hello@gardennoir.gr?subject=Απάντηση στο αίτημά σας">Απάντηση email</a>
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
  const [view, setView] = useState("site");
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
          const [{ data: msg, error: msgErr }, { data: rev, error: revErr }] = await Promise.all([
            supabase.from("messages").select("*").order("created_at", { ascending: false }),
            supabase.from("reviews").select("*").order("created_at", { ascending: false }),
          ]);

          if (msgErr) throw msgErr;
          if (revErr) throw revErr;

          setMessages(msg || []);
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

  const openAuth = (type) => setAuthType(type);

  return (
    <>
      <Style />
      <div className="app">
        <AnimatedBackground />

        <BackendBadge backendMode={backendMode} />

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
        background: #030805;
        color: #fff;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      button, input, textarea { font-family: inherit; }
      button { cursor: pointer; }
      .app { min-height: 100vh; background: #030805; overflow-x: hidden; position: relative; }
      .animated-bg { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; background: radial-gradient(circle at 20% 5%, rgba(132,204,22,.12), transparent 32%), radial-gradient(circle at 90% 15%, rgba(16,185,129,.12), transparent 28%), #030805; }
      .aurora { position: absolute; border-radius: 999px; filter: blur(80px); opacity: .35; }
      .aurora-a { width: 430px; height: 430px; background: #22c55e; left: -160px; top: 90px; }
      .aurora-b { width: 460px; height: 460px; background: #84cc16; right: -170px; bottom: 60px; }
      .aurora-c { width: 360px; height: 360px; background: #14b8a6; left: 40%; bottom: -140px; opacity: .18; }
      .particle { position: absolute; border-radius: 999px; background: rgba(190,242,100,.32); box-shadow: 0 0 20px rgba(190,242,100,.35); }
      .click-bloom { position: fixed; z-index: 999; pointer-events: none; }
      .click-bloom div { position: relative; width: 48px; height: 48px; left: -24px; top: -24px; }
      .click-bloom span { position: absolute; left: 50%; top: 50%; width: 7px; height: 20px; border-radius: 999px; background: rgba(190,242,100,.75); transform-origin: bottom; box-shadow: 0 0 18px rgba(190,242,100,.7); }
      .click-bloom b { position: absolute; left: 50%; top: 50%; width: 12px; height: 12px; transform: translate(-50%, -50%); border-radius: 999px; background: white; }
      .header {
        position: fixed; top: 0; left: 0; right: 0; z-index: 50;
        height: 78px; display: flex; align-items: center; justify-content: space-between;
        padding: 0 28px; background: rgba(0,0,0,.58); backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }
      .brand { display: flex; align-items: center; gap: 12px; border: 0; background: transparent; color: #fff; }
      .brand-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 18px; background: #bef264; color: #052e16; box-shadow: 0 0 30px rgba(190,242,100,.22); }
      .brand b { display: block; font-size: 20px; }
      .brand small { color: #bef264; font-weight: 700; }
      .nav { display: flex; align-items: center; gap: 8px; }
      .nav button, .mobile-menu button {
        border: 0; color: rgba(255,255,255,.82); background: transparent; font-weight: 800;
        padding: 10px 14px; border-radius: 999px; transition: .2s;
      }
      .nav button:hover, .mobile-menu button:hover { background: rgba(255,255,255,.09); color: #fff; transform: translateY(-1px); }
      .admin-btn { border: 1px solid rgba(190,242,100,.25) !important; color: #d9f99d !important; background: rgba(255,255,255,.06) !important; }
      .login-btn { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,.08) !important; }
      .signup-btn { display: flex; align-items: center; gap: 7px; background: #bef264 !important; color: #052e16 !important; }
      .menu-btn { display: none; background: rgba(255,255,255,.1); color: #fff; border: 0; padding: 10px; border-radius: 14px; }
      .mobile-menu { position: absolute; top: 78px; left: 0; right: 0; background: rgba(0,0,0,.96); border-bottom: 1px solid rgba(255,255,255,.1); padding: 16px; display: flex; flex-direction: column; }
      main { position: relative; z-index: 1; }
      .hero { min-height: 100vh; padding: 130px 28px 80px; display: grid; align-items: center; }
      .hero-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.05fr .95fr; gap: 44px; align-items: center; }
      .pill, .section-head span, .why span, .reviews-head span, .contact-info span, .admin-head span, .admin-login span {
        display: inline-flex; align-items: center; gap: 8px; color: #bef264; text-transform: uppercase; letter-spacing: .22em; font-weight: 1000; font-size: 12px;
      }
      .pill { padding: 10px 15px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(190,242,100,.2); text-transform: none; letter-spacing: 0; font-size: 14px; }
      h1 { font-size: clamp(48px, 7vw, 86px); line-height: .92; margin: 24px 0; letter-spacing: -3px; max-width: 900px; }
      .hero p { color: rgba(236,253,245,.7); line-height: 1.8; font-size: 18px; max-width: 680px; }
      .hero-actions { margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap; }
      .main-btn, .ghost-btn {
        border: 0; border-radius: 20px; padding: 15px 22px; font-weight: 1000; display: inline-flex; align-items: center; justify-content: center; gap: 9px; transition: .2s; text-decoration: none;
      }
      .main-btn { background: #bef264; color: #052e16; box-shadow: 0 16px 44px rgba(190,242,100,.13); }
      .ghost-btn { background: rgba(255,255,255,.08); color: #fff; border: 1px solid rgba(255,255,255,.1); }
      .stats { margin-top: 34px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 620px; }
      .stats div { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); padding: 18px; border-radius: 24px; }
      .stats b { display: block; color: #bef264; font-size: 28px; }
      .stats span { color: rgba(236,253,245,.65); font-size: 13px; font-weight: 800; }
      .hero-image-card { position: relative; border: 1px solid rgba(190,242,100,.22); background: rgba(255,255,255,.06); padding: 9px; border-radius: 42px; box-shadow: 0 35px 80px rgba(0,0,0,.45); overflow: hidden; }
      .hero-image-card::before { content: ""; position: absolute; inset: -2px; background: linear-gradient(120deg, transparent, rgba(190,242,100,.22), transparent); transform: translateX(-100%); animation: sweep 5s infinite; z-index: 2; pointer-events: none; }
      @keyframes sweep { 0% { transform: translateX(-120%); } 40%,100% { transform: translateX(120%); } }
      .hero-image-card img { width: 100%; height: 560px; object-fit: cover; display: block; border-radius: 34px; }
      .image-caption { position: absolute; left: 30px; right: 30px; bottom: 30px; padding: 22px; border-radius: 28px; background: rgba(0,0,0,.55); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(12px); z-index: 3; }
      .image-caption b { color: #bef264; display: block; margin-bottom: 6px; }
      .image-caption span { color: #fff; font-weight: 900; font-size: 20px; }
      .section { max-width: 1200px; margin: 0 auto; padding: 90px 28px; }
      .section-head { margin-bottom: 42px; }
      .section-head.center { text-align: center; }
      .section h2, .why h2, .reviews-head h2, .contact-info h2, .admin h1, .admin-login h1 { font-size: clamp(34px, 5vw, 58px); line-height: 1; letter-spacing: -2px; margin: 12px 0 16px; }
      .section-head p, .why p, .contact-info p { color: rgba(236,253,245,.65); line-height: 1.7; }
      .cards, .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
      .service-card, .review-card, .review-form, .contact-form, .contact-info, .admin-list, .admin-detail, .admin-stats div, .auth-box, .admin-login form {
        background: rgba(255,255,255,.065); border: 1px solid rgba(255,255,255,.1); border-radius: 34px; backdrop-filter: blur(14px); box-shadow: 0 20px 50px rgba(0,0,0,.22);
      }
      .service-card { padding: 26px; position: relative; overflow: hidden; transform-style: preserve-3d; }
      .card-shine { position: absolute; top: 0; bottom: 0; width: 70px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent); transform: skewX(-18deg); pointer-events: none; }
      .service-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 18px; }
      .service-icon { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 20px; background: #bef264; color: #052e16; }
      .service-top span { color: #d9f99d; font-size: 12px; font-weight: 1000; background: rgba(255,255,255,.08); padding: 8px 10px; border-radius: 999px; }
      .service-card h3 { font-size: 24px; margin: 0 0 10px; }
      .service-card p { color: rgba(236,253,245,.65); line-height: 1.65; }
      .steps { margin-top: 18px; display: grid; gap: 9px; }
      .steps div { display: flex; align-items: center; gap: 9px; color: rgba(236,253,245,.82); font-weight: 800; font-size: 14px; }
      .steps b { width: 25px; height: 25px; border-radius: 999px; background: rgba(255,255,255,.1); color: #bef264; display: grid; place-items: center; }
      .why { display: grid; grid-template-columns: .75fr 1.25fr; gap: 40px; background: rgba(190,242,100,.04); border: 1px solid rgba(190,242,100,.14); border-radius: 46px; }
      .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
      .why-item { display: flex; gap: 12px; padding: 18px; border-radius: 22px; background: rgba(0,0,0,.28); border: 1px solid rgba(255,255,255,.08); }
      .why-item svg { color: #bef264; flex: 0 0 auto; margin-top: 3px; }
      .why-item p { margin: 0; color: rgba(236,253,245,.85); font-weight: 800; }
      .project-card { position: relative; overflow: hidden; height: 330px; border-radius: 34px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.06); }
      .project-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: .6s; }
      .project-card:hover img { transform: scale(1.1); }
      .project-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.88), transparent 62%); }
      .project-card div { position: absolute; left: 22px; right: 22px; bottom: 22px; z-index: 2; }
      .project-card span { color: #bef264; font-weight: 900; }
      .project-card h3 { margin: 7px 0 0; font-size: 24px; }
      .reviews-section { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 48px; margin-bottom: 70px; }
      .reviews-head { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 34px; }
      .rating-box { background: #bef264; color: #052e16; padding: 22px; border-radius: 28px; min-width: 160px; }
      .rating-box b { display: block; font-size: 38px; }
      .rating-box span { font-weight: 900; }
      .reviews-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 22px; }
      .review-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      .review-card { padding: 22px; }
      .review-top { display: flex; justify-content: space-between; gap: 12px; }
      .review-top h3 { margin: 0; }
      .review-top small { color: rgba(236,253,245,.45); font-weight: 800; }
      .review-top svg { color: #bef264; }
      .stars { display: flex; gap: 4px; margin: 12px 0; }
      .stars button { background: transparent; border: 0; color: inherit; padding: 0; }
      .stars svg { width: 19px; height: 19px; }
      .star-filled { color: #fbbf24; }
      .star-empty { color: rgba(255,255,255,.24); }
      .review-card p { color: rgba(236,253,245,.75); line-height: 1.7; }
      .review-form { padding: 26px; }
      .review-form svg { color: #bef264; }
      .review-form h3 { font-size: 28px; margin: 10px 0; }
      .review-form p { color: rgba(236,253,245,.62); line-height: 1.6; }
      input, textarea {
        width: 100%; border: 1px solid rgba(255,255,255,.1); background: rgba(0,0,0,.35);
        color: #fff; border-radius: 18px; padding: 15px; outline: none; margin-bottom: 12px; resize: none;
      }
      input:focus, textarea:focus { border-color: rgba(190,242,100,.45); box-shadow: 0 0 0 4px rgba(190,242,100,.08); }
      .logged-note, .success, .error { padding: 13px 15px; border-radius: 18px; font-weight: 900; margin: 12px 0; }
      .logged-note, .success { background: rgba(190,242,100,.14); color: #d9f99d; }
      .error { background: rgba(239,68,68,.15); color: #fecaca; }
      .contact-section { display: grid; grid-template-columns: .85fr 1.15fr; gap: 24px; }
      .contact-info, .contact-form { padding: 32px; }
      .contact-info a, .contact-info div:not(:first-child) { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 20px; background: rgba(255,255,255,.07); color: #fff; text-decoration: none; margin-top: 12px; font-weight: 900; }
      .contact-info svg { color: #bef264; }
      .two { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
      footer { text-align: center; padding: 32px 20px; color: rgba(236,253,245,.45); border-top: 1px solid rgba(255,255,255,.08); }
      .backend-badge { position: fixed; left: 18px; bottom: 18px; z-index: 80; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 999px; font-size: 12px; font-weight: 1000; backdrop-filter: blur(12px); }
      .backend-badge.ok { background: rgba(190,242,100,.12); border: 1px solid rgba(190,242,100,.25); color: #d9f99d; }
      .backend-badge.demo { background: rgba(251,191,36,.12); border: 1px solid rgba(251,191,36,.25); color: #fde68a; }
      .modal-bg { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,.72); backdrop-filter: blur(8px); display: grid; place-items: center; padding: 20px; }
      .auth-box { width: 100%; max-width: 460px; padding: 28px; }
      .auth-head { display: flex; justify-content: space-between; gap: 14px; margin-bottom: 20px; }
      .auth-head p { margin: 0; color: #bef264; font-weight: 1000; letter-spacing: .16em; text-transform: uppercase; font-size: 12px; }
      .auth-head h2 { margin: 7px 0 0; font-size: 30px; }
      .auth-head button { background: rgba(255,255,255,.09); color: #fff; border: 0; border-radius: 14px; padding: 8px; height: 42px; }
      .switch-auth { width: 100%; background: transparent; color: rgba(236,253,245,.7); border: 0; margin-top: 12px; font-weight: 900; }
      .spin { animation: spin 1s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .admin-login { min-height: 100vh; max-width: 1000px; margin: 0 auto; padding: 140px 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; }
      .admin-login form { padding: 32px; }
      .admin-login svg { color: #bef264; margin-bottom: 18px; }
      .admin { max-width: 1200px; margin: 0 auto; padding: 120px 28px 80px; }
      .admin-head { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 24px; }
      .admin-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 22px; }
      .admin-stats div { padding: 18px; }
      .admin-stats svg { color: #bef264; margin-bottom: 10px; }
      .admin-stats b { display: block; font-size: 24px; }
      .admin-stats span { color: rgba(236,253,245,.55); font-weight: 900; font-size: 13px; }
      .admin-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 22px; }
      .admin-list, .admin-detail { padding: 22px; min-height: 560px; }
      .search-box { display: flex; align-items: center; gap: 10px; padding: 0 14px; background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; margin-bottom: 14px; }
      .search-box svg { color: #bef264; }
      .search-box input { margin: 0; background: transparent; border: 0; box-shadow: none; }
      .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
      .filters button, .status-buttons button { border: 0; background: rgba(255,255,255,.08); color: #fff; padding: 10px 13px; border-radius: 999px; font-weight: 1000; }
      .filters .active, .status-buttons .active { background: #bef264; color: #052e16; }
      .message-item { width: 100%; text-align: left; color: #fff; position: relative; border: 0; background: rgba(0,0,0,.35); border-radius: 24px; padding: 18px; margin-bottom: 10px; transition: .2s; }
      .message-item:hover, .message-item.selected { background: #bef264; color: #052e16; transform: translateY(-2px); }
      .message-item b { display: block; font-size: 17px; }
      .message-item span { display: block; opacity: .65; font-weight: 900; margin-top: 3px; }
      .message-item p { margin: 10px 0 0; line-height: 1.5; opacity: .75; }
      .message-item em { position: absolute; top: 12px; right: 12px; background: #fbbf24; color: #451a03; border-radius: 999px; padding: 5px 9px; font-style: normal; font-weight: 1000; font-size: 12px; }
      .empty { color: rgba(236,253,245,.55); text-align: center; padding: 30px; font-weight: 900; }
      .detail-head { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
      .detail-head span, .subject-box span { color: #bef264; font-weight: 1000; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; }
      .detail-head h2 { font-size: 34px; margin: 6px 0 0; }
      .delete-btn { background: rgba(239,68,68,.14); color: #fecaca; border: 1px solid rgba(239,68,68,.2); border-radius: 18px; padding: 12px; height: 52px; }
      .detail-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 14px; }
      .detail-cards div { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.08); border-radius: 22px; padding: 16px; }
      .detail-cards svg { color: #bef264; margin-bottom: 7px; }
      .detail-cards span { display: block; color: rgba(236,253,245,.52); font-weight: 900; font-size: 12px; }
      .detail-cards b { display: block; margin-top: 4px; }
      .subject-box { background: #fff; color: #052e16; border-radius: 26px; padding: 22px; margin-bottom: 14px; }
      .subject-box p { font-size: 18px; font-weight: 800; line-height: 1.7; }
      .status-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
      .admin-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
      .admin-actions a { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); color: #fff; text-decoration: none; text-align: center; padding: 15px; border-radius: 18px; font-weight: 1000; }
      .admin-actions a:first-child { background: #bef264; color: #052e16; }
      .no-selected { height: 100%; display: grid; place-items: center; text-align: center; color: rgba(236,253,245,.62); }
      .no-selected svg { color: #bef264; margin: 0 auto 18px; }

      .review-moderation {
        margin-bottom: 22px;
        background: rgba(255,255,255,.065);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 34px;
        backdrop-filter: blur(14px);
        box-shadow: 0 20px 50px rgba(0,0,0,.22);
        padding: 24px;
      }
      .moderation-head { display: flex; justify-content: space-between; align-items: end; gap: 18px; margin-bottom: 18px; }
      .moderation-head span { color: #bef264; font-weight: 1000; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; }
      .moderation-head h2 { margin: 8px 0 0; font-size: 30px; letter-spacing: -1px; }
      .moderation-head b { background: #bef264; color: #052e16; padding: 10px 14px; border-radius: 999px; }
      .moderation-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
      .moderation-card { display: flex; justify-content: space-between; gap: 18px; background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.08); padding: 18px; border-radius: 24px; }
      .moderation-card h3 { margin: 0; }
      .moderation-card small { color: rgba(236,253,245,.45); font-weight: 800; }
      .moderation-card p { color: rgba(236,253,245,.75); line-height: 1.6; margin-bottom: 0; }
      .moderation-actions { display: flex; flex-direction: column; gap: 10px; min-width: 110px; }
      .approve-btn { border: 0; background: #bef264; color: #052e16; border-radius: 16px; padding: 11px 14px; font-weight: 1000; }
      .delete-btn.small { height: auto; padding: 11px 14px; }
      .approved-reviews-mini { margin-top: 18px; border-top: 1px solid rgba(255,255,255,.08); padding-top: 18px; }
      .approved-reviews-mini h3 { margin: 0 0 10px; }
      .approved-mini-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.06); color: rgba(236,253,245,.75); font-weight: 800; }
      .approved-mini-row button { border: 0; background: rgba(255,255,255,.08); color: #fff; border-radius: 999px; padding: 8px 12px; font-weight: 900; }

      @media (max-width: 980px) {
        .desktop { display: none; }
        .menu-btn { display: block; }
        .hero-grid, .why, .reviews-grid, .contact-section, .admin-grid, .admin-login { grid-template-columns: 1fr; }
        .cards, .gallery, .review-list { grid-template-columns: repeat(2, 1fr); }
        .admin-stats { grid-template-columns: repeat(2, 1fr); }
        .moderation-list { grid-template-columns: 1fr; }
      }
      @media (max-width: 640px) {
        .header { padding: 0 16px; }
        .hero, .section, .admin { padding-left: 16px; padding-right: 16px; }
        .cards, .gallery, .review-list, .why-grid, .two, .detail-cards, .status-buttons, .admin-actions, .stats { grid-template-columns: 1fr; }
        .hero-image-card img { height: 420px; }
        h1 { font-size: 48px; }
        .reviews-head { align-items: stretch; flex-direction: column; }
      }
    `}</style>
  );
}
