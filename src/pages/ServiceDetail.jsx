import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiBarChart2,
    FiSearch,
    FiFileText,
    FiBriefcase,
    FiHome,
    FiTrendingUp,
    FiPhone,
    FiMail,
    FiGlobe,
    FiChevronRight,
    FiArrowRight,
    FiPlus,
    FiMinus,
} from "react-icons/fi";
import SalesTaxCalculator from "../components/SalesTaxCalculator";

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
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const fadeUpSpring = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: transitionSpring },
};

const servicesData = [
    {
        id: "accounting",
        title: "Accounting Services",
        subtitle: "Streamline your financial operations with expert accounting solutions designed for growth.",
        icon: FiBarChart2,
        tag: "Core Service",
        overview: `<p>In today's fast-paced business environment, accurate and timely financial information is crucial for making informed decisions. Our professional accounting services go beyond simple data entry to provide you with a comprehensive view of your business's financial health.</p><p>We combine deep industry knowledge with the latest financial technology to deliver accounting solutions that are efficient, transparent, and compliant with all local regulations. Whether you are a startup needing to set up your first set of books or a large enterprise looking to optimize your financial processes, our team is equipped to support your journey.</p>`,
        benefits: [
            "Real-time visibility into your financial performance",
            "Compliance with International Financial Reporting Standards (IFRS)",
            "Cost reduction through optimized financial processes",
            "Strategic insights to drive business growth",
            "Reduced risk of errors and non-compliance penalties",
        ],
        process: [
            { title: "Initial Consultation", desc: "We strive to understand your specific business needs, industry challenges, and financial goals." },
            { title: "System Setup", desc: "Configuration of accounting software and chart of accounts tailored to your operations." },
            { title: "Ongoing Management", desc: "Regular recording of transactions, bank reconciliations, and expense tracking." },
            { title: "Reporting & Advisory", desc: "Monthly financial reports and quarterly strategy sessions to review performance." },
        ],
        faq: [
            { q: "Do you use cloud-based accounting software?", a: "Yes, we specialize in Xero, QuickBooks, and Zoho Books, allowing you access to your financial data from anywhere." },
            { q: "How often will I receive financial reports?", a: "We provide standard monthly management reports, but can customize the frequency to weekly or quarterly based on your needs." },
            { q: "Can you help with backlog accounting?", a: "Absolutely. We have a dedicated team for cleaning up and updating historical financial records." },
        ],
    },
    {
        id: "auditing-assurance",
        title: "Auditing & Assurance",
        subtitle: "Independent verification to build trust and ensure compliance.",
        icon: FiSearch,
        tag: "Compliance",
        overview: `<p>Stakeholder trust is the currency of modern business. Our auditing and assurance services provide the independent validation your investors, lenders, and regulators require. We adhere to the highest ethical standards and rigorous methodologies to ensure your financial statements present a true and fair view.</p><p>Beyond the statutory requirements, our audit process is designed to add value. We identify weaknesses in internal controls and operational inefficiencies, providing you with actionable recommendations to strengthen your business governance.</p>`,
        benefits: [
            "Enhanced credibility with banks and investors",
            "Identification of internal control weaknesses",
            "Prevention and detection of fraud",
            "Detailed management letters with improvement recommendations",
            "Compliance with statutory audit requirements",
        ],
        process: [
            { title: "Planning & Risk Assessment", desc: "Understanding your business environment and identifying key risk areas." },
            { title: "Internal Control Review", desc: "Evaluating the design and effectiveness of your internal financial controls." },
            { title: "Substantive Testing", desc: "Verifying balances and transactions through rigorous testing procedures." },
            { title: "Reporting", desc: "Issuing the auditor's report and presenting findings to management." },
        ],
        faq: [
            { q: "What is the difference between internal and external audit?", a: "Internal audit focuses on improving operations and controls, while external audit provides an independent opinion on financial statements for third parties." },
            { q: "How long does a typical audit take?", a: "Timeline varies by company size, but typically takes 2-4 weeks after we receive all necessary documentation." },
        ],
    },
    {
        id: "book-keeping",
        title: "Professional Bookkeeping",
        subtitle: "Accurate, organized, and up-to-date financial records for peace of mind.",
        icon: FiFileText,
        tag: "Foundation",
        overview: `<p>Bookkeeping is the foundation of any successful financial management system. Without accurate records, you are flying blind. Our bookkeeping services ensure that every transaction is recorded correctly, categorized properly, and reconciled timely.</p><p>We handle the tedious day-to-day financial tasks so you can focus on your core business activities. From invoicing clients to tracking expenses and managing vendor payments, we act as your extended finance department.</p>`,
        benefits: [
            "Audit-ready financial records at all times",
            "Better cash flow management through timely invoicing",
            "Simplified tax filing process",
            "Complete transparency of business expenses",
            "Time savings for business owners",
        ],
        process: [
            { title: "Document Collection", desc: "Digital collection of receipts, invoices, and bank statements." },
            { title: "Processing", desc: "Recording and categorizing transactions in the general ledger." },
            { title: "Reconciliation", desc: "Matching records with bank and credit card statements to ensure accuracy." },
            { title: "Review", desc: "Final review of the ledger before closing the month." },
        ],
        faq: [
            { q: "Do I need to send physical receipts?", a: "No, we use digital tools. You can simply snap a photo or forward emails to our system." },
            { q: "What if I'm behind on my books?", a: "We offer catch-up bookkeeping services to bring your records up to date quickly." },
        ],
    },
    {
        id: "vat-services",
        title: "UAE VAT",
        subtitle: "Expert guidance on Federal Decree-Law No. 8 of 2017 and Executive Regulations.",
        icon: FiBriefcase,
        tag: "Tax Advisory",
        overview: `<p>Value Added Tax (VAT) was introduced in the UAE on January 1, 2018, under <strong>Federal Decree-Law No. 8 of 2017</strong>. It is a 5% tax imposed on the import and supply of Goods and Services at each stage of production and distribution.</p><p>Compliance is mandatory for businesses exceeding the defined thresholds. Our VAT practice ensures your business adheres to these regulations, utilizing mechanisms like the <strong>Reverse Charge Mechanism (Article 48)</strong> and <strong>Tax Groups (Article 14)</strong> to optimize your tax position.</p>`,
        benefits: [
            "Accurate application of the 5% Standard Rate and 0% Zero Rate",
            "Management of Mandatory (AED 375k) and Voluntary (AED 187.5k) Registration",
            "Optimization via Tax Groups (Article 14) and Designated Zones (Article 50)",
            "Input Tax Recovery and Refund processing",
            "Representation during Tax Audits and Assessments",
        ],
        process: [
            { title: "Registration", desc: "Assisting with Mandatory (AED 375,000 threshold) or Voluntary (AED 187,500 threshold) registration." },
            { title: "Compliance", desc: "Ensuring proper issuance of Tax Invoices (Article 65) and record-keeping for minimum 5 years." },
            { title: "Filing", desc: "Preparation and submission of Tax Returns within the specific Tax Period boundaries." },
            { title: "Advisory", desc: "Guidance on complex transactions, Deemed Supplies, and Capital Assets Schemes." },
        ],
        faq: [
            { q: "What is the Mandatory Registration Threshold?", a: "You must register if your taxable supplies/expenses exceed AED 375,000 in the previous 12 months or are expected to in the next 30 days." },
            { q: "Can I form a Tax Group?", a: "Yes, Related Parties with a Place of Establishment in the State can form a Tax Group to be treated as a single Taxable Person." },
            { q: "How are Imports treated?", a: "Tax is due on Import. However, the Reverse Charge Mechanism often applies for Taxable Persons, shifting liability to the recipient." },
        ],
    },
    {
        id: "corporate-tax",
        title: "Corporate Tax UAE",
        subtitle: "Comprehensive compliance and advisory for the evolving UAE Corporate Tax landscape.",
        icon: FiHome,
        tag: "Flagship",
        overview: `<p>The UAE Corporate Tax (CT) regime, effective for financial years starting on or after 1 June 2023, applies to all business activities across the Emirates. With a standard rate of <strong>9%</strong> on taxable income exceeding AED 375,000, businesses must navigate complex requirements including <strong>Transfer Pricing</strong>, <strong>Free Zone</strong> regulations, and <strong>Pillar Two (DMTT)</strong> implementation for large MNEs.</p><p>We provide end-to-end support, from <strong>Impact Assessment</strong> and <strong>Registration</strong> to filing and advisory. Our experts help you leverage key reliefs such as <strong>Small Business Relief</strong>, <strong>Participation Exemptions</strong>, and <strong>Tax Grouping</strong> to optimize your tax position while ensuring full compliance with FTA regulations and IFRS standards.</p>`,
        benefits: [
            "0% Tax Rate for Qualifying Free Zone Persons (subject to conditions)",
            "Small Business Relief for revenues under AED 3 million (until 2026)",
            "Participation Exemption on dividends and capital gains",
            "Tax Grouping for consolidated filing and loss utilization",
            "Reliefs for intra-group transfers and business restructuring",
        ],
        process: [
            { title: "Registration & Assessment", desc: "Mandatory tax registration and initial impact assessment to determine residency and tax status." },
            { title: "Financial Structuring", desc: "Reviewing legal entities to ensure tax efficiency, including Free Zone substance and Tax Group formation." },
            { title: "Transfer Pricing", desc: "Ensuring related-party transactions meet the Arm's Length Principle and maintaining Master/Local files." },
            { title: "Compliance & Filing", desc: "Preparation of IFRS financial statements and filing of annual Corporate Tax returns." },
        ],
        faq: [
            { q: "What are the UAE Corporate Tax rates?", a: "0% on income up to AED 375,000, and 9% on income above that. A 0% rate applies to Qualifying Free Zone Persons on qualifying income." },
            { q: "Who is exempt from Corporate Tax?", a: "Exempt persons include Government entities, extractive businesses, qualifying public benefit entities, and certain investment/pension funds." },
            { q: "How are Free Zone companies taxed?", a: "They can benefit from 0% CT if they meet 'qualifying' conditions: adequate substance, deriving qualifying income, and complying with transfer pricing rules." },
            { q: "What is the Small Business Relief?", a: "Businesses with revenue below AED 3 million can elect to be treated as having no taxable income for tax periods up to Dec 31, 2026." },
        ],
    },
    {
        id: "transfer-pricing",
        title: "Transfer Pricing (UAE)",
        subtitle: "Expert guidance on Federal Decree-Law No. 47 of 2022 and the Arm's Length Principle.",
        icon: FiTrendingUp,
        tag: "Advisory",
        overview: `<p>Under <strong>Federal Decree-Law No. 47 of 2022</strong> (the "Corporate Tax Law"), compliance with <strong>Transfer Pricing</strong> regulations is mandatory for Related Parties and Connected Persons in the UAE. The law requires that all Controlled Transactions be conducted at an <strong>Arm's Length Price</strong>, as if they were between independent parties.</p><p>Our Transfer Pricing practice helps you navigate these rigorous standards. We assist with the preparation of Master Files and Local Files, conducting robust Comparability Analyses using the five OECD-approved methods (CUP, RPM, CPM, TNMM, and Profit Split) to defend your pricing against FTA audits.</p>`,
        benefits: [
            "Full compliance with Article 34 of the Corporate Tax Law",
            "Mitigation of double taxation risks",
            "Defense-ready Transfer Pricing documentation (Master/Local File)",
            "Accurate application of the Arm's Length Principle",
            "Prevention of profit shifting and tax avoidance penalties",
        ],
        process: [
            { title: "Functional Analysis", desc: "Mapping functions performed, assets used (including intangibles), and risks assumed (the 6-step risk framework)." },
            { title: "Method Selection", desc: "Selecting the most appropriate method (e.g., CUP, Cost Plus, TNMM) based on the transaction nature." },
            { title: "Benchmarking", desc: "Identifying comparable uncontrolled transactions to establish the arm's length range." },
            { title: "Documentation", desc: "Compiling the Local File and Master File as per Ministerial Decision No. 97 of 2023." },
        ],
        faq: [
            { q: "What is the Arm's Length Principle?", a: "It requires that transactions between Related Parties be priced as if they were between independent parties under similar circumstances." },
            { q: "Who are Related Parties?", a: "Natural or juridical persons associated through ownership (50%+), control, or kinship (up to the 4th degree)." },
            { q: "Do I need to maintain documentation?", a: "Yes, Taxable Persons meeting the materiality threshold must maintain both a Master File and a Local File." },
        ],
    },
    {
        id: "oman-vat",
        title: "Oman VAT",
        subtitle: "Expert guidance on VAT compliance in the Sultanate of Oman.",
        icon: FiGlobe,
        tag: "GCC Compliance",
        overview: `<p>Value Added Tax (VAT) was implemented in Oman effective from 16 April 2021, with a standard rate of <strong>5%</strong>. This aligns with the GCC Unified Agreement and applies to most goods and services, with specific provisions for zero-rating and exemptions.</p><p>We provide comprehensive support for businesses operating in Oman, from initial <strong>Registration</strong> to ongoing compliance. Our team ensures you navigate the complexities of Exempt vs. Zero-rated supplies, maintain compliant records for the mandatory 10-year period, and meet all quarterly filing deadlines to avoid penalties.</p>`,
        benefits: [
            "Accurate classification of Standard, Zero-rated, and Exempt supplies",
            "Management of Mandatory (OMR 38,500) and Voluntary (OMR 19,250) registration",
            "Guidance on input tax recovery and apportionment",
            "Record-keeping advisory for the 10-year mandatory retention period",
            "Preparation for Tourist Refund Schemes and other special provisions",
        ],
        process: [
            { title: "Registration", desc: "Assisting with online registration via the Tax Authority portal." },
            { title: "Record Keeping", desc: "Ensuring maintenance of VAT records for 10 years (15 for real estate) in compliance with the law." },
            { title: "Filing", desc: "Preparation and submission of quarterly VAT returns within 30 days of period end." },
            { title: "Advisory", desc: "Consultation on complex transactions, transitional rules, and dispute resolution." },
        ],
        faq: [
            { q: "What is the standard VAT rate in Oman?", a: "The standard rate is 5%. However, zero-rating applies to exports, basic foods, and international transport." },
            { q: "When must I register for VAT?", a: "Registration is mandatory if annual taxable supplies exceed OMR 38,500. Voluntary registration is possible above OMR 19,250." },
            { q: "How often are VAT returns filed?", a: "VAT returns must be filed on a quarterly basis, with payment due within 30 days of the quarter end." },
        ],
    },
    {
        id: "kuwait-tax",
        title: "Kuwait VAT",
        subtitle: "Strategic guidance on current tax obligations and preparation for upcoming VAT implementation.",
        icon: FiBriefcase,
        tag: "GCC Compliance",
        overview: `<p>While Kuwait is a signatory to the GCC VAT Framework Agreement, the implementation of <strong>Value Added Tax (VAT)</strong> is currently pending parliamentary approval. The draft law is under preparation, and businesses must remain agile to adapt when the 5% VAT rate is eventually introduced.</p><p>Currently, businesses must navigate other fiscal obligations, including a unified <strong>Customs Tariff of 5%</strong> on imports, and for listed companies, the <strong>National Labour Support Tax (NLST)</strong>. Our team provides comprehensive compliance support while preparing your business for the future VAT landscape.</p>`,
        benefits: [
            "Preparation for future VAT compliance (gap analysis)",
            "Management of National Labour Support Tax (NLST) for listed entities",
            "Compliance with 5% GCC Unified Customs Tariff",
            "Advisory on Social Security contributions for Kuwaiti nationals",
            "Calculation of terminal indemnity payments for expatriate staff",
        ],
        process: [
            { title: "Readiness Assessment", desc: "Evaluating current systems and contracts for future VAT readiness." },
            { title: "NLST Compliance", desc: "Calculating and filing the 2.5% employment tax for KSE-listed companies." },
            { title: "Payroll Advisory", desc: "Managing social security (11.5% employer contribution) and indemnity calculations." },
            { title: "Customs Compliance", desc: "Ensuring proper classification and valuation for the 5% customs duty." },
        ],
        faq: [
            { q: "Is VAT active in Kuwait?", a: "Not yet. The GCC framework is under discussion in Parliament, but implementation dates are pending." },
            { q: "What is the NLST?", a: "The National Labour Support Tax is a 2.5% levy on the net annual profits of Kuwaiti companies listed on the KSE." },
            { q: "Are there payroll taxes?", a: "No personal income tax exists, but employers must contribute 11.5% to social security for Kuwaiti nationals." },
        ],
    },
    {
        id: "ussalestax",
        title: "US Sales Tax",
        subtitle: "Expert guidance on the One Big Beautiful Bill Act of 2025 and its impact on your wealth.",
        icon: FiGlobe,
        tag: "US Advisory",
        overview: `<p>The <strong>One Big Beautiful Bill Act (OBBBA)</strong>, enacted in July 2025, has fundamentally reshaped the US tax landscape. By permanently extending key provisions of the 2017 Tax Cuts and Jobs Act (TCJA) and introducing new relief measures, this legislation provides long-term certainty for taxpayers.</p><p>Whether you are a US citizen, a green card holder, or a non-resident investor, minimizing your liability requires a deep understanding of these new rules. From the permanent 37% top rate to the increased estate tax exemptions, our team helps you navigate the complexities of Federal and State taxation.</p>`,
        benefits: [
            "Permanent extension of TCJA income tax rates",
            "Increased SALT deduction cap ($40,000) for 2025",
            "Lifetime Estate & Gift Tax exemption raised to $15M",
            "Expanded Qualified Small Business Stock (QSBS) exclusions",
            "New deductions for tip income and overtime compensation",
        ],
        process: [
            { title: "Impact Assessment", desc: "Analyzing how OBBBA provisions specifically affect your income and estate planning." },
            { title: "Residency Review", desc: "Determining Resident vs. Non-Resident Alien status for optimal tax treatment." },
            { title: "Compliance & Filing", desc: "Preparation of Federal (1040/NR) and State tax returns under the new regime." },
            { title: "Strategic Planning", desc: "Advising on timing of income, deductions, and gifting to maximize tax efficiency." },
        ],
        faq: [
            { q: "What are the new tax rates for 2025?", a: "The brackets are now permanent. The top rate is 37%. The 10%, 12%, 22%, 24%, 32%, and 35% brackets continue and are indexed for inflation." },
            { q: "How has the SALT deduction changed?", a: "For 2025, the State and Local Tax (SALT) deduction cap is temporarily increased to $40,000, phasing out for incomes over $500,000." },
            { q: "Did the Alternative Minimum Tax (AMT) change?", a: "Yes, the increased AMT exemption amounts from the TCJA are now permanent, providing continued relief for many middle-to-high income taxpayers." },
        ],
    },
];

