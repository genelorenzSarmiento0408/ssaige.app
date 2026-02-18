/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Purple theme
    'bg-purple-50', 'bg-purple-100', 'bg-purple-600', 'bg-purple-700', 'bg-purple-900/30', 'bg-purple-900/50',
    'bg-pink-50', 'bg-pink-100', 'bg-pink-600', 'bg-pink-700',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-500', 'bg-orange-600',
    'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900', 'text-purple-200',
    'text-pink-600', 'text-pink-700', 'text-pink-900', 'text-pink-200',
    'text-orange-600',
    'border-purple-100', 'border-purple-300', 'border-purple-400', 'border-purple-500', 'border-purple-600',
    'border-pink-100', 'border-pink-300', 'border-pink-600',
    'border-orange-100', 'border-orange-300', 'border-orange-600',
    'from-purple-600', 'to-pink-600', 'to-orange-500', 'via-pink-600',
    'hover:text-purple-600', 'hover:text-purple-700', 'hover:bg-purple-50', 'hover:bg-purple-700', 'hover:bg-purple-900/50',
    'hover:border-purple-300', 'hover:bg-pink-700',
    
    // Green theme
    'bg-emerald-50', 'bg-emerald-100', 'bg-emerald-600', 'bg-emerald-700', 'bg-emerald-900/30', 'bg-emerald-900/50',
    'bg-teal-50', 'bg-teal-100', 'bg-teal-600', 'bg-teal-700',
    'bg-lime-50', 'bg-lime-100', 'bg-lime-500', 'bg-lime-600',
    'text-emerald-600', 'text-emerald-700', 'text-emerald-800', 'text-emerald-900', 'text-emerald-200',
    'text-teal-600', 'text-teal-700', 'text-teal-900', 'text-teal-200',
    'text-lime-600',
    'border-emerald-100', 'border-emerald-300', 'border-emerald-400', 'border-emerald-500', 'border-emerald-600',
    'border-teal-100', 'border-teal-300', 'border-teal-600',
    'border-lime-100', 'border-lime-300', 'border-lime-600',
    'from-emerald-600', 'to-teal-600', 'to-lime-500', 'via-teal-600',
    'hover:text-emerald-600', 'hover:text-emerald-700', 'hover:bg-emerald-50', 'hover:bg-emerald-700', 'hover:bg-emerald-900/50',
    'hover:border-emerald-300', 'hover:bg-teal-700',
    
    // Blue theme
    'bg-blue-50', 'bg-blue-100', 'bg-blue-600', 'bg-blue-700', 'bg-blue-900/30', 'bg-blue-900/50',
    'bg-cyan-50', 'bg-cyan-100', 'bg-cyan-600', 'bg-cyan-700',
    'bg-sky-50', 'bg-sky-100', 'bg-sky-500', 'bg-sky-600',
    'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900', 'text-blue-200',
    'text-cyan-600', 'text-cyan-700', 'text-cyan-900', 'text-cyan-200',
    'text-sky-600',
    'border-blue-100', 'border-blue-300', 'border-blue-400', 'border-blue-500', 'border-blue-600',
    'border-cyan-100', 'border-cyan-300', 'border-cyan-600',
    'border-sky-100', 'border-sky-300', 'border-sky-600',
    'from-blue-600', 'to-cyan-600', 'to-sky-500', 'via-cyan-600',
    'hover:text-blue-600', 'hover:text-blue-700', 'hover:bg-blue-50', 'hover:bg-blue-700', 'hover:bg-blue-900/50',
    'hover:border-blue-300', 'hover:bg-cyan-700',
    
    // Red theme
    'bg-rose-50', 'bg-rose-100', 'bg-rose-600', 'bg-rose-700', 'bg-rose-900/30', 'bg-rose-900/50',
    'bg-red-50', 'bg-red-100', 'bg-red-600', 'bg-red-700',
    'bg-amber-50', 'bg-amber-100', 'bg-amber-500', 'bg-amber-600',
    'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900', 'text-rose-200',
    'text-red-600', 'text-red-700', 'text-red-900', 'text-red-200',
    'text-amber-600',
    'border-rose-100', 'border-rose-300', 'border-rose-400', 'border-rose-500', 'border-rose-600',
    'border-red-100', 'border-red-300', 'border-red-600',
    'border-amber-100', 'border-amber-300', 'border-amber-600',
    'from-rose-600', 'to-red-600', 'to-amber-500', 'via-red-600',
    'hover:text-rose-600', 'hover:text-rose-700', 'hover:bg-rose-50', 'hover:bg-rose-700', 'hover:bg-rose-900/50',
    'hover:border-rose-300', 'hover:bg-red-700',
    
    // Gradient classes
    'bg-gradient-to-b', 'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-linear-to-r', 'bg-linear-to-b', 'bg-linear-to-br',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
