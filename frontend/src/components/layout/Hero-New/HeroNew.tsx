import { useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

import UnionIcon from "../../../assets/icons/Unionblack.svg";
import BirdIcon from "../../../assets/arcticons_whobird.png";
import CameraIcon from "../../../assets/streamline-freehand_camera-double.png";
import BackpackIcon from "../../../assets/bi_backpack2.png";
import BinocularIcon from "../../../assets/streamline-freehand-color_view-binocular.png";
import SunIcon from "../../../assets/meteor-icons_sun.png";

import CuratedIcon from "../../../assets/icons/curated.svg";
import QuickIcon from "../../../assets/icons/quiz.svg";
import GuideIcon from "../../../assets/icons/guide.svg";
import OperatorIcon from "../../../assets/icons/operator.svg";

const navItems = [
  { label: "How it works", to: "how" },
  { label: "Why Wandar", to: "features" },
  { label: "FAQs", to: "faqs" },
  { label: "Contact us", to: "contact" },
];

const howCards = [
  {
    id: 1,
    title: "Curated Tours",
    icon: CuratedIcon,
    desc: "Skip the overwhelm. Get a trusted shortlist of safaris to choose with confidence.",
  },
  {
    id: 2,
    title: "Quick Quiz",
    icon: QuickIcon,
    desc: "Answer a few questions. Get safari matches tailored to your style.",
  },
  {
    id: 3,
    title: "Prep Guide",
    icon: GuideIcon,
    desc: "From packing lists to travel tips, a clear guide to plan with ease.",
  },
  {
    id: 4,
    title: "Operator Booking",
    icon: OperatorIcon,
    desc: "No middlemen. Book directly with operators for full transparency.",
  },
];

const LandingTop = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-[#77BEBE4D] to-[#fdf6f0] overflow-hidden">
      {/* ===== Navbar ===== */}
      <nav className="w-full bg-gradient-to-r from-white/90 via-[#77BEBE4D] to-white/90 shadow-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={UnionIcon} alt="Wandar Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-gray-900">Wandar</span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  smooth
                  duration={600}
                  offset={-80}
                  className="cursor-pointer hover:text-[#F4A261]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA (Desktop only) */}
          <div className="hidden md:block">
            {/* <button className="bg-[#F4A261] text-[#2E2E2E] px-4 py-2 rounded-md font-semibold hover:opacity-90">
              Join Beta
            </button> */}
               <Link
                      to="contact"
                      smooth={true}
                      duration={600}
                      offset={-80}
                      spy={true}
                      onSetActive={() => {
                        setTimeout(() => {
                          const input = document.getElementById('email-input') as HTMLInputElement | null;
                          input?.focus();
                        }, 100);
                      }}
                      className="cursor-pointer"
                    >
                      <button className="bg-[#F4A261] text-[#2E2E2E] font-semibold py-3 px-6 rounded-md hover:opacity-90 flex items-center gap-2 mx-auto transition duration-200">
                        Join Beta
                      </button>
                    </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div
            className="md:hidden absolute top-16 left-0 w-full shadow-lg backdrop-blur-sm"
            style={{ background: "#77BEBE4D" }}
          >
            <ul className="flex flex-col items-center gap-6 py-6 text-gray-900 font-medium">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    smooth
                    duration={600}
                    offset={-80}
                    className="cursor-pointer text-lg hover:text-[#F4A261] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                {/* <button
                  className="bg-[#F4A261] text-[#2E2E2E] px-6 py-2 rounded-md font-semibold hover:bg-[#e68b2f] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Join Beta */}

                     <Link
                            to="contact"
                            smooth={true}
                            duration={600}
                            offset={-80}
                            spy={true}
                            onSetActive={() => {
                              setTimeout(() => {
                                const input = document.getElementById('email-input') as HTMLInputElement | null;
                                input?.focus();
                              }, 100);
                            }}
                            className="cursor-pointer"
                          >
                            <button className="bg-[#F4A261] text-[#2E2E2E] font-semibold py-3 px-6 rounded-md hover:opacity-90 flex items-center gap-2 mx-auto transition duration-200">
                              Join Beta
                            </button>
                          </Link>
                {/* </button> */}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ===== Hero Section ===== */}
      <div className="relative text-center flex flex-col justify-center items-center px-6 pt-32 pb-20">
        {/* Decorative Icons */}
        <img src={BirdIcon} className="absolute top-24 left-10 w-12 opacity-70" alt="bird" />
        <img src={CameraIcon} className="absolute bottom-44 left-16 w-14 opacity-70" alt="camera" />
        <img src={BackpackIcon} className="absolute top-40 right-20 w-14 opacity-70" alt="backpack" />
        <img src={BinocularIcon} className="absolute bottom-28 right-24 w-12 opacity-70" alt="binocular" />
        <img src={SunIcon} className="absolute top-10 right-1/2 w-14 opacity-70" alt="sun" />

        {/* Hero Content */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Find The <span className="text-[#F4A261]">Safari</span> That Fits <br />
          <span className="text-[#F4A261]">Without The Stress</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-xl">
          Most Safari Sites Give You Options. Wandar Helps You Choose.
        </p>
        {/* <button className="mt-6 bg-[#F4A261] text-[#2E2E2E] font-semibold px-6 py-3 rounded-md hover:opacity-90">
          Join Our Beta →
        </button> */}
           <Link
                  to="contact"
                  smooth={true}
                  duration={600}
                  offset={-80}
                  spy={true}
                  onSetActive={() => {
                    setTimeout(() => {
                      const input = document.getElementById('email-input') as HTMLInputElement | null;
                      input?.focus();
                    }, 100);
                  }}
                  className="cursor-pointer py-3"
                >
                  <button className="bg-[#F4A261] text-[#2E2E2E] font-semibold py-2 px-6 rounded-md hover:opacity-90 flex items-center gap-2 mx-auto transition duration-200">
                    Join Our Beta → 
                  </button>
                </Link>
      </div>

      {/* ===== How It Works Section ===== */}
      <div
        id="how"
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-20"
      >
        {howCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md p-6 border border-[#F4E4D0] flex flex-col items-center text-center"
          >
            <img src={card.icon} alt="Icon" className="w-10 h-10 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2 text-[#2E2E2E]">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingTop;
