import React, { useEffect, useState } from "react";
import profileImage from "../profile.jpg";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaX } from "react-icons/fa6";
import SocialCardButton from "./SocialCardButton";

// Dynamically import theme stylesheet
function useThemeStylesheet(theme) {
  React.useEffect(() => {
    let link = document.getElementById('theme-style');
    if (link) link.remove();
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'theme-style';
    link.href = theme === 'dark' ? require('../dark-theme.css') : require('../light-theme.css');
    document.head.appendChild(link);
    return () => { if (link) link.remove(); };
  }, [theme]);
}


function getThemeOverride() {
  const params = new URLSearchParams(window.location.search);
  const override = params.get('theme');
  if (override === 'dark' || override === 'light') return override;
  return null;
}

export default function DigitalBusinessCard() {
  // Detect system theme, allow ?theme=dark or ?theme=light override
  const [theme, setTheme] = useState(() => {
    const override = getThemeOverride();
    if (override) return override;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Listen for query param changes (e.g. navigation)
  useEffect(() => {
    const onPopState = () => {
      const override = getThemeOverride();
      if (override && override !== theme) setTheme(override);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [theme]);


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  useThemeStylesheet(theme);

  useEffect(() => {
    if (/bot|crawler|spider|crawling/i.test(navigator.userAgent)) {
      document.body.innerHTML = "";
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-0">
      <div className="cover-bg" />
      <div className="card card-overlap pt-10 relative flex flex-col items-center">
        <img src={profileImage} alt="Profile" className="card-img absolute left-1/2 -translate-x-1/2 -top-12 w-32 max-w-full rounded-full border-4 border-white shadow-lg" />
        <h1 className="card-title mt-8 text-white">Amrita Nigote</h1>
        <p className="card-desc text-white">
          💻&nbsp;Code | 🏋️‍♀️&nbsp;Gym | 🧘‍♀️&nbsp;Yoga | 🎤&nbsp;Singing | 🥾&nbsp;Treking | 🌍&nbsp;Travelling | 🎶&nbsp;Music Lover
        </p>
        <div className="mt-4 space-y-3 relative">
          <button
            type="button"
            className="save-contact-btn absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-[-1.2rem]"
            onClick={async () => {
              if (navigator.contacts && navigator.contacts.select) {
                try {
                  await navigator.contacts.select([], {multiple: false}); // Just to check API presence
                  // Compose contact details
                  const contact = {
                    name: ["Amrita Nigote"],
                    email: ["amritanigote@example.com"],
                    tel: ["+91 9686023035"],
                    icon: [window.location.origin + "/profile.jpg"]
                  };
                  // Try to save (not all browsers support this)
                  if (navigator.contacts.save) {
                    await navigator.contacts.save(contact);
                  } else {
                    // Fallback: download vCard
                    window.location.href = "./amrita_nigote.vcf";
                  }
                } catch (e) {
                  // Fallback: download vCard
                  window.location.href = "./amrita_nigote.vcf";
                }
              } else {
                // Fallback: download vCard
                window.location.href = "./amrita_nigote.vcf";
              }
            }}
          >
            Save Contact
          </button>
        </div>
      </div>
      {/* Social/contact buttons outside the card */}
      <div className="w-full mt-10 px-4">
        <div className="max-w-[20rem] mx-auto">
          <SocialCardButton
            href="mailto:amritanigote@example.com"
            icon={<FaEnvelope />}
            title="Email"
            description="amritanigote@example.com"
            colorClass="btn-email dark:btn-email"
          />
          <SocialCardButton
            href="tel:+91 9686023035"
            icon={<FaPhone />}
            title="Phone"
            description="+91 9686023035"
            colorClass="btn-phone dark:btn-phone"
          />
          <SocialCardButton
            href="https://www.linkedin.com/in/amritanigote"
            icon={<FaLinkedin />}
            title="LinkedIn"
            description="amritanigote"
            colorClass="btn-linkedin dark:btn-linkedin"
          />
          <SocialCardButton
            href="https://www.instagram.com/amritanigote"
            icon={<FaInstagram />}
            title="Instagram"
            description="amritanigote"
            colorClass="btn-instagram dark:btn-instagram"
          />
          <SocialCardButton
            href="https://wa.me/919686023035"
            icon={<FaWhatsapp />}
            title="WhatsApp"
            description="+91 9686023035"
            colorClass="btn-whatsapp dark:btn-whatsapp"
          />
          <SocialCardButton
            href="tel:+91 6303338982"
            icon={<FaPhone />}
            title="Call My Emergency Contact"
            description=""
            colorClass="text-orange-600 dark:text-orange-400 hover:underline"
            hideArrow
          />
        </div>
      </div>
    </div>
  );
}
