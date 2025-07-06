import React from "react";
import { FaChevronRight } from "react-icons/fa6";

export default function SocialCardButton({ href, icon, title, description, colorClass, hideArrow }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between w-full rounded-xl px-4 py-3 mb-3 transition hover:no-underline focus:no-underline active:no-underline ${colorClass}`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl text-inherit">{icon}</span>
        <div className="flex flex-col text-left">
          <span className="font-semibold text-base text-inherit">{title}</span>
          <span className="text-xs text-inherit/90">{description}</span>
        </div>
      </div>
      {!hideArrow && <FaChevronRight className="text-inherit/80 text-lg" />}
    </a>
  );
}
