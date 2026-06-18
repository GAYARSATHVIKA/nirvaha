const fs = require('fs');
let content = fs.readFileSync('c:\\Users\\chara\\nirvaha\\frontend\\src\\admin\\pages\\LandingManagementPage.tsx', 'utf8');

// Header and general text
content = content.replace(/text-white\/40/g, 'text-gray-500');
content = content.replace(/text-white\/30/g, 'text-gray-400');
content = content.replace(/text-white\/20/g, 'text-gray-400 hover:text-gray-600');
content = content.replace(/text-white/g, 'text-[#1b4332]');

// Borders
content = content.replace(/border-white\/10/g, 'border-emerald-200');
content = content.replace(/border-white\/5/g, 'border-emerald-100');

// Backgrounds
content = content.replace(/bg-black\/40/g, 'bg-white shadow-inner');
content = content.replace(/bg-black\/20/g, 'bg-white shadow-sm border border-emerald-100');
content = content.replace(/bg-white\/5/g, 'bg-white shadow-sm border border-emerald-100');
content = content.replace(/bg-white\/10/g, 'bg-emerald-50');

// Fix buttons that became text-[#1b4332] but should be text-white
content = content.replace(/bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-\[\#1b4332\]/g, 'bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white');
content = content.replace(/bg-emerald-500 hover:bg-emerald-600 text-\[\#1b4332\]/g, 'bg-emerald-600 hover:bg-emerald-700 text-white');
content = content.replace(/bg-emerald-500\/20 text-emerald-400/g, 'bg-emerald-100 text-emerald-700');

// Modal Background
content = content.replace(/bg-\[\#111\]/g, 'bg-white');
content = content.replace(/bg-black\/80/g, 'bg-black/40'); // overlay

// Specific fixes for text readability inside inputs
content = content.replace(/text-\[\#1b4332\] outline-none/g, 'text-gray-900 outline-none');
content = content.replace(/border-dashed border-emerald-200/g, 'border-dashed border-emerald-300');
content = content.replace(/hover:text-\[\#1b4332\] transition-colors/g, 'hover:text-emerald-700 transition-colors');
content = content.replace(/text-gray-500 hover:bg-white border border-emerald-100 hover:text-\[\#1b4332\]/g, 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700');
content = content.replace(/text-gray-500 hover:bg-emerald-50 hover:text-\[\#1b4332\]/g, 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700');

// Fix some specific buttons that might look weird
content = content.replace(/bg-white shadow-sm border border-emerald-100 hover:bg-emerald-50 text-\[\#1b4332\]/g, 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200');

fs.writeFileSync('c:\\Users\\chara\\nirvaha\\frontend\\src\\admin\\pages\\LandingManagementPage.tsx', content);
console.log('Done replacing colors');
