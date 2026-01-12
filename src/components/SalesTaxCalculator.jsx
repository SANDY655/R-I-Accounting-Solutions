import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const taxData = [
    { state: "Alabama", stateRate: "4%", localRate: "1% - 8.5%", avgRate: "9.173%", rank: 5 },
    { state: "Alaska", stateRate: "0%", localRate: "0% - 7.85%", avgRate: "1.855%", rank: 44 },
    { state: "Arizona", stateRate: "5.6%", localRate: "0% - 10.4%", avgRate: "8.595%", rank: 12 },
    { state: "Arkansas", stateRate: "6.5%", localRate: "0% - 6.125%", avgRate: "9.188%", rank: 4 },
    { state: "California", stateRate: "6%", localRate: "1.25% - 9.5%", avgRate: "8.83%", rank: 8 },
    { state: "Colorado", stateRate: "2.9%", localRate: "0% - 8.75%", avgRate: "7.135%", rank: 21 },
    { state: "Connecticut", stateRate: "6.35%", localRate: "0%", avgRate: "6.35%", rank: 30 },
    { state: "Delaware", stateRate: "0%", localRate: "0%", avgRate: "0%", rank: 45 },
    { state: "District of Columbia", stateRate: "6%", localRate: "0%", avgRate: "6%", rank: 37 },
    { state: "Florida", stateRate: "6%", localRate: "0% - 2%", avgRate: "7.061%", rank: 24 },
    { state: "Georgia", stateRate: "4%", localRate: "2% - 5%", avgRate: "7.744%", rank: 16 },
    { state: "Hawaii", stateRate: "4%", localRate: "0.5% - 0.5%", avgRate: "4.5%", rank: 43 },
    { state: "Idaho", stateRate: "6%", localRate: "0% - 3%", avgRate: "6.067%", rank: 36 },
    { state: "Illinois", stateRate: "6.25%", localRate: "0% - 5.75%", avgRate: "8.259%", rank: 11 },
    { state: "Indiana", stateRate: "7%", localRate: "0%", avgRate: "7%", rank: 25 },
    { state: "Iowa", stateRate: "6%", localRate: "0% - 1%", avgRate: "6.992%", rank: 26 },
    { state: "Kansas", stateRate: "6.5%", localRate: "0% - 5%", avgRate: "8.596%", rank: 9 },
    { state: "Kentucky", stateRate: "6%", localRate: "0%", avgRate: "6%", rank: 37 },
    { state: "Louisiana", stateRate: "5%", localRate: "0% - 8.5%", avgRate: "10.18%", rank: 2 },
    { state: "Maine", stateRate: "5.5%", localRate: "0%", avgRate: "5.5%", rank: 42 },
    { state: "Maryland", stateRate: "6%", localRate: "0%", avgRate: "6%", rank: 37 },
    { state: "Massachusetts", stateRate: "6.25%", localRate: "0%", avgRate: "6.25%", rank: 32 },
    { state: "Michigan", stateRate: "6%", localRate: "0%", avgRate: "6%", rank: 37 },
    { state: "Minnesota", stateRate: "6.875%", localRate: "0% - 6.5%", avgRate: "7.793%", rank: 17 },
    { state: "Mississippi", stateRate: "7%", localRate: "0% - 1%", avgRate: "7.063%", rank: 23 },
    { state: "Missouri", stateRate: "4.225%", localRate: "0.5% - 8.013%", avgRate: "8.136%", rank: 13 },
    { state: "Montana", stateRate: "0%", localRate: "0%", avgRate: "0%", rank: 45 },
    { state: "Nebraska", stateRate: "5.5%", localRate: "0% - 4.75%", avgRate: "6.366%", rank: 29 },
    { state: "Nevada", stateRate: "4.6%", localRate: "2.25% - 12.29%", avgRate: "8.244%", rank: 15 },
    { state: "New Hampshire", stateRate: "0%", localRate: "0%", avgRate: "0%", rank: 45 },
    { state: "New Jersey", stateRate: "6.625%", localRate: "0% - 2%", avgRate: "6.628%", rank: 28 },
    { state: "New Mexico", stateRate: "4.875%", localRate: "0.375% - 8.812%", avgRate: "7.463%", rank: 22 },
    { state: "New York", stateRate: "4%", localRate: "3% - 16%", avgRate: "8.308%", rank: 10 },
    { state: "North Carolina", stateRate: "4.75%", localRate: "2% - 2.75%", avgRate: "6.972%", rank: 27 },
    { state: "North Dakota", stateRate: "5%", localRate: "0% - 3.75%", avgRate: "6.078%", rank: 35 },
    { state: "Ohio", stateRate: "5.75%", localRate: "0.75% - 2.5%", avgRate: "7.279%", rank: 19 },
    { state: "Oklahoma", stateRate: "4.5%", localRate: "0.35% - 7%", avgRate: "8.866%", rank: 7 },
    { state: "Oregon", stateRate: "0%", localRate: "0%", avgRate: "0%", rank: 45 },
    { state: "Pennsylvania", stateRate: "6%", localRate: "0% - 2%", avgRate: "6.165%", rank: 34 },
    { state: "Puerto Rico", stateRate: "10.5%", localRate: "1% - 1%", avgRate: "11.5%", rank: 1 },
    { state: "Rhode Island", stateRate: "7%", localRate: "0%", avgRate: "7%", rank: 25 },
    { state: "South Carolina", stateRate: "6%", localRate: "0% - 7%", avgRate: "7.679%", rank: 18 },
    { state: "South Dakota", stateRate: "4.2%", localRate: "0% - 6.2%", avgRate: "5.98%", rank: 38 },
    { state: "Tennessee", stateRate: "7%", localRate: "2% - 2.75%", avgRate: "9.619%", rank: 3 },
    { state: "Texas", stateRate: "6.25%", localRate: "0% - 2%", avgRate: "7.97%", rank: 14 },
    { state: "Utah", stateRate: "4.85%", localRate: "1.5% - 7.5%", avgRate: "7.324%", rank: 20 },
    { state: "Vermont", stateRate: "6%", localRate: "0% - 1%", avgRate: "6.26%", rank: 31 },
    { state: "Virginia", stateRate: "4.3%", localRate: "1% - 2.7%", avgRate: "5.634%", rank: 39 },
    { state: "Washington", stateRate: "6.5%", localRate: "1.1% - 4.1%", avgRate: "8.956%", rank: 6 },
    { state: "West Virginia", stateRate: "6%", localRate: "0% - 7%", avgRate: "6.271%", rank: 33 },
    { state: "Wisconsin", stateRate: "5%", localRate: "0% - 2.9%", avgRate: "5.61%", rank: 40 },
    { state: "Wyoming", stateRate: "4%", localRate: "0% - 5%", avgRate: "5.503%", rank: 41 }
];

