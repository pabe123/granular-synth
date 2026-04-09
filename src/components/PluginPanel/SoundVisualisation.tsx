import { useRef, useEffect } from 'react'
import { useSynth } from '../../hooks/useSynth'

interface Grain {
  x: number
  y: number
  size: number
  floatDelay: number
  floatDuration: number
  pulseDelay: number
  pulseDuration: number
}

function generateGrains(count: number): Grain[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 96 + 2,
    y: Math.random() * 90 + 5,
    size: Math.random() * 3 + 1.5,
    floatDelay: Math.random() * 5,
    floatDuration: Math.random() * 4 + 3,
    pulseDelay: Math.random() * 3,
    pulseDuration: Math.random() * 2 + 1.5,
  }))
}

export default function SoundVisualisation() {
  const { state } = useSynth()
  const grainsRef = useRef<Grain[]>(generateGrains(36))

  const grainKey = state.sourceSamples.join('-')
  useEffect(() => {
    grainsRef.current = generateGrains(36)
  }, [grainKey])

  return (
    <div className="relative bg-[#3a3a3a] dark:bg-[#111] rounded-lg overflow-hidden flex-1 min-h-0 select-none">

      {/* Subtle scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
        }}
      />

      {/* Waveform */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 570 370"
        preserveAspectRatio="none"
      >
        <path
          d="M0,185 C40,185 50,120 95,120 C140,120 145,240 190,240 C235,240 240,100 285,100 C330,100 335,265 380,265 C425,265 430,145 475,145 C520,145 530,200 570,185"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        {/* Mirror */}
        <path
          d="M0,185 C40,185 50,250 95,250 C140,250 145,130 190,130 C235,130 240,270 285,270 C330,270 335,105 380,105 C425,105 430,225 475,225 C520,225 530,170 570,185"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </svg>

      {/* Grain particles */}
      {grainsRef.current.map((grain, i) => (
        <span
          key={`${grainKey}-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${grain.x}%`,
            top: `${grain.y}%`,
            width: grain.size,
            height: grain.size,
            animation: [
              `grain-float ${grain.floatDuration}s ease-in-out ${grain.floatDelay}s infinite alternate`,
              `grain-pulse ${grain.pulseDuration}s ease-in-out ${grain.pulseDelay}s infinite`,
            ].join(', '),
          }}
        />
      ))}

      {/* Bottom label */}
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-sans text-[8px] text-white/20 whitespace-nowrap tracking-[0.2em] uppercase">
        Sound Visualisation
      </p>
    </div>
  )
}
