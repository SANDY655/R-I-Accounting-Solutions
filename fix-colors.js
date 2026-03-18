const fs = require('fs');

const fApp = 'e:/Ramprakash/RI/src/App.jsx';
if (fs.existsSync(fApp)) {
  let content = fs.readFileSync(fApp, 'utf8');

  // Nav
  content = content.replace('bg-white text-secondary-600 shadow-sm', 'bg-white text-primary-600 shadow-sm');
  content = content.replace('bg-secondary-600\"></span>', 'bg-primary-500\"></span>');
  content = content.replace('bg-secondary-600 text-white text-sm font-semibold shadow-lg shadow-secondary-600/20 hover:shadow-xl hover:shadow-secondary-600/30', 'bg-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30');
  content = content.replace('bg-secondary-600 text-white font-semibold shadow-lg shadow-secondary-600/20', 'bg-accent-500 text-white font-semibold shadow-lg shadow-accent-500/20');
  
  // Badges
  content = content.replace(/bg-secondary-50 text-secondary-700 text-sm font-semibold rounded-full/g, 'bg-accent-100 text-accent-800 text-sm font-semibold rounded-full');
  content = content.replace(/bg-secondary-50 text-secondary-700 text-sm font-medium rounded-full/g, 'bg-accent-100 text-accent-800 text-sm font-medium rounded-full');
  
  // Hero
  content = content.replace('text-secondary-600">& Tax Solutions', 'text-primary-600">& Tax Solutions');
  content = content.replace('bg-secondary-600 text-white font-medium hover:bg-secondary-700 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-600/20', 'bg-primary-500 text-white font-medium hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20');
  content = content.replace('hover:border-secondary-600 hover:text-secondary-600', 'hover:border-primary-500 hover:text-primary-600');
  
  // Stats
  content = content.replace(/text-secondary-600 tracking-tight/g, 'text-primary-600 tracking-tight');
  
  // Services
  content = content.replace(/bg-secondary-50 flex items-center justify-center mb-5 group-hover:bg-secondary-100/g, 'bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100');
  content = content.replace(/text-secondary-600" \/>/g, 'text-primary-600" \/>');
  content = content.replace(/rounded-full bg-secondary-600 flex-shrink-0/g, 'rounded-full bg-accent-500 flex-shrink-0');
  content = content.replace(/text-secondary-600 font-semibold text-sm hover:text-secondary-700/g, 'text-primary-600 font-semibold text-sm hover:text-primary-700');
  
  // About / Contact Icons
  content = content.replace(/bg-secondary-50 flex items-center justify-center flex-shrink-0/g, 'bg-primary-50 flex items-center justify-center flex-shrink-0');
  
  // Contact Form
  content = content.replace('bg-secondary-600 text-white font-semibold text-base shadow-lg shadow-secondary-600/25 hover:bg-secondary-700 hover:shadow-xl hover:shadow-secondary-600/35', 'bg-primary-500 text-white font-semibold text-base shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/35');

  fs.writeFileSync(fApp, content);
  console.log('Updated App.jsx');
}

const fService = 'e:/Ramprakash/RI/src/pages/ServiceDetail.jsx';
if (fs.existsSync(fService)) {
  let content = fs.readFileSync(fService, 'utf8');
  content = content.replace(/bg-secondary-600/g, 'bg-primary-500');
  content = content.replace(/text-secondary-600 hover:text-secondary-700/g, 'text-primary-600 hover:text-primary-700');
  content = content.replace(/text-secondary-600" \/>/g, 'text-primary-600" \/>');
  content = content.replace(/bg-secondary-50 flex items-center justify-center flex-shrink-0/g, 'bg-primary-50 flex items-center justify-center flex-shrink-0');
  content = content.replace(/text-secondary-600 tracking-tight/g, 'text-primary-600 tracking-tight');
  content = content.replace(/text-secondary-600">/g, 'text-primary-600">');
  fs.writeFileSync(fService, content);
  console.log('Updated ServiceDetail.jsx');
}

const fTax = 'e:/Ramprakash/RI/src/components/SalesTaxCalculator.jsx';
if (fs.existsSync(fTax)) {
  let content = fs.readFileSync(fTax, 'utf8');
  content = content.replace(/bg-secondary-600/g, 'bg-primary-500');
  content = content.replace(/text-secondary-600/g, 'text-primary-600');
  fs.writeFileSync(fTax, content);
  console.log('Updated SalesTaxCalculator.jsx');
}
