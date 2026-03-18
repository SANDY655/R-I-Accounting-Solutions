import React from "react";
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceDetail from "./pages/ServiceDetail";
import {
  FiMenu,
  FiX,
  FiBarChart2,
  FiSearch,
  FiFileText,
  FiTrendingUp,
  FiHome,
  FiTarget,
  FiCheckCircle,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiBriefcase, // Kept used in Contact section
} from "react-icons/fi";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active tab with hash
  React.useEffect(() => {
    if (location.pathname === '/') {
      if (location.hash) {
        setActiveTab(location.hash.replace('#', ''));
      } else {
        setActiveTab('home');
      }
    } else {
      setActiveTab('');
    }
  }, [location]);

  const scrollToSection = (id) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      // Already on home, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveTab(id);
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveTab('home');
      }
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" }, // Mapping Services to Features to match reference naming but keep functionality
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 pointer-events-none transition-all duration-300 ${isScrolled ? "py-4 bg-white/80 backdrop-blur-md shadow-sm" : "py-6"}`}>
        {/* Logo - Left */}
        <div className="pointer-events-auto">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => scrollToSection("home")}
          >
            <img src="/images/Logo.jpeg" alt="R&I Logo" className="h-10 w-auto object-contain rounded-md" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">R & I</span>
          </motion.div>
        </div>

        {/* Desktop Nav - Center Pill */}
        <motion.div
          className="hidden lg:flex pointer-events-auto items-center bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5 rounded-full px-1.5 py-1.5 gap-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeTab === item.id
                  ? "bg-white text-secondary-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                }
              `}
            >
              {activeTab === item.id && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary-600"></span>
              )}
              <span className={activeTab === item.id ? "ml-2" : ""}>{item.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Right Side - CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <motion.button
            className="hidden lg:block px-6 py-2.5 rounded-full bg-secondary-600 text-white text-sm font-semibold shadow-lg shadow-secondary-600/20 hover:shadow-xl hover:shadow-secondary-600/30 hover:-translate-y-0.5 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => scrollToSection("services")}
          >
            Get Started
          </motion.button>

          {/* Mobile Toggle */}
          <motion.button
            className="block lg:hidden p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-slate-200 text-slate-700"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.95 }}
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 lg:hidden"
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="p-4 text-left text-lg font-semibold text-slate-800 border-b border-slate-100 active:bg-slate-50 rounded-xl"
            >
              {item.label}
            </button>
          ))}
          <button
            className="mt-4 w-full py-3.5 rounded-xl bg-secondary-600 text-white font-semibold shadow-lg shadow-secondary-600/20"
            onClick={() => scrollToSection("contact")}
          >
            Get Template
          </button>
        </div>
      </motion.div>
    </>
  );
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const service = formData.get("service") || "";
    const message = formData.get("message") || "";
    
    const subject = `New Inquiry from ${name} - ${service}`;
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:rprogers6381@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Offset for fixed navbar */}
      <div className="h-20" />

      {/* ================= HERO ================= */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            <motion.div className="inline-block" variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 bg-secondary-50 text-secondary-700 text-sm font-medium rounded-full mb-6">
                Professional Financial Services
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 tracking-tight"
              variants={fadeInUp}
            >
              Expert Accounting
              <br />
              <span className="text-secondary-600">& Tax Solutions</span>
            </motion.h1>

            <motion.p
              className="mt-7 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium"
              variants={fadeInUp}
            >
              Reliable accounting, auditing, VAT & corporate tax solutions
              designed for growing businesses and Gulf compliance.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fadeInUp}
            >
              <motion.button
                onClick={() => navigate('/#contact')}
                className="px-8 py-3.5 rounded-lg bg-secondary-600 text-white font-medium hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-600/20 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={() => navigate('/#services')}
                className="px-8 py-3.5 rounded-lg border-2 border-slate-200 text-slate-700 font-medium hover:border-secondary-600 hover:text-secondary-600 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariants}
            >
              {[
                { num: "1000+", label: "Filings" },
                { num: "500+", label: "Happy Clients" },
                { num: "98%", label: "Success Rate" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-secondary-600 tracking-tight">
                    {stat.num}
                  </div>
                  <div className="text-sm text-slate-600 mt-2 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-secondary-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>

            <motion.div
              className="relative h-[450px] rounded-2xl overflow-hidden bg-white shadow-2xl"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="./fa_1.jpg"
                alt="Professional Accounting Team"
                className="w-full h-full object-cover"
              />

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-20 px-6 lg:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary-50 text-secondary-700 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">
              Our Services
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Comprehensive financial solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "accounting", // ID added for routing
                title: "Accounting",
                description:
                  "Complete accounting solutions to maintain accurate financial records and provide insights into your business performance.",
                items: [
                  {
                    name: "Financial Reporting",
                    desc: "Comprehensive reports including balance sheets, income statements, and cash flow statements",
                  },
                  {
                    name: "Management Accounts",
                    desc: "Monthly management reports to help you make informed business decisions",
                  },
                  {
                    name: "Cash Flow Management",
                    desc: "Monitor and optimize your cash flow to ensure business sustainability",
                  },
                ],
                icon: FiBarChart2,
              },
              {
                id: "auditing-assurance",
                title: "Auditing & Assurance",
                description:
                  "Independent examination of your financial statements to ensure accuracy, compliance, and build stakeholder confidence.",
                items: [
                  {
                    name: "Internal Audit",
                    desc: "Evaluate internal controls and risk management processes",
                  },
                  {
                    name: "External Audit",
                    desc: "Independent verification of financial statements for stakeholders",
                  },
                  {
                    name: "Due Diligence",
                    desc: "Comprehensive financial review for mergers, acquisitions, or investments",
                  },
                ],
                icon: FiSearch,
              },
              {
                id: "book-keeping",
                title: "Book Keeping",
                description:
                  "Systematic recording of all financial transactions to maintain organized and up-to-date financial records.",
                items: [
                  {
                    name: "Daily Records",
                    desc: "Accurate recording of all daily business transactions",
                  },
                  {
                    name: "Monthly Closing",
                    desc: "Complete month-end closing procedures and reconciliations",
                  },
                  {
                    name: "Reconciliation",
                    desc: "Bank and account reconciliations to ensure accuracy",
                  },
                ],
                icon: FiFileText,
              },
              {
                id: "vat-services",
                title: "UAE VAT",
                description:
                  "Comprehensive compliance with UAE Federal Decree-Law No. 8 of 2017, covering registration, filing, and advisory.",
                items: [
                  {
                    name: "Registration & Impact",
                    desc: "Mandatory (AED 375k) and Voluntary (AED 187.5k) registration support",
                  },
                  {
                    name: "Filing & Compliance",
                    desc: "Accurate preparation and filing of VAT Returns (VAT201)",
                  },
                  {
                    name: "Advisory Services",
                    desc: "Guidance on Tax Groups, Designated Zones, and Refunds",
                  },
                ],
                icon: FiBriefcase,
              },
              {
                id: "corporate-tax",
                title: "Corporate Tax UAE",
                description:
                  "Comprehensive compliance and advisory for the evolving UAE Corporate Tax landscape, including Free Zone and Pillar Two regulations.",
                items: [
                  {
                    name: "Registration & Assessment",
                    desc: "Mandatory registration support and initial impact assessment",
                  },
                  {
                    name: "Free Zone Taxation",
                    desc: "Expertise in Qualifying Free Zone Person (QFZP) 0% tax benefits",
                  },
                  {
                    name: "Transfer Pricing",
                    desc: "Arm's length principle compliance and documentation",
                  },
                ],
                icon: FiHome,
              },
              {
                id: "transfer-pricing",
                title: "Transfer Pricing",
                description:
                  "Comprehensive compliance with UAE Federal Decree-Law No. 47 of 2022, including Master and Local File preparation.",
                items: [
                  {
                    name: "Documentation",
                    desc: "Prepare comprehensive transfer pricing documentation",
                  },
                  {
                    name: "Advisory",
                    desc: "Strategic advice on transfer pricing policies and implementation",
                  },
                  {
                    name: "Compliance",
                    desc: "Ensure adherence to OECD guidelines and local regulations",
                  },
                ],
                icon: FiTrendingUp,
              },
              {
                id: "oman-vat",
                title: "Oman VAT",
                description:
                  "Comprehensive support for Oman VAT compliance, including registration, filing, and advisory.",
                items: [
                  {
                    name: "Registration",
                    desc: "Mandatory (OMR 38.5k) and Voluntary (OMR 19.25k) support",
                  },
                  {
                    name: "Filing",
                    desc: "Quarterly VAT return preparation and submission",
                  },
                  {
                    name: "Advisory",
                    desc: "Guidance on zero-rated, exempt, and standard rated supplies",
                  },
                ],
                icon: FiGlobe,
              },
              {
                id: "kuwait-tax",
                title: "Kuwait VAT",
                description:
                  "Guidance on current fiscal obligations (NLST, Customs) and VAT readiness preparation.",
                items: [
                  {
                    name: "VAT Readiness",
                    desc: "Impact assessment for pending 5% VAT implementation",
                  },
                  {
                    name: "Strategy Design",
                    desc: "Roadmap for VAT adoption across departments",
                  },
                  {
                    name: "System Readiness",
                    desc: "Validating IT and accounting software capabilities",
                  },
                ],
                icon: FiBriefcase,
              },
              {
                id: "ussalestax",
                title: "US Sales Tax",
                description:
                  "Comprehensive advisory on the One Big Beautiful Bill Act (OBBBA), 2025 tax rates, and permanent TCJA extensions.",
                items: [
                  {
                    name: "OBBBA Advisory",
                    desc: "Guidance on the new 2025 tax legislation and permanent provisions",
                  },
                  {
                    name: "Individual Tax",
                    desc: "Filing for residents, non-residents, and expats under new brackets",
                  },
                  {
                    name: "Estate Planning",
                    desc: "Leveraging the increased $15M lifetime exemption",
                  },
                ],
                icon: FiGlobe,
              },

            ].map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut",
                        delay: idx * 0.1,
                      },
                    },
                  }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-secondary-300 hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    className="w-14 h-14 rounded-lg bg-secondary-50 flex items-center justify-center mb-5 group-hover:bg-secondary-100 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <IconComponent className="w-7 h-7 text-secondary-600" />
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold text-slate-900 mb-3 tracking-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.1 }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className="text-slate-600 text-[14px] leading-relaxed mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    {service.description}
                  </motion.p>
                  <motion.ul
                    className="text-slate-600 space-y-3 text-[15px] leading-relaxed"
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainerVariants}
                  >
                    {service.items.map((item) => (
                      <motion.li
                        key={item.name}
                        className="group/item"
                        variants={itemVariants}
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-600 flex-shrink-0 mt-2"></span>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {item.name}
                            </div>
                            <div className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div
                    className="mt-6 pt-6 border-t border-slate-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                  >
                    <a
                      href={`/services/${service.id}`} // Updated link for routing
                      className="inline-flex items-center gap-2 text-secondary-600 font-semibold text-sm hover:text-secondary-700 transition-all cursor-pointer"
                    >
                      Learn More
                      <span>→</span>
                    </a>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary-200 rounded-2xl"></div>
            <motion.div
              className="relative h-[400px] rounded-2xl bg-gradient-to-br from-secondary-50 to-blue-50 border border-slate-200 overflow-hidden shadow-lg"
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-secondary-50 text-secondary-700 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide"
              variants={itemVariants}
            >
              About Us
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
              variants={itemVariants}
            >
              Your Trusted Financial Partner
            </motion.h2>
            <motion.p
              className="text-slate-600 leading-relaxed mb-6 text-[16px]"
              variants={itemVariants}
            >
              We provide reliable accounting, auditing, taxation, and software
              consultancy services for businesses operating across Gulf
              countries, focusing on compliance and growth.
            </motion.p>
            <motion.p
              className="text-slate-600 leading-relaxed mb-8 text-[16px]"
              variants={itemVariants}
            >
              Our team of experienced professionals is dedicated to delivering
              accurate, timely, and compliant financial solutions that help your
              business thrive.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainerVariants}
            >
              {[
                {
                  icon: FiTarget,
                  title: "Gulf Tax Expertise",
                  desc: "Deep knowledge of regional regulations",
                },
                {
                  icon: FiCheckCircle,
                  title: "Compliance-Driven",
                  desc: "Stay compliant with changing laws",
                },
                {
                  icon: FiGlobe,
                  title: "Virtual Support",
                  desc: "24/7 remote assistance available",
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="flex gap-4 items-start p-5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-secondary-50 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-6 h-6 text-secondary-600" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1.5 text-[17px] tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[15px] text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 px-6 lg:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary-50 text-secondary-700 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
              Contact Us
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Have questions? We're here to help. Reach out to us today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: FiPhone, label: "Phone", value: "9994467838" },
                    { icon: FiMail, label: "Email", value: "rprogers6381@gmail.com" },
                    {
                      icon: FiMapPin,
                      label: "Location",
                      value: "Virtual Office Available",
                    },
                    {
                      icon: FiMessageCircle,
                      label: "WhatsApp",
                      value: "971525270903",
                    },
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        className="flex items-center gap-4 p-5 bg-white rounded-lg border border-slate-200 hover:border-secondary-200 hover:shadow-md transition-all"
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                      >
                        <motion.div
                          className="w-12 h-12 rounded-lg bg-secondary-50 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                        >
                          <IconComponent className="w-5 h-5 text-secondary-600" />
                        </motion.div>
                        <div>
                          <div className="text-[13px] font-medium text-slate-500 uppercase tracking-wide mb-0.5">
                            {item.label}
                          </div>
                          <div className="font-semibold text-slate-900 text-[15px]">
                            {item.value}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>


            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-lg space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Service Interested In
                </label>
                <select name="service" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 outline-none transition-all">
                  <option value="">Select a service</option>
                  <option value="Accounting">Accounting</option>
                  <option value="VAT Services">VAT Services</option>
                  <option value="Corporate Tax">Corporate Tax</option>
                  <option value="Software Partners">Software Partners</option>
                  <option value="Auditing & Assurance">Auditing & Assurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell us about your requirements..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-secondary-600 text-white font-semibold text-base shadow-lg shadow-secondary-600/25 hover:bg-secondary-700 hover:shadow-xl hover:shadow-secondary-600/35 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const App = () => {
  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
      </Routes>
      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/Logo.jpeg" alt="R&I Logo" className="h-12 w-auto object-contain rounded-md shadow-sm" />
              <div className="text-sm">
                <div className="font-bold text-slate-900">R & I</div>
                <div className="text-slate-500">Accounting & Tax Advisory</div>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} R & I. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