// ── FAQ Accordion Item ──────────────────────────────────────────────────────
const FaqItem = ({ item, idx }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            className="border border-secondary-200 rounded-2xl overflow-hidden bg-white"
            initial={false}
        >
            <button
                className="w-full flex items-center justify-between p-6 text-left group"
                onClick={() => setOpen(!open)}
            >
                <span className="font-bold text-secondary-950 text-lg pr-4 group-hover:text-primary-600 transition-colors">
                    {item.q}
                </span>
                <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${open ? "bg-primary-600 border-primary-600" : "bg-secondary-50 border-secondary-200"}`}>
                    {open
                        ? <FiMinus className="text-white w-4 h-4" />
                        : <FiPlus className="text-secondary-600 w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-secondary-600 leading-relaxed border-t border-secondary-100 pt-4">
                            {item.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ── ServiceDetail Component ─────────────────────────────────────────────────
const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = servicesData.find((s) => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-secondary-950 tracking-tight mb-4">Service Not Found</h2>
                    <Link to="/" className="text-primary-600 font-semibold hover:underline">← Back to Home</Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="h-20 lg:h-28" />

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative bg-secondary-950 overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary-600/10 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
                {/* Gold top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" />

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 text-secondary-400 text-sm font-medium mb-12"
                    >
                      
                        
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                <Icon className="w-8 h-8 text-primary-300" />
                            </div>
                            <span className="px-4 py-1.5 rounded-full border border-accent-500/40 bg-accent-500/10 text-accent-400 text-xs font-bold tracking-widest uppercase">
                                {service.tag}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUpSpring}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-6"
                        >
                            {service.title}
                        </motion.h1>
                        <motion.p
                            variants={fadeUpSpring}
                            className="text-xl text-secondary-300 font-medium leading-relaxed max-w-2xl"
                        >
                            {service.subtitle}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* ── LEFT: Content ────────────────────────────────── */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* Overview */}
                        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                            <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-6">
                                <div className="h-[2px] w-10 bg-primary-500 rounded-full" />
                                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary-600">Overview</span>
                            </motion.div>
                            <motion.div
                                variants={fadeUpSpring}
                                className="prose prose-lg prose-slate text-secondary-700 max-w-none leading-relaxed [&_p]:mb-5 [&_strong]:text-secondary-900 [&_strong]:font-bold"
                                dangerouslySetInnerHTML={{ __html: service.overview }}
                            />
                        </motion.div>

                        {/* ── Tax Calculator (US Sales Tax only) ─────── */}
                        {service.id === "ussalestax" && <SalesTaxCalculator />}

                        {/* Benefits */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-8">
                                <div className="h-[2px] w-10 bg-primary-500 rounded-full" />
                                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary-600">Key Benefits</span>
                            </motion.div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.benefits.map((benefit, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={fadeUpSpring}
                                        className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-secondary-200 hover:border-primary-300 hover:shadow-[0_8px_24px_-8px_rgba(27,146,161,0.12)] transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-600 transition-colors duration-300">
                                            <FiCheckCircle className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <span className="font-semibold text-secondary-800 leading-snug">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Process */}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-10">
                                <div className="h-[2px] w-10 bg-primary-500 rounded-full" />
                                <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary-600">Our Process</span>
                            </motion.div>
                            <div className="space-y-6">
                                {service.process.map((step, idx) => (
                                    <motion.div key={idx} variants={fadeUpSpring} className="group relative flex gap-6">
                                        {/* Step number column */}
                                        <div className="flex flex-col items-center flex-shrink-0">
                                            <div className="w-12 h-12 rounded-2xl bg-secondary-950 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-primary-600 transition-colors duration-500">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                            {idx < service.process.length - 1 && (
                                                <div className="w-0.5 flex-1 mt-3 bg-secondary-200 min-h-[2rem]" />
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="pb-8">
                                            <h3 className="text-xl font-bold text-secondary-950 tracking-tight mb-2 group-hover:text-primary-600 transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-secondary-600 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* FAQ */}
                        {service.faq && service.faq.length > 0 && (
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                                <motion.div variants={fadeUpSpring} className="flex items-center gap-4 mb-8">
                                    <div className="h-[2px] w-10 bg-primary-500 rounded-full" />
                                    <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary-600">FAQ</span>
                                </motion.div>
                                <div className="space-y-4">
                                    {service.faq.map((item, idx) => (
                                        <FaqItem key={idx} item={item} idx={idx} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* ── RIGHT: Sticky Sidebar ─────────────────────────── */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">

                            {/* CTA Card */}
                            <div className="relative overflow-hidden rounded-[2rem] bg-secondary-950 p-8 text-white shadow-2xl">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/10 rounded-full blur-[40px] pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-6">
                                        <FiPhone className="w-5 h-5 text-accent-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight mb-3">Need Expert Advice?</h3>
                                    <p className="text-secondary-300 leading-relaxed mb-8 font-medium">
                                        Speak to one of our senior consultants today.
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {[
                                            { icon: FiPhone, text: "+91 9994467838" },
                                            { icon: FiMail, text: "rnibookkeeping@gmail.com" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                                                    <item.icon className="w-4 h-4 text-secondary-300" />
                                                </div>
                                                <span className="text-secondary-200 font-medium text-sm">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate("/#contact")}
                                        className="group w-full py-4 rounded-xl bg-white text-secondary-950 font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        Get a Free Quote
                                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Other Services */}
                            <div className="rounded-[2rem] bg-white border border-secondary-200 p-8 shadow-sm">
                                <h3 className="font-bold text-secondary-950 tracking-tight text-lg mb-6">Other Expertise</h3>
                                <div className="space-y-1">
                                    {servicesData
                                        .filter((s) => s.id !== service.id)
                                        .map((s) => (
                                            <Link
                                                key={s.id}
                                                to={`/services/${s.id}`}
                                                className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary-50 text-secondary-700 hover:text-primary-600 transition-all group"
                                            >
                                                <span className="font-semibold text-sm">{s.title}</span>
                                                <FiChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FOOTER CTA STRIP ─────────────────────────────────────── */}
            <section className="bg-secondary-950 py-20 border-t border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-tight mb-2">
                            Ready to get started?
                        </h2>
                        <p className="text-secondary-400 font-medium">
                            Schedule a confidential consultation with our team.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/#contact")}
                        className="group flex-shrink-0 flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-white text-white hover:text-secondary-950 font-bold rounded-full transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(27,146,161,0.4)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
                    >
                        Book Consultation
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
