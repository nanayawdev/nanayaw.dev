"use client"

import React from 'react'
import PropTypes from 'prop-types'
import { motion } from "framer-motion"

export default function ScrollingBanner({
  items = ["UI/UX DESIGN", "DEVELOPMENT", "ICON DESIGN", "LOGO BRANDING"],
  speed = 30,
  bgColor = "#000000", // Neon green color
  textColor = "#ffffff",
  className = "",
}) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <div 
      className={`relative w-full h-16 overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="absolute whitespace-nowrap flex items-center h-full"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <span
            key={idx}
            className="text-2xl font-bold mx-4 uppercase"
            style={{ color: textColor }}
          >
            {item} ·
          </span>
        ))}
      </motion.div>
    </div>
  )
}

ScrollingBanner.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  speed: PropTypes.number,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
}