const SalesTaxCalculator = () => {
    const [selectedState, setSelectedState] = useState(taxData[0].state);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentData = taxData.find(d => d.state === selectedState) || taxData[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm mt-10"
        >
            <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-2">US Sales Tax Rates Calculator (2026)</h3>
                <p className="text-slate-600 text-sm">Select a state to view detailed sales tax information.</p>
            </div>

            <div className="p-6 lg:p-8">
                {/* State Selection Dropdown - Custom Implementation */}
                <div className="mb-8 max-w-xs relative z-20" ref={dropdownRef}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select State
                    </label>

                    {/* Dropdown Trigger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 flex items-center justify-between p-3 transition-all hover:border-emerald-400"
                    >
                        <span className="font-medium truncate">{selectedState}</span>
                        <FiChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu - Forced DOWN */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto"
                            >
                                {taxData.map((data) => (
                                    <button
                                        key={data.state}
                                        onClick={() => {
                                            setSelectedState(data.state);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 transition-colors flex items-center justify-between
                      ${selectedState === data.state ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'}
                    `}
                                    >
                                        {data.state}
                                        {selectedState === data.state && (
                                            <FiCheck className="w-4 h-4 text-emerald-600" />
                                        )}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Data Display - 5 Column Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                    {/* State Name */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">State Name</span>
                        <span className="text-lg font-bold text-slate-900">{currentData.state}</span>
                    </div>

                    {/* State Rate */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">State Rate</span>
                        <span className="text-lg font-bold text-emerald-600">{currentData.stateRate}</span>
                    </div>

                    {/* Local Rate Range */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Local Rate Range</span>
                        <span className="text-lg font-bold text-slate-900">{currentData.localRate}</span>
                    </div>

                    {/* Avg Rate */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg. State + Local</span>
                        <span className="text-lg font-bold text-emerald-600">{currentData.avgRate}</span>
                    </div>

                    {/* Combined Rank */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Combined Tax Rank</span>
                        <span className="text-lg font-bold text-slate-900">#{currentData.rank}</span>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default SalesTaxCalculator;
