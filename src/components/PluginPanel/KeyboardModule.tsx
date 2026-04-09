import { useCallback, useRef, useState, useEffect } from 'react'
import { Piano, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'
import '../../styles/piano-overrides.css'
import { useSynth } from '../../hooks/useSynth'

const NOTE_RANGE = {
  first: MidiNumbers.fromNote('c2'),
  last:  MidiNumbers.fromNote('b3'),
}

const C_NOTES = ['c2', 'c3'].map((n) => MidiNumbers.fromNote(n))

function renderNoteLabel({ midiNumber }: { midiNumber: number; isActive: boolean; isAccidental: boolean }) {
  if (!C_NOTES.includes(midiNumber)) return null
  const attrs = MidiNumbers.getAttributes(midiNumber)
  return (
    <div style={{
      fontSize: 8,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: 'rgba(63,63,63,0.4)',
      pointerEvents: 'none',
    }}>
      {attrs.pitchName}{attrs.octave}
    </div>
  )
}

export default function KeyboardModule() {
  const { state, dispatch } = useSynth()
  const containerRef = useRef<HTMLDivElement>(null)
  const [pianoWidth, setPianoWidth] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // measure after layout
    const measure = () => setPianoWidth(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const playNote = useCallback((midiNumber: number) => {
    dispatch({ type: 'SET_ACTIVE_NOTES', notes: [...state.activeNotes, midiNumber] })
  }, [state.activeNotes, dispatch])

  const stopNote = useCallback((midiNumber: number) => {
    dispatch({ type: 'SET_ACTIVE_NOTES', notes: state.activeNotes.filter((n) => n !== midiNumber) })
  }, [state.activeNotes, dispatch])

  // keyWidthToHeight: wider ratio = shorter keys
  // At 810px / 14 white keys = 57.8px per key → for 72px height: 57.8/72 ≈ 0.80
  const keyWidthToHeight = 0.80

  return (
    <div className="bg-plug-surface dark:bg-white/5 rounded-lg shrink-0 w-full px-3 py-3 overflow-hidden">
      <div ref={containerRef} className="w-full">
        {pianoWidth > 0 && (
          <Piano
            noteRange={NOTE_RANGE}
            playNote={playNote}
            stopNote={stopNote}
            activeNotes={state.activeNotes}
            renderNoteLabel={renderNoteLabel}
            width={pianoWidth}
            keyWidthToHeight={keyWidthToHeight}
          />
        )}
      </div>
    </div>
  )
}
