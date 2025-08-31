import React, { useEffect, useState } from "react";
import registrationCover from "./registrationCover.jpg";
import { useParams, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slotsAvailable, setSlotsAvailable] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRvU60bZTBesKWLfuWl86PJRT9PhTwn7vjhoJbBEKhT1-k-Y9MynV1AOVme7xGr96HKxoGpIGqlQKMe/pub?gid=0&single=true&output=csv");
      const text = await res.text();
      const lines = text.split("\n").filter(Boolean);
      if (lines.length < 2) return setLoading(false);
      const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
      const rows = lines.slice(1).map(line => {
        const cols = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            cols.push(current);
            current = "";
          } else {
            current += char;
          }
        }
        cols.push(current);
        const obj = {};
        headers.forEach((h, i) => obj[h] = (cols[i] || "").replace(/"/g, "").trim());
        return obj;
      });
      const found = rows.find(ev => ev["Event Id"] === eventId);
      setEvent(found);
      setLoading(false);
      if (found) {
        const available = parseInt(found["Slots"] || "0", 10) - parseInt(found["Registered"] || "0", 10);
        setSlotsAvailable(available > 0);
      }
    }
    fetchEvent();
  }, [eventId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Wire up Google Form submission
    setSubmitted(true);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl animate-pulse">Loading...</div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Event not found.</div>;

  const availableSlots = parseInt(event["Slots"] || "0", 10) - parseInt(event["Registered"] || "0", 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 px-0 pb-12 flex flex-col items-center">
      {/* Yoga Cover Image */}
      <div className="w-full h-64 md:h-80 bg-purple-200 flex items-center justify-center relative mb-8">
    <img src={registrationCover} alt="Yoga Registration Cover" className="object-cover w-full h-full opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">{event["Event Title"]}</h1>
          <p className="text-lg md:text-xl text-purple-100 font-medium drop-shadow mb-2">{event["Description"]}</p>
          {event["Type"] === "Virtual" && (
            <p className="text-base md:text-lg text-blue-100 font-semibold drop-shadow mt-2">
              {parseFloat(event["Price"] || "0") > 0
                ? "Event link will be shared after payment."
                : "Event link will be shared separately."}
            </p>
          )}
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto px-4">
        {/* Innovative Event Info Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white bg-opacity-80 rounded-xl p-6 shadow flex flex-col gap-2">
            {event["Level"] && (
              <div className="flex items-center gap-2 text-base font-semibold text-purple-600 mb-1">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">Lv</text></svg>
                <span>Level: {event["Level"]}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-base text-gray-700 font-semibold">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{(() => {
                const dateStr = event["Date"];
                if (!dateStr) return "";
                const d = new Date(dateStr);
                if (isNaN(d.getTime())) return dateStr;
                return d.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              })()}</span>
            </div>
            <div className="flex items-center gap-2 text-base text-gray-700 font-medium">
              {event["Type"] === "Virtual" ? (
                <>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 19h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span>{event["Location Address"] || event["Location"]}</span>
                  <span className="block text-xs text-blue-600 mt-1">
                    {parseFloat(event["Price"] || "0") > 0
                      ? "Event link will be shared after payment."
                      : "Event link will be shared separately."}
                  </span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0-4.314-6-10-6-10z" /><circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  <span>{event["Location Address"] || event["Location"]}</span>
                  {event["Location Link"] && (
                    <a
                      href={event["Location Link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0-4.314-6-10-6-10z" /><circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                      Navigate
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="bg-white bg-opacity-80 rounded-xl p-6 shadow flex flex-col gap-2 justify-center">
            <div className="flex items-center gap-2 text-lg font-bold text-yellow-700">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">₹</text></svg>
              <span>{parseFloat(event["Price"] || "0") === 0 ? "Free" : `₹${event["Price"]}`}</span>
            </div>
            <div className="flex items-center gap-2 text-base text-indigo-700 font-semibold">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" /></svg>
              <span>Available Slots: {availableSlots}</span>
            </div>
            {parseFloat(event["Price"] || "0") > 0 && (
              <div className="mt-2 text-sm text-red-600 font-medium bg-red-50 rounded px-3 py-2">
                You will be contacted separately for payment.
              </div>
            )}
          </div>
        </div>
        {slotsAvailable ? (
          <form className="w-full max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="eventId" value={eventId} />
            <div className="flex flex-col gap-4">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200" />
              <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200" />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Register
            </button>
          </form>
        ) : (
          <div className="w-full max-w-2xl mx-auto text-center text-red-600 text-lg font-bold py-8">Slots Full</div>
        )}
        {submitted && (
          <div className="w-full max-w-2xl mx-auto bg-green-100 rounded-xl shadow p-8 text-center mt-8 animate-fade-in">
            <div className="text-green-700 text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Registration Successful!
            </div>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-200" onClick={() => navigate("/")}>Go to Home Page</button>
          </div>
        )}
        <button className="mt-8 text-purple-600 hover:underline font-medium" onClick={() => navigate("/")}>← Back to Events</button>
      </div>
    </div>
  );
}
