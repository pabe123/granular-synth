import { Knob } from '@cutoff/audio-ui-react'
import type { AudioControlEvent, SizeType } from '@cutoff/audio-ui-react'
import '@cutoff/audio-ui-react/style.css'

interface KnobControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: SizeType
}

export default function KnobControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  size = 'small',
}: KnobControlProps) {
  const handleChange = (event: AudioControlEvent<number>) => {
    onChange(event.value)
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <Knob
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        size={size}
        variant="plainCap"
        label={label}
        valueAsLabel="interactive"
      />
    </div>
  )
}
