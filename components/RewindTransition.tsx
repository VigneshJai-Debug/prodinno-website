'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RewindTransitionProps {
  trigger: boolean
  onTransitionPeak?: () => void // Called when the screen should swap (peak of the rewind)
  duration?: number
  persistedFilter?: boolean // Keeps the nostalgic tint on after animation
  children: React.ReactNode
}

/**
 * RewindTransition
 * A high-performance, cinematic "rewind + glitch" transition component.
 */
export default function RewindTransition({
  trigger,
  onTransitionPeak,
  duration = 400,
  persistedFilter = false,
  children
}: RewindTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    if (trigger) {
      startTransition()
    }
  }, [trigger])

  useEffect(() => {
    if (isAnimating) {
      document.body.classList.add('rewind-global-active')
      return () => {
        document.body.classList.remove('rewind-global-active')
      }
    }
  }, [isAnimating])

  const startTransition = async () => {
    setIsAnimating(true)

    // Wait for the peak of the rewind (chaotic mid-phase)
    const peakTime = duration * 0.5

    setTimeout(() => {
      onTransitionPeak?.()
      setShowFlash(true)

      // Remove flash quickly
      setTimeout(() => setShowFlash(false), 100)
    }, peakTime)

    // Complete duration
    setTimeout(() => {
      setIsAnimating(false)
    }, duration)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ── Main Content ── */}
      <div className={cn(isAnimating && "rewind-active")}>
        {children}
      </div>

      {/* ── Cinematic Overlays (Only visible during animation or persisted state) ── */}
      <AnimatePresence>
        {(isAnimating || persistedFilter) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("nostalgic-tint", isAnimating && "nostalgic-flicker")} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAnimating && (
          <>
            {/* 1. Film Grain & Static Noise */}
            <div className="film-grain pointer-events-none fixed inset-0 z-[10000]" />

            {/* 2. VHS / Rewind Scanning Bars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rewind-bar z-[10001] pointer-events-none"
            />

            <div className="scanlines z-[10002] pointer-events-none" />

            {/* 3. Horizontal Glitch Streaks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0, 1, 0] }}
              className="absolute inset-0 z-[10003] pointer-events-none mix-blend-screen overflow-hidden"
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-[1px] bg-white opacity-40"
                  style={{
                    top: `${Math.random() * 100}%`,
                    animation: `glitch-anim ${0.1 + Math.random() * 0.2}s infinite`
                  }}
                />
              ))}
            </motion.div>

            {/* 4. Film Burn Peak Flash */}
            {showFlash && (
              <div className="fixed inset-0 z-[10004] bg-white film-burn-flash pointer-events-none" />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
