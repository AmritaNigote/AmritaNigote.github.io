import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaInstagram } from "react-icons/fa6";
import "./index.css";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#certification", label: "Certification" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

function MobileMenu({ open, setOpen }) {
  return (
    <div className={`md:hidden ${open ? "" : "hidden"} bg-white border-t`} id="mobile-menu">
      <div className="px-4 py-2 space-y-2">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block py-2 text-gray-600 hover:text-purple-600"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  // Smooth scroll for nav links
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        const [submitted, setSubmitted] = useState(false);

        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };

        const handleSubmit = (e) => {
          e.preventDefault();
          // Submit to Google Forms
          const formDataObj = new FormData();
          formDataObj.append('entry.2005620554', formData.name);
          formDataObj.append('entry.1045781291', formData.email);
          formDataObj.append('entry.1166974658', formData.phone);
          formDataObj.append('entry.839337160', formData.message);

          fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScW-Ewst-5NPvWpji92xYNmWk8Gcl90w8mssypBZ-fus4yRvg/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formDataObj,
          }).then(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
          });
        };

  // Nav shadow on scroll
  React.useEffect(() => {
    const nav = document.querySelector("nav");
    const onScroll = () => {
      if (window.scrollY > 100) nav?.classList.add("shadow-lg");
      else nav?.classList.remove("shadow-lg");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-gray-50 font-inter">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-800">🧘‍♀️ YogicAmrita</div>
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              id="mobile-menu-btn"
              className="md:hidden text-gray-600"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
      </nav>

      {/* Hero Section */}
      <section id="home" className="gradient-bg min-h-screen flex items-center justify-center text-white pt-16">
        <div className="max-w-4xl mx-auto px-4 text-center fade-in">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={require("./profile.jpg")}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Inner Peace</h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">Certified Yoga Instructor • 200hr YTT Graduate</p>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-purple-100">Welcome to a journey of mindfulness, strength, and spiritual growth. Let's explore the transformative power of yoga together.</p>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">My Yoga Journey</h3>
              <p className="text-gray-600 leading-relaxed">My path to yoga began as a personal quest for balance and inner peace. What started as a way to manage stress quickly transformed into a deep passion for the ancient practice and its profound healing benefits.</p>
              <p className="text-gray-600 leading-relaxed">Through dedicated practice and study, I've discovered that yoga is not just about physical postures—it's a complete system for living with awareness, compassion, and authenticity.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Hatha Yoga</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Vinyasa Flow</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Meditation</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Breathwork</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🕉️</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Philosophy</h4>
                <p className="text-gray-600 italic">"Yoga is not about touching your toes. It's about what you learn on the way down."</p>
                <p className="text-gray-600 mt-4">I believe in creating a safe, inclusive space where every student can explore their unique practice without judgment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section id="certification" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Certification & Training</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-white">🏆</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">200-Hour Yoga Teacher Training</h3>
                  <p className="text-purple-600 font-semibold text-lg mb-3">Bodhi School of Yoga</p>
                  <p className="text-gray-600 mb-4">Completed comprehensive training covering asana practice, anatomy, philosophy, meditation, and teaching methodology. This intensive program provided deep understanding of yoga's physical, mental, and spiritual aspects.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-purple-800">Asana Practice</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-purple-800">Anatomy</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-purple-800">Philosophy</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-purple-800">Teaching Methods</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Services</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl card-hover">
              <div className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Group Classes</h3>
                <p className="text-gray-600 mb-6">Join our welcoming community classes suitable for all levels. Experience the energy of practicing together.</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Beginner-friendly environment</li>
                  <li>• Various styles offered</li>
                  <li>• Small class sizes</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl card-hover">
              <div className="text-center">
                <div className="text-4xl mb-4">🧘‍♀️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Private Sessions</h3>
                <p className="text-gray-600 mb-6">Personalized one-on-one instruction tailored to your specific needs and goals.</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Customized practice</li>
                  <li>• Individual attention</li>
                  <li>• Flexible scheduling</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl card-hover">
              <div className="text-center">
                <div className="text-4xl mb-4">🌅</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Workshops</h3>
                <p className="text-gray-600 mb-6">Deep-dive sessions focusing on specific aspects of yoga practice and philosophy.</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Meditation techniques</li>
                  <li>• Breathwork practices</li>
                  <li>• Yoga philosophy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl mb-12 text-purple-100">Ready to begin or deepen your yoga practice? I'd love to guide you on this transformative journey.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:hello@yogicamrita.com" className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4 flex justify-center"><FaEnvelope /></div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-purple-100">hello@yogicamrita.com</p>
            </a>
            <a href="tel:+919686023035" className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4 flex justify-center"><FaPhone /></div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-purple-100">9686 023 035</p>
            </a>
            <a href="https://www.instagram.com/yogicamrita/" target="_blank" rel="noopener noreferrer" className="bg-white bg-opacity-10 p-6 rounded-xl hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4 flex justify-center"><FaInstagram /></div>
              <h3 className="text-lg font-semibold mb-2">Instagram</h3>
              <p className="text-purple-100">@yogicamrita</p>
            </a>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button type="submit" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">Send Message</button>
            </form>
            <div className={`mt-4 p-4 bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 rounded-lg ${submitted ? "" : "hidden"}`}>
              <p className="text-green-100">✨ Thank you for your message! I'll get back to you soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">🧘‍♀️ YogicAmrita</div>
          <p className="text-gray-400 mb-4">Certified Yoga Instructor • 200hr YTT Graduate from Bodhi School of Yoga</p>
          <p className="text-gray-500 text-sm">© 2025 YogicAmrita. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
