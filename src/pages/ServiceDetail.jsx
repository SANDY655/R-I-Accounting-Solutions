import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiBarChart2,
    FiSearch,
    FiFileText,
    FiBriefcase,
    FiHome,
    FiTrendingUp,
    FiDownload,
    FiPhone,
    FiMail,
    FiGlobe,
    FiChevronRight
} from "react-icons/fi";
import SalesTaxCalculator from "../components/SalesTaxCalculator";

const servicesData = [
    {
        id: "accounting",
        title: "Accounting Services",
        subtitle: "Streamline your financial operations with expert accounting solutions designed for growth.",
        icon: FiBarChart2,
        overview: `
      <p>In today's fast-paced business environment, accurate and timely financial information is crucial for making informed decisions. Our professional accounting services go beyond simple data entry to provide you with a comprehensive view of your business's financial health.</p>
      <p>We combine deep industry knowledge with the latest financial technology to deliver accounting solutions that are efficient, transparent, and compliant with all local regulations. Whether you are a startup needing to set up your first set of books or a large enterprise looking to optimize your financial processes, our team is equipped to support your journey.</p>
    `,
        benefits: [
            "Real-time visibility into your financial performance",
            "Compliance with International Financial Reporting Standards (IFRS)",
            "Cost reduction through optimized financial processes",
            "Strategic insights to drive business growth",
            "Reduced risk of errors and non-compliance penalties"
        ],
        process: [
            { title: "Initial Consultation", desc: "We strive to understand your specific business needs, industry challenges, and financial goals." },
            { title: "System Setup", desc: "Configuration of accounting software and chart of accounts tailored to your operations." },
            { title: "Ongoing Management", desc: "Regular recording of transactions, bank reconciliations, and expense tracking." },
            { title: "Reporting & Advisory", desc: "Monthly financial reports and quarterly strategy sessions to review performance." }
        ],
        faq: [
            { q: "Do you use cloud-based accounting software?", a: "Yes, we specialize in Xero, QuickBooks, and Zoho Books, allowing you access to your financial data from anywhere." },
            { q: "How often will I receive financial reports?", a: "We provide standard monthly management reports, but can customize the frequency to weekly or quarterly based on your needs." },
            { q: "Can you help with backlog accounting?", a: "Absolutely. We have a dedicated team for cleaning up and updating historical financial records." }
        ]
    },
    {
        id: "auditing-assurance",
        title: "Auditing & Assurance",
        subtitle: "Independent verification to build trust and ensure compliance.",
        icon: FiSearch,
        overview: `
      <p>Stakeholder trust is the currency of modern business. Our auditing and assurance services provide the independent validation your investors, lenders, and regulators require. We adhere to the highest ethical standards and rigorous methodologies to ensure your financial statements present a true and fair view.</p>
      <p>Beyond the statutory requirements, our audit process is designed to add value. We identify weaknesses in internal controls and operational inefficiencies, providing you with actionable recommendations to strengthen your business governance.</p>
    `,
        benefits: [
            "Enhanced credibility with banks and investors",
            "Identification of internal control weaknesses",
            "Prevention and detection of fraud",
            "Detailed management letters with improvement recommendations",
            "Compliance with statutory audit requirements"
        ],
        process: [
            { title: "Planning & Risk Assessment", desc: "Understanding your business environment and identifying key risk areas." },
            { title: "Internal Control Review", desc: "Evaluating the design and effectiveness of your internal financial controls." },
            { title: "Substantive Testing", desc: "Verifying balances and transactions through rigorous testing procedures." },
            { title: "Reporting", desc: "Issuing the auditor's report and presenting findings to management." }
        ],
        faq: [
            { q: "What is the difference between internal and external audit?", a: "Internal audit focuses on improving operations and controls, while external audit provides an independent opinion on financial statements for third parties." },
            { q: "How long does a typical audit take?", a: "Timeline varies by company size, but typically takes 2-4 weeks after we receive all necessary documentation." }
        ]
    },
    {
        id: "book-keeping",
        title: "Professional Bookkeeping",
        subtitle: "Accurate, organized, and up-to-date financial records for peace of mind.",
        icon: FiFileText,
        overview: `
      <p>Bookkeeping is the foundation of any successful financial management system. Without accurate records, you are flying blind. Our bookkeeping services ensure that every transaction is recorded correctly, categorized properly, and reconciled timely.</p>
      <p>We handle the tedious day-to-day financial tasks so you can focus on your core business activities. From invoicing clients to tracking expenses and managing vendor payments, we act as your extended finance department.</p>
    `,
        benefits: [
            "Audit-ready financial records at all times",
            "Better cash flow management through timely invoicing",
            "Simplified tax filing process",
            "Complete transparency of business expenses",
            "Time savings for business owners"
        ],
        process: [
            { title: "Document Collection", desc: "Digital collection of receipts, invoices, and bank statements." },
            { title: "Processing", desc: "Recording and categorizing transactions in the general ledger." },
            { title: "Reconciliation", desc: "Matching records with bank and credit card statements to ensure accuracy." },
            { title: "Review", desc: "Final review of the ledger before closing the month." }
        ],
        faq: [
            { q: "Do I need to send physical receipts?", a: "No, we use digital tools. You can simply snap a photo or forward emails to our system." },
            { q: "What if I'm behind on my books?", a: "We offer catch-up bookkeeping services to bring your records up to date quickly." }
        ]
    },
    {
        id: "vat-services",
        title: "UAE VAT",
        subtitle: "Expert guidance on Federal Decree-Law No. 8 of 2017 and Executive Regulations.",
        icon: FiBriefcase,
        overview: `
      <p>Value Added Tax (VAT) was introduced in the UAE on January 1, 2018, under <strong>Federal Decree-Law No. 8 of 2017</strong>. It is a 5% tax imposed on the import and supply of Goods and Services at each stage of production and distribution.</p>
      <p>Compliance is mandatory for businesses exceeding the defined thresholds. Our VAT practice ensures your business adheres to these regulations, utilizing mechanisms like the <strong>Reverse Charge Mechanism (Article 48)</strong> and <strong>Tax Groups (Article 14)</strong> to optimize your tax position.</p>
      <p>We assist with everything from initial <strong>Tax Registration</strong> to complex <strong>Designated Zone</strong> assessments and <strong>Voluntary Disclosures</strong>, ensuring you avoid administrative penalties.</p>
    `,
        benefits: [
            "Accurate application of the 5% Standard Rate and 0% Zero Rate",
            "Management of Mandatory (AED 375k) and Voluntary (AED 187.5k) Registration",
            "Optimization via Tax Groups (Article 14) and Designated Zones (Article 50)",
            "Input Tax Recovery and Refund processing",
            "Representation during Tax Audits and Assessments"
        ],
        process: [
            { title: "Registration", desc: "Assisting with Mandatory (AED 375,000 threshold) or Voluntary (AED 187,500 threshold) registration." },
            { title: "Compliance", desc: "Ensuring proper issuance of Tax Invoices (Article 65) and record-keeping for minimum 5 years." },
            { title: "Filing", desc: "Preparation and submission of Tax Returns within the specific Tax Period boundaries." },
            { title: "Advisory", desc: "Guidance on complex transactions, Deemed Supplies, and Capital Assets Schemes." }
        ],
        faq: [
            { q: "What is the Mandatory Registration Threshold?", a: "You must register if your taxable supplies/expenses exceed AED 375,000 in the previous 12 months or are expected to in the next 30 days." },
            { q: "Can I form a Tax Group?", a: "Yes, Related Parties with a Place of Establishment in the State can form a Tax Group to be treated as a single Taxable Person." },
            { q: "How are Imports treated?", a: "Tax is due on Import. However, the Reverse Charge Mechanism often applies for Taxable Persons, shifting liability to the recipient." }
        ]
    },
    {
        id: "corporate-tax",
        title: "Corporate Tax UAE",
        subtitle: "Comprehensive compliance and advisory for the evolving UAE Corporate Tax landscape.",
        icon: FiHome,
        overview: `
      <p>The UAE Corporate Tax (CT) regime, effective for financial years starting on or after 1 June 2023, applies to all business activities across the Emirates. With a standard rate of <strong>9%</strong> on taxable income exceeding AED 375,000, businesses must navigate complex requirements including <strong>Transfer Pricing</strong>, <strong>Free Zone</strong> regulations, and <strong>Pillar Two (DMTT)</strong> implementation for large MNEs.</p>
      <p>We provide end-to-end support, from <strong>Impact Assessment</strong> and <strong>Registration</strong> to filing and advisory. Our experts help you leverage key reliefs such as <strong>Small Business Relief</strong>, <strong>Participation Exemptions</strong>, and <strong>Tax Grouping</strong> to optimize your tax position while ensuring full compliance with FTA regulations and IFRS standards.</p>
    `,
        benefits: [
            "0% Tax Rate for Qualifying Free Zone Persons (subject to conditions)",
            "Small Business Relief for revenues under AED 3 million (until 2026)",
            "Participation Exemption on dividends and capital gains",
            "Tax Grouping for consolidated filing and loss utilization",
            "Reliefs for intra-group transfers and business restructuring"
        ],
        process: [
            { title: "Registration & Assessment", desc: "Mandatory tax registration and initial impact assessment to determine residency and tax status." },
            { title: "Financial Structuring", desc: "Reviewing legal entities to ensure tax efficiency, including Free Zone substance and Tax Group formation." },
            { title: "Transfer Pricing", desc: "Ensuring related-party transactions meet the Arm's Length Principle and maintaining Master/Local files." },
            { title: "Compliance & Filing", desc: "Preparation of IFRS financial statements and filing of annual Corporate Tax returns." }
        ],
        faq: [
            { q: "What are the UAE Corporate Tax rates?", a: "0% on income up to AED 375,000, and 9% on income above that. A 0% rate applies to Qualifying Free Zone Persons on qualifying income." },
            { q: "Who is exempt from Corporate Tax?", a: "Exempt persons include Government entities, extractive businesses, qualifying public benefit entities, and certain investment/pension funds." },
            { q: "How are Free Zone companies taxed?", a: "They can benefit from 0% CT if they meet 'qualifying' conditions: adequate substance, deriving qualifying income, and complying with transfer pricing rules." },
            { q: "What is the Small Business Relief?", a: "Businesses with revenue below AED 3 million can elect to be treated as having no taxable income for tax periods up to Dec 31, 2026." }
        ]
    },

    {
        id: "transfer-pricing",
        title: "Transfer Pricing (UAE)",
        subtitle: "Expert guidance on Federal Decree-Law No. 47 of 2022 and the Arm's Length Principle.",
        icon: FiTrendingUp,
        overview: `<p>Under <strong>Federal Decree-Law No. 47 of 2022</strong> (the "Corporate Tax Law"), compliance with <strong>Transfer Pricing</strong> regulations is mandatory for Related Parties and Connected Persons in the UAE. The law requires that all Controlled Transactions be conducted at an <strong>Arm's Length Price</strong>, as if they were between independent parties.</p>
      <p>Our Transfer Pricing practice helps you navigate these rigorous standards. Whether you are a Multinational Enterprise (MNE) or a domestic group, we ensure your inter-company transactions—from goods and services to loans and intangibles—are priced correctly and fully documented.</p>
      <p>We assist with the preparation of Master Files and Local Files, conducting robust Comparability Analyses using the five OECD-approved methods (CUP, RPM, CPM, TNMM, and Profit Split) to defend your pricing against FTA audits.</p>
    `,
        benefits: [
            "Full compliance with Article 34 of the Corporate Tax Law",
            "Mitigation of double taxation risks",
            "Defense-ready Transfer Pricing documentation (Master/Local File)",
            "Accurate application of the Arm's Length Principle",
            "Prevention of profit shifting and tax avoidance penalties"
        ],
        process: [
            { title: "Functional Analysis", desc: "Mapping functions performed, assets used (including intangibles), and risks assumed (the 6-step risk framework)." },
            { title: "Method Selection", desc: "Selecting the most appropriate method (e.g., CUP, Cost Plus, TNMM) based on the transaction nature." },
            { title: "Benchmarking", desc: "Identifying comparable uncontrolled transactions to establish the arm's length range." },
            { title: "Documentation", desc: "Compiling the Local File and Master File as per Ministerial Decision No. 97 of 2023." }
        ],
        faq: [
            { q: "What is the Arm's Length Principle?", a: "It requires that transactions between Related Parties be priced as if they were between independent parties under similar circumstances." },
            { q: "Who are Related Parties?", a: "Natural or juridical persons associated through ownership (50%+), control, or kinship (up to the 4th degree)." },
            { q: "Do I need to maintain documentation?", a: "Yes, Taxable Persons meeting the materiality threshold must maintain both a Master File and a Local File." }
        ]
    },
    {
        id: "oman-vat",
        title: "Oman VAT",
        subtitle: "Expert guidance on VAT compliance in the Sultanate of Oman.",
        icon: FiGlobe,
        overview: `
      <p>Value Added Tax (VAT) was implemented in Oman effective from 16 April 2021, with a standard rate of <strong>5%</strong>. This aligns with the GCC Unified Agreement and applies to most goods and services, with specific provisions for zero-rating and exemptions.</p>
      <p>We provide comprehensive support for businesses operating in Oman, from initial <strong>Registration</strong> to ongoing compliance. Our team ensures you navigate the complexities of Exempt vs. Zero-rated supplies, maintain compliant records for the mandatory 10-year period, and meet all quarterly filing deadlines to avoid penalties.</p>
    `,
        benefits: [
            "Accurate classification of Standard, Zero-rated, and Exempt supplies",
            "Management of Mandatory (OMR 38,500) and Voluntary (OMR 19,250) registration",
            "Guidance on input tax recovery and apportionment",
            "Keep accounting records, books, invoices, and other documents /records in any language,",
            "Preparation for Tourist Refund Schemes and other special provisions"
        ],
        process: [
            { title: "Registration", desc: "Assisting with online registration via the Tax Authority portal." },
            { title: "Record Keeping", desc: "Ensuring maintenance of VAT records for 10 years (15 for real estate) in compliance with the law." },
            { title: "Filing", desc: "Preparation and submission of quarterly VAT returns within 30 days of period end." },
            { title: "Advisory", desc: "Consultation on complex transactions, transitional rules, and dispute resolution." }
        ],
        faq: [
            { q: "What is the standard VAT rate in Oman?", a: "The standard rate is 5%. However, zero-rating applies to exports, basic foods, and international transport." },
            { q: "When must I register for VAT?", a: "Registration is mandatory if annual taxable supplies exceed OMR 38,500. Voluntary registration is possible above OMR 19,250." },
            { q: "How often are VAT returns filed?", a: "VAT returns must be filed on a quarterly basis, with payment due within 30 days of the quarter end." }
        ]
    },
    {
        id: "kuwait-tax",
        title: "Kuwait VAT",
        subtitle: "Strategic guidance on current tax obligations and preparation for upcoming VAT implementation.",
        icon: FiBriefcase,
        overview: `
      <p>While Kuwait is a signatory to the GCC VAT Framework Agreement, the implementation of <strong>Value Added Tax (VAT)</strong> is currently pending parliamentary approval. The draft law is under preparation, and businesses must remain agile to adapt when the 5% VAT rate is eventually introduced.</p>
      <p>Currently, businesses must navigate other fiscal obligations, including a unified <strong>Customs Tariff of 5%</strong> on imports, and for listed companies, the <strong>National Labour Support Tax (NLST)</strong>. Our team provides comprehensive compliance support for these existing regimes while preparing your business for the future VAT landscape.</p>
    `,
        benefits: [
            "Preparation for future VAT compliance (gap analysis)",
            "Management of National Labour Support Tax (NLST) for listed entities",
            "Compliance with 5% GCC Unified Customs Tariff",
            "Advisory on Social Security contributions for Kuwaiti nationals",
            "Calculation of terminal indemnity payments for expatriate staff"
        ],
        process: [
            { title: "Readiness Assessment", desc: "Evaluating current systems and contracts for future VAT readiness." },
            { title: "NLST Compliance", desc: "Calculating and filing the 2.5% employment tax for KSE-listed companies." },
            { title: "Payroll Advisory", desc: "Managing social security (11.5% employer contribution) and indemnity calculations." },
            { title: "Customs Compliance", desc: "Ensuring proper classification and valuation for the 5% customs duty." }
        ],
        faq: [
            { q: "Is VAT active in Kuwait?", a: "Not yet. The GCC framework is under discussion in Parliament, but implementation dates are pending." },
            { q: "What is the NLST?", a: "The National Labour Support Tax is a 2.5% levy on the net annual profits of Kuwaiti companies listed on the KSE." },
            { q: "Are there payroll taxes?", a: "No personal income tax exists, but employers must contribute 11.5% to social security for Kuwaiti nationals." }
        ]
    },
    {
        id: "ussalestax",
        title: "US Sales Tax",
        subtitle: "Expert guidance on the One Big Beautiful Bill Act of 2025 and its impact on your wealth.",
        icon: FiGlobe,
        overview: `
      <p>The <strong>One Big Beautiful Bill Act (OBBBA)</strong>, enacted in July 2025, has fundamentally reshaped the US tax landscape. By permanently extending key provisions of the 2017 Tax Cuts and Jobs Act (TCJA) and introducing new relief measures, this legislation provides long-term certainty for taxpayers.</p>
      <p>Whether you are a US citizen, a green card holder, or a non-resident investor, minimizing your liability requires a deep understanding of these new rules. From the permanent 37% top rate to the increased estate tax exemptions, our team helps you navigate the complexities of Federal and State taxation.</p>
      <p>We specialize in cross-border tax planning, ensuring that you optimize your global tax position while remaining fully compliant with the IRS and international treaties.</p>
    `,
        benefits: [
            "Permanent extension of TCJA income tax rates",
            "Increased SALT deduction cap ($40,000) for 2025",
            "Lifetime Estate & Gift Tax exemption raised to $15M",
            "Expanded Qualified Small Business Stock (QSBS) exclusions",
            "New deductions for tip income and overtime compensation"
        ],
        process: [
            { title: "Impact Assessment", desc: "Analyzing how OBBBA provisions specifically affect your income and estate planning." },
            { title: "Residency Review", desc: "Determining Resident vs. Non-Resident Alien status for optimal tax treatment." },
            { title: "Compliance & Filing", desc: "Preparation of Federal (1040/NR) and State tax returns under the new regime." },
            { title: "Strategic Planning", desc: "Advising on timing of income, deductions, and gifting to maximize tax efficiency." }
        ],
        faq: [
            { q: "What are the new tax rates for 2025?", a: "The brackets are now permanent. The top rate is 37%. The 10%, 12%, 22%, 24%, 32%, and 35% brackets continue and are indexed for inflation." },
            { q: "How has the SALT deduction changed?", a: "For 2025, the State and Local Tax (SALT) deduction cap is temporarily increased to $40,000, phasing out for incomes over $500,000." },
            { q: "Did the Alternative Minimum Tax (AMT) change?", a: "Yes, the increased AMT exemption amounts from the TCJA are now permanent, providing continued relief for many middle-to-high income taxpayers." }
        ]
    }
];

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = servicesData.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
                    <Link to="/" className="text-emerald-600 font-semibold mt-4 inline-block hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Navbar Offset */}
            <div className="h-20" />

            {/* Hero Section */}
            <section className="bg-emerald-900 text-white relative overflow-hidden py-20 lg:py-24">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-20 translate-y-1/3 -translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-emerald-200 text-sm font-medium mb-6">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <FiChevronRight className="w-4 h-4" />
                        <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-white">{service.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                            <Icon className="w-10 h-10 text-emerald-300" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                                {service.title}
                            </h1>
                            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl leading-relaxed">
                                {service.subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
                                Overview
                            </h2>
                            <div
                                className="prose prose-lg prose-slate text-slate-600 max-w-none leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: service.overview }}
                            />
                        </motion.div>

                        {/* US Sales Tax Calculator */}
                        {service.id === 'ussalestax' && (
                            <SalesTaxCalculator />
                        )}

                        {/* Benefits Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
                                Key Benefits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {service.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <FiCheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <span className="font-medium text-slate-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Process Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
                                Our Process
                            </h2>
                            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                                {service.process.map((step, idx) => (
                                    <div key={idx} className="relative flex items-start gap-6">
                                        <div className="absolute left-0 w-10 h-10 rounded-full bg-white border-4 border-emerald-50 text-emerald-600 font-bold flex items-center justify-center z-10 shadow-sm">
                                            {idx + 1}
                                        </div>
                                        <div className="pt-2 pl-14">
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* FAQ Accordion */}
                        {(service.faq && service.faq.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {service.faq.map((item, idx) => (
                                        <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                                            <div className="p-6">
                                                <h4 className="font-bold text-slate-900 mb-2 text-lg">{item.q}</h4>
                                                <p className="text-slate-600">{item.a}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Need Help Card */}
                        <div className="bg-emerald-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                            <h3 className="text-2xl font-bold mb-4">Need Expert Advice?</h3>
                            <p className="text-emerald-100 mb-6 leading-relaxed">
                                Speak to one of our consultants to see how we can help your business grow.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
                                        <FiPhone className="w-4 h-4 text-emerald-300" />
                                    </div>
                                    <span className="font-medium">+91 XXXXXXXX</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
                                        <FiMail className="w-4 h-4 text-emerald-300" />
                                    </div>
                                    <span className="font-medium">contact@company.com</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/#contact')}
                                className="w-full py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg"
                            >
                                Get Specific Quote
                            </button>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg">Other Services</h3>
                            <div className="space-y-2">
                                {servicesData.filter(s => s.id !== service.id).map(s => (
                                    <Link
                                        key={s.id}
                                        to={`/services/${s.id}`}
                                        className="block p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-emerald-600 transition-colors font-medium flex justify-between items-center group"
                                    >
                                        {s.title}
                                        <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Download Brochure */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
