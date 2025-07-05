import React, { useEffect, useState } from "react";
import profileImage from "../profile.jpg";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaAddressBook } from "react-icons/fa6";

export default function DigitalBusinessCard() {
  // Detect system theme
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (/bot|crawler|spider|crawling/i.test(navigator.userAgent)) {
      document.body.innerHTML = "";
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-gradient-to-br from-blue-400/80 via-white/70 to-blue-200/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 text-center w-80 ring-1 ring-blue-100/40
        dark:bg-gradient-to-br dark:from-gray-900/90 dark:via-blue-950/80 dark:via-60% dark:to-gray-800/90 dark:backdrop-blur-2xl dark:shadow-blue-950/30 dark:ring-gray-900/60">
        <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/70 dark:border-gray-700/70 shadow" />
        <h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-white drop-shadow">Amrita Nigote</h1>
        <p className="text-gray-900/90 dark:text-gray-200 drop-shadow-sm">
          💻&nbsp;Code | 🏋️‍♀️&nbsp;Gym | 🧘‍♀️&nbsp;Yoga | 🎤&nbsp;Singing | 🥾&nbsp;Treking | 🌍&nbsp;Travelling | 🎶&nbsp;Music Lover
        </p>
        <div className="mt-4 space-y-3">
          <a href="./amrita_nigote.vcf"
            className="flex items-center justify-center w-full bg-green-600 text-white py-2 rounded-xl shadow-md space-x-2">
            <FaAddressBook /> <span>Add Me to Contacts</span>
          </a>
          <a href="https://www.linkedin.com/in/amritanigote" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-blue-700 dark:bg-blue-600 text-white py-2 rounded-xl shadow-md space-x-2">
            <FaLinkedin /> <span>amritanigote</span>
          </a>
          <a href="https://www.instagram.com/amritanigote" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-red-500 dark:from-pink-400 dark:to-red-400 text-white py-2 rounded-xl shadow-md space-x-2">
            <FaInstagram /> <span>amritanigote</span>
          </a>
          <a href="https://wa.me/919686023035" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-green-500 dark:bg-green-400 text-white py-2 rounded-xl shadow-md space-x-2">
            <FaWhatsapp /> <span>WhatsApp</span>
          </a>
          <hr />
          <a href="tel:+91 9686023035" className="flex items-center justify-center w-full text-orange-500 dark:text-orange-400">
            Call Me
          </a>
          <a href="tel:+91 6303338982" className="flex items-center justify-center w-full text-red-500 dark:text-red-400">
            Call My Emergency Contact
          </a>
        </div>
      </div>
    </div>
  );
}
