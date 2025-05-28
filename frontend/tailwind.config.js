/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF6F0',
          100: '#FDE9DB',
          200: '#FBD3B7',
          300: '#F9BD93',
          400: '#F7A76F',
          500: '#F4A261',
          600: '#F28D3D',
          700: '#E67A29',
          800: '#C66622',
          900: '#A5521B',
          950: '#833E14',
        },
        // Complementary colors that work well with the primary color
        secondary: {
          50: '#F0F7FE',
          100: '#DBEEFD',
          200: '#B7DDFB',
          300: '#93CCF9',
          400: '#6FBBF7',
          500: '#4BAAF5',
          600: '#2799F3',
          700: '#0388F1',
          800: '#0277D4',
          900: '#0266B7',
          950: '#01559A',
        },
        // Neutral colors
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
    },
  },
  plugins: [],
};
