declare module 'react-piano' {
  import type { ReactNode } from 'react'

  export interface NoteRange {
    first: number
    last: number
  }

  export interface NoteLabelProps {
    midiNumber: number
    isActive: boolean
    isAccidental: boolean
  }

  export interface PianoProps {
    noteRange: NoteRange
    playNote: (midiNumber: number) => void
    stopNote: (midiNumber: number) => void
    activeNotes?: number[]
    width?: number
    keyWidthToHeight?: number
    renderNoteLabel?: (props: NoteLabelProps) => ReactNode
    className?: string
    disabled?: boolean
    keyboardShortcuts?: Array<{ key: string; midiNumber: number }>
  }

  export const Piano: React.FC<PianoProps>

  export const MidiNumbers: {
    fromNote: (note: string) => number
    getAttributes: (midiNumber: number) => {
      note: string
      octave: number
      midiNumber: number
      isAccidental: boolean
      pitchName: string
    }
    NATURAL_MIDI_NUMBERS: number[]
  }

  export const KeyboardShortcuts: {
    create: (options: { firstNote: number; lastNote: number; keyboardConfig: unknown[] }) => Array<{ key: string; midiNumber: number }>
    HOME_ROW: unknown[]
  }
}
