import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ServiceDetail from "./pages/ServiceDetail";
import {
  FiMenu,
  FiX,
  FiBarChart2,
  FiSearch,
  FiFileText,
  FiTrendingUp,
  FiHome,
  FiGlobe,
  FiBriefcase,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiCheckCircle,
} from "react-icons/fi";

// ==========================================
// PRECISE SPRING ANIMATIONS
// ==========================================
const transitionSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpSpring = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSpring,
  },
};

const scaleSpring = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSpring,
  },
};

// ==========================================
// NAVBAR COMPONENT
// ==========================================
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab(location.hash ? location.hash.replace("#", "") : "home");
    } else {
      setActiveTab("");
    }
  }, [location]);

  const scrollToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveTab(id);
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveTab("home");
      }
    }
  };

  const navItems = [
    { id: "home", label: "Overview" },
    { id: "services", label: "Expertise" },
    { id: "about", label: "The Firm" },
    { id: "contact", label: "Consultation" },
  ];

  return (
    <>
      {/* ── Top Announcement Bar ─────────────────────────── */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-[51] bg-secondary-950 text-white text-center py-2.5 text-xs font-semibold tracking-widest uppercase hidden lg:flex items-center justify-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Licensed Accounting & Advisory Firm — UAE · Oman · Kuwait · USA
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Navbar ───────────────────────────────────── */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 lg:px-12
          ${isScrolled
            ? "top-0 py-4 bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "top-0 lg:top-10 py-5 lg:py-4"
          }`}
      >
        {/* Logo + Firm Name */}
        <motion.div
          className="flex items-center gap-3.5 cursor-pointer group pointer-events-auto"
          onClick={() => scrollToSection("home")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transitionSpring}
        >
          <div className={`relative rounded-xl overflow-hidden transition-all duration-500 ${isScrolled ? "shadow-md" : "shadow-lg"}`}>
            <img
              src="/images/Logo.jpeg"
              alt="RNI Logo"
              className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="hidden sm:block">
            <div className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${isScrolled ? "text-secondary-950" : "text-secondary-950"}`}>
              RNI Accounting Services
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-400 leading-none mt-0.5">
              Accounting Services
            </div>
          </div>
        </motion.div>

        {/* Center Nav Pills */}
        <motion.div
          className="hidden lg:flex pointer-events-auto items-center gap-1 bg-white/70 backdrop-blur-2xl border border-secondary-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-full px-2 py-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transitionSpring}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-5 py-2 rounded-full text-[12px] uppercase tracking-[0.12em] font-bold transition-all duration-300 group
                ${activeTab === item.id
                  ? "text-secondary-950"
                  : "text-secondary-500 hover:text-secondary-900"
                }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-secondary-100 rounded-full border border-secondary-200"
                  transition={{ type: "spring", stiffness: 130, damping: 22 }}
                />
              )}
              <span className="relative z-10 flex flex-col items-center gap-1">
                {item.label}
                {activeTab === item.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="w-1 h-1 rounded-full bg-accent-500"
                    transition={{ type: "spring", stiffness: 130, damping: 22 }}
                  />
                )}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Right Actions */}
        <motion.div
          className="flex items-center gap-3 pointer-events-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transitionSpring}
        >
          {/* Phone Pill — desktop */}
          <a
            href="tel:+919994467838"
            className={`hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-full border font-semibold text-sm transition-all duration-300 group
              ${isScrolled
                ? "border-secondary-200 bg-white text-secondary-900 hover:border-primary-400 hover:text-primary-600"
                : "border-secondary-200/80 bg-white/70 backdrop-blur-xl text-secondary-900 hover:border-primary-400 hover:text-primary-600"
              }`}
          >
            <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <FiPhone className="w-2.5 h-2.5 text-primary-600 group-hover:text-white transition-colors" />
            </div>
            +91 9994467838
          </a>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:flex group relative px-7 py-3 overflow-hidden rounded-full bg-secondary-950 text-white text-[13px] font-bold tracking-wide transition-all duration-300 hover:shadow-[0_12px_40px_-10px_rgba(6,38,42,0.45)] hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Consultation
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </button>

          {/* Hamburger */}
          <button
            className={`block lg:hidden p-3 rounded-full border transition-all duration-300
              ${isScrolled ? "bg-white border-secondary-200 text-secondary-900 shadow-sm" : "bg-white/80 backdrop-blur-xl border-secondary-200/80 text-secondary-900"}`}
            onClick={() => setOpen(!open)}
          >
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.div>
          </button>
        </motion.div>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col"
          >
            {/* Close strip */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-secondary-100">
              <div className="flex items-center gap-3">
                <img src="/images/Logo.jpeg" alt="RNI" className="h-10 w-auto object-contain" />
                <div className="text-sm font-bold text-secondary-950 tracking-tight">RNI Accounting Services</div>
              </div>
              <button
                className="p-2.5 rounded-full bg-secondary-100 text-secondary-900"
                onClick={() => setOpen(false)}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 px-6 pt-10 flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, type: "spring", stiffness: 120, damping: 20 }}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between py-4 border-b border-secondary-100 text-left group"
                >
                  <span className="text-2xl font-bold tracking-tight text-secondary-950 group-hover:text-primary-600 transition-colors">
                    {item.label}
                  </span>
                  <FiArrowRight className="text-secondary-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>

            {/* Bottom CTA Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mx-6 mb-8 p-6 bg-secondary-950 rounded-2xl"
            >
              <p className="text-secondary-400 text-sm font-medium mb-4">Ready to get started?</p>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-4 rounded-xl bg-primary-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors mb-4"
              >
                Get Consultation <FiArrowRight />
              </button>
              <a href="tel:+919994467838" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <FiPhone className="text-white/70 w-4 h-4" />
                </div>
                <span className="text-white font-semibold text-sm group-hover:text-primary-300 transition-colors">+91 9994467838</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================================
// HOME PAGE COMPONENT
// ==========================================
// ── Formspree form ID — replace 'YOUR_FORM_ID' with the ID from formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzwdzbd";

const Home = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ status: "idle", error: null }); // idle | loading | success | error

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "loading", error: null });
    const formData = new FormData(e.target);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState({ status: "success", error: null });
        e.target.reset();
      } else {
        const data = await res.json();
        setFormState({ status: "error", error: data?.errors?.[0]?.message || "Something went wrong. Please try again." });
      }
    } catch {
      setFormState({ status: "error", error: "Network error. Please check your connection and try again." });
    }
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* ================= HERO: BESPOKE ASYMMETRIC ================= */}
      <section className="relative min-h-[100svh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-primary-100/40 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-accent-100/30 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              className="col-span-1 lg:col-span-7 z-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent-500"></div>
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-secondary-800">
                  Precision & Clarity
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUpSpring}
                className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[0.95] tracking-tighter text-secondary-950 mb-8"
              >
                Financial <br />
                <span className="relative">
                  <span className="relative z-10 text-primary-600">Architecture</span>
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-accent-200/50 -z-10 transform -rotate-1 origin-left"></div>
                </span>
                <br />
                For Growth.
              </motion.h1>

              <motion.p
                variants={fadeUpSpring}
                className="text-lg md:text-xl text-secondary-600 leading-[1.6] max-w-xl font-medium mb-12"
              >
                Elevating enterprise standards through uncompromising audit,
                tax advisory, and forensic accounting across the global landscape.
              </motion.p>

              <motion.div variants={fadeUpSpring} className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                  className="group relative px-8 py-4 bg-primary-600 text-white font-bold tracking-wide rounded-full overflow-hidden shadow-[0_10px_40px_-10px_rgba(27,146,161,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Schedule Consultation
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-secondary-950 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F8FAFC] bg-secondary-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-secondary-800">
                    Trusted by <span className="text-primary-600">500+</span> Clients
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Graphic Content */}
            <motion.div
              className="col-span-1 lg:col-span-5 relative lg:h-[700px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
              variants={scaleSpring}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full max-h-[700px] rounded-[2rem] overflow-hidden group">
                <img
                  src="./fa_1.jpg"
                  alt="Corporate Strategy"
                  className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/80 via-secondary-950/20 to-transparent"></div>

                {/* Floating Glass Stat */}
              
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES: BENTO BOX ================= */}
      <section id="services" className="py-32 px-6 lg:px-12 bg-white relative">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div className="max-w-3xl">
              <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary-500"></div>
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary-600">
                  Capabilities
                </span>
              </motion.div>
              <motion.h2 variants={fadeUpSpring} className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-950 tracking-tighter leading-[1.1]">
                Comprehensive
                <br /> Advisory & Strategy.
              </motion.h2>
            </div>
            <motion.p variants={fadeUpSpring} className="text-lg text-secondary-600 font-medium max-w-md">
              We engineer financial frameworks that guarantee compliance while unlocking aggressive corporate growth vectors.
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(300px,_auto)] gap-6">

            {/* LARGE FEATURE CARD */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpSpring}
              className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-[2rem] bg-secondary-950 p-10 flex flex-col justify-between cursor-pointer"
              onClick={() => navigate('/services/corporate-tax')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[80px] group-hover:bg-primary-500/20 transition-all duration-700"></div>

              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-500">
                <FiBriefcase className="w-8 h-8 text-white" />
              </div>

              <div className="relative z-10 mt-auto">
                <div className="inline-block px-3 py-1 bg-accent-500/20 text-accent-400 text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-accent-500/30">
                  Flagship Expertise
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 group-hover:text-primary-300 transition-colors duration-500">UAE Corporate Tax</h3>
                <p className="text-secondary-300 text-lg leading-relaxed max-w-md mb-8">
                  End-to-end compliance, transfer pricing, and strategic structuring for the evolving UAE fiscal landscape.
                </p>
                <div className="flex items-center text-primary-400 font-semibold group-hover:text-white transition-colors">
                  Explore Solutions <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

            {/* MEDIUM CARDS */}
            {[
              { id: "auditing-assurance", colSpan: "lg:col-span-2", title: "Auditing & Assurance", desc: "Rigorous independent verifications to solidify stakeholder confidence and internal control integrity.", icon: FiSearch, bg: "bg-secondary-50" },
              { id: "accounting", colSpan: "lg:col-span-1", title: "Accounting", desc: "Precision financial reporting and management structuring.", icon: FiBarChart2, bg: "bg-white border border-secondary-200" },
              { id: "transfer-pricing", colSpan: "lg:col-span-1", title: "Transfer Pricing", desc: "OECD-compliant master file documentation and arm's length strategy formulation.", icon: FiTrendingUp, bg: "bg-white border border-secondary-200" },
              { id: "vat-services", colSpan: "lg:col-span-1", title: "UAE VAT", desc: "Complex indirect tax optimization ensuring compliance across the GCC.", icon: FiGlobe, bg: "bg-primary-50" },
              { id: "oman-vat", colSpan: "lg:col-span-1", title: "Oman VAT", desc: "Comprehensive support for Oman VAT registration, filing, and advisory.", icon: FiFileText, bg: "bg-white border border-secondary-200" },
              { id: "book-keeping", colSpan: "lg:col-span-1", title: "Book Keeping", desc: "Systematic recording of all transactions for organized financial records.", icon: FiBarChart2, bg: "bg-secondary-50" },
              { id: "ussalestax", colSpan: "lg:col-span-4", title: "US Sales Tax", desc: "Comprehensive advisory on new tax legislations, 2025 rates, and permanent extensions for global entities operating within the US domain.", icon: FiGlobe, bg: "bg-secondary-950 text-white group-hover:bg-secondary-900" },
            ].map((srv, i) => {
              const IconComponent = srv.icon;
              return (
                <motion.div
                  key={srv.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpSpring}
                  custom={i}
                  onClick={() => navigate(`/services/${srv.id}`)}
                  className={`${srv.colSpan} ${srv.bg} group relative overflow-hidden rounded-[2rem] p-8 flex flex-col cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1`}
                >
                  <div className={`w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center mb-6 transition-colors duration-500 ${srv.id === 'ussalestax' ? 'bg-white/10 group-hover:bg-primary-600' : 'bg-white group-hover:bg-primary-600'}`}>
                    <IconComponent className={`w-6 h-6 transition-colors duration-500 ${srv.id === 'ussalestax' ? 'text-white' : 'text-secondary-900'} group-hover:text-white`} />
                  </div>
                  <div className="mt-auto">
                    <h3 className={`text-2xl font-bold tracking-tight mb-3 ${srv.id === 'ussalestax' ? 'text-white' : 'text-secondary-950'}`}>{srv.title}</h3>
                    <p className={`font-medium leading-relaxed ${srv.id === 'ussalestax' ? 'text-secondary-300' : 'text-secondary-600'}`}>{srv.desc}</p>
                  </div>
                  {/* Subtle hover arrow corner */}
                  <div className="absolute top-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow-sm flex items-center justify-center">
                      <FiArrowRight className={`w-5 h-5 ${srv.id === 'ussalestax' ? 'text-white' : 'text-primary-600'}`} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT: FLOATING GLASS CARDS ================= */}
      <section id="about" className="py-32 px-6 lg:px-12 bg-secondary-950 relative overflow-hidden">
        {/* Abstract dark mode light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary-900/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-accent-500"></div>
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-accent-400">
                  The Firm
                </span>
              </motion.div>
              <motion.h2 variants={fadeUpSpring} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
                Uncompromising <br /> <span className="text-primary-400">Standards.</span>
              </motion.h2>
              <motion.p variants={fadeUpSpring} className="text-xl text-secondary-300 font-medium leading-[1.6] mb-12 max-w-lg">
                We are a collective of elite financial architects operating across the Gulf. We don't just file taxes; we engineer financial security.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: FiGlobe, title: "Global Insight", desc: "Cross-border compliance" },
                  { icon: FiCheckCircle, title: "Zero Error", desc: "Precision audited reporting" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} variants={fadeUpSpring} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-accent-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold tracking-tight mb-1">{item.title}</h4>
                        <p className="text-secondary-400 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Overlapping Glass Panels */}
            <motion.div
              className="relative h-[600px] w-full hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="absolute top-10 right-0 w-[80%] h-[400px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&fit=crop" className="w-full h-full object-cover" alt="Office" />
                <div className="absolute inset-0 bg-secondary-900/20 mix-blend-multiply"></div>
              </div>

              <div className="absolute bottom-10 left-0 w-[60%] bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mb-6">
                  <FiFileText className="text-secondary-950 w-5 h-5" />
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight mb-3">Direct Partner Access</h4>
                <p className="text-secondary-300 leading-relaxed font-medium">Every account is overseen by a senior partner, ensuring elite strategic counsel.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT: MODERN FLOATING UI ================= */}
      <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto bg-white rounded-[2rem] lg:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-secondary-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Contact Info Block */}
            <div className="bg-secondary-950 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-4">
                  Ready to redefine <br className="hidden sm:block" /> your strategy?
                </h2>
                <p className="text-secondary-400 text-base lg:text-lg max-w-md font-medium">
                  Connect with our advisory board for a confidential evaluation of your corporate fiscal protocols.
                </p>
              </div>

              <div className="relative z-10 mt-10 lg:mt-20 space-y-4 lg:space-y-6">
                {[
                  { icon: FiPhone, text: "+91 999 446 7838", href: "tel:+919994467838" },
                  { icon: FiMail, text: "rnibookkeeping@gmail.com", href: "mailto:rnibookkeeping@gmail.com" },
                  { icon: FiMapPin, text: "Virtual Office Available", href: null }
                ].map((item, i) => (
                  <a key={i} href={item.href || "#"} className="flex items-center gap-4 lg:gap-6 group cursor-pointer w-fit">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300 flex-shrink-0">
                      <item.icon className="text-white/70 group-hover:text-white transition-colors w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <span className="text-base lg:text-xl font-medium text-white/90 group-hover:text-white transition-colors break-all">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Premium Form */}
            <div className="p-8 sm:p-12 lg:p-16 xl:p-20">
              <div className="mb-8 lg:mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-sm font-bold tracking-widest uppercase mb-4 lg:mb-6">
                  <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                  Accepting Clients
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-secondary-950 tracking-tight">Request Consultation</h3>
              </div>

              <AnimatePresence mode="wait">
                {formState.status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary-50 border-2 border-primary-400 flex items-center justify-center mb-6">
                      <FiCheckCircle className="w-10 h-10 text-primary-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-secondary-950 tracking-tight mb-3">Message Sent!</h4>
                    <p className="text-secondary-500 font-medium max-w-xs mb-8">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormState({ status: "idle", error: null })}
                      className="px-8 py-3 rounded-full border border-secondary-200 text-secondary-700 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Name</label>
                        <input type="text" name="name" required disabled={formState.status === "loading"} className="w-full bg-secondary-50 border border-transparent border-b-secondary-300 px-4 py-3 rounded-t-xl text-secondary-950 font-medium focus:bg-white focus:border-b-primary-600 focus:ring-0 outline-none transition-all placeholder:text-secondary-400 disabled:opacity-50" placeholder="Your Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Email</label>
                        <input type="email" name="email" required disabled={formState.status === "loading"} className="w-full bg-secondary-50 border border-transparent border-b-secondary-300 px-4 py-3 rounded-t-xl text-secondary-950 font-medium focus:bg-white focus:border-b-primary-600 focus:ring-0 outline-none transition-all placeholder:text-secondary-400 disabled:opacity-50" placeholder="you@company.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Service of Interest</label>
                      <select name="service" required disabled={formState.status === "loading"} className="w-full bg-secondary-50 border border-transparent border-b-secondary-300 px-4 py-3 rounded-t-xl text-secondary-950 font-medium focus:bg-white focus:border-b-primary-600 focus:ring-0 outline-none transition-all cursor-pointer disabled:opacity-50">
                        <option value="" disabled>Select a practice area...</option>
                        <option value="Accounting Services">Accounting Services</option>
                        <option value="Auditing & Assurance">Auditing &amp; Assurance</option>
                        <option value="Book Keeping">Book Keeping</option>
                        <option value="UAE VAT">UAE VAT</option>
                        <option value="Corporate Tax UAE">Corporate Tax — UAE</option>
                        <option value="Transfer Pricing">Transfer Pricing (UAE)</option>
                        <option value="Oman VAT">Oman VAT</option>
                        <option value="Kuwait VAT">Kuwait VAT</option>
                        <option value="US Sales Tax">US Sales Tax</option>
                        <option value="Other">Other / General Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary-500">Message</label>
                      <textarea name="message" rows="4" required disabled={formState.status === "loading"} className="w-full bg-secondary-50 border border-transparent border-b-secondary-300 px-4 py-3 rounded-t-xl text-secondary-950 font-medium focus:bg-white focus:border-b-primary-600 focus:ring-0 outline-none transition-all resize-none placeholder:text-secondary-400 disabled:opacity-50" placeholder="Briefly describe your requirements..."></textarea>
                    </div>

                    {formState.status === "error" && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                        <FiX className="w-4 h-4 flex-shrink-0" />
                        {formState.error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState.status === "loading"}
                      className="group relative w-full bg-secondary-950 text-white font-bold py-5 rounded-xl overflow-hidden mt-4 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {formState.status === "loading" ? (
                          <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>Submit Inquiry <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </span>
                      {formState.status !== "loading" && (
                        <div className="absolute inset-0 bg-primary-600 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out"></div>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-secondary-950 pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-lg">
                <img src="/images/Logo.jpeg" alt="RNI Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight">RNI Accounting Services</div>
                <div className="text-sm font-medium text-secondary-400 tracking-widest uppercase text-[10px]">Accounting Services</div>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="#services" className="text-secondary-400 hover:text-white transition-colors">Expertise</a>
              <a href="#about" className="text-secondary-400 hover:text-white transition-colors">The Firm</a>
              <a href="#contact" className="text-secondary-400 hover:text-accent-400 transition-colors">Portal</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs font-semibold text-secondary-500 tracking-widest uppercase">
            <div>© {new Date().getFullYear()} RNI Accounting Services. All rights reserved.</div>
            <div className="flex gap-6">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <div className="font-sans antialiased selection:bg-primary-500/30 selection:text-primary-900 overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
      </Routes>
    </div>
  );
};

export default App;
