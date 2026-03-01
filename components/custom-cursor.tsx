"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const out =
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      if (out) setIsVisible(false)
    }

    const handleMouseEnter = () => setIsVisible(true)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    const interactiveElements = document.querySelectorAll("a, button, [data-hover]")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart)
      el.addEventListener("mouseleave", handleHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart)
        el.removeEventListener("mouseleave", handleHoverEnd)
      })
    }
  }, [])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: isHovering ? 2 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        x: { type: "tween", duration: 0.06 },
        y: { type: "tween", duration: 0.06 },
        scale: { type: "spring", stiffness: 800, damping: 35, mass: 0.2 },
        opacity: { duration: 0.15 },
      }}
    />
  )
}
