# GS-01 Granular Synth — Design Documentation

## Overview

GS-01 is a visual-only granular synthesizer plugin UI built in React. The interface is split into two panels: a configuration sidebar and a plugin panel. The design language is minimal, monochromatic, and instrument-focused.

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  GS-01 CONFIG (sidebar 220px)  │  Plugin Panel (820px)      │
│                                │                            │
│  Sonic Vibes                   │  ┌──────────┬──────────┐  │
│  Source Samples                │  │  Sound   │  Source  │  │
│  Effects                       │  │  Viz     │  Samples │  │
│  Dark Mode                     │  │          ├──────────┤  │
│                                │  │          │ Granular │  │
│                                │  │          │  Engine  │  │
│                                │  │          ├──────────┤  │
│                                │  │          │  Sonic   │  │
│                                │  │          │  Vibes   │  │
│                                │  ├──────────┴──────────┤  │
│                                │  │    Effects Strip     │  │
│                                │  ├──────────────────────┤  │
│                                │  │   MIDI Keyboard      │  │
└─────────────────────────────────────────────────────────────┘
```

**Total dimensions:** 1100 × 760px  
**Sidebar:** 220 × 680px, offset 24px from edges  
**Plugin panel:** 820 × 680px, offset 256px from left

---

## Color Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `plug-bg` | `#edecea` | `#111111` | App background |
| `plug-panel` | `#ffffff` | `#1c1c1c` | Panel / card surface |
| `plug-surface` | `#efefef` | `rgba(255,255,255,0.05)` | Secondary surfaces |
| `plug-text` | `#3f3f3f` | `#ffffff` | Primary text, active elements |
| `plug-label` | `#9b9b9b` | `rgba(255,255,255,0.30)` | Labels, secondary text |
| `plug-border` | `rgba(79,71,61,0.12)` | `rgba(255,255,255,0.07)` | Dividers, card borders |
| `plug-muted` | `rgba(63,63,63,0.12)` | `rgba(255,255,255,0.08)` | Subtle backgrounds |

---

## Typography

| Role | Font | Size | Weight | Case |
|------|------|------|--------|------|
| Section label | Inter | 9px | Semi Bold | UPPERCASE |
| Chip / tag | Inter | 8px | Semi Bold | Title case |
| Knob label | Inter | 7–8px | Semi Bold | UPPERCASE |
| Note label | Inter | 8px | Semi Bold | UPPERCASE |
| Body / misc | Inter | 9px | Regular | — |
| Mono labels | DM Mono | 7–9px | Medium | uppercase |

---

## Spacing & Radius

| Property | Value |
|----------|-------|
| Panel border radius | 12px |
| Card / module radius | 8px |
| Chip / tag radius | 6px |
| Gap between panels | 8px (gap-2) |
| Padding inside panels | 8px (p-2) |
| Module internal padding | 12px (px-3 py-3) |
| Chip internal padding | 8px horizontal, 5px vertical |

---

## Components

### Config Sidebar

The sidebar holds all configuration controls. It is always visible and drives the plugin panel state via React Context.

#### Sonic Vibes
- **Options:** Dark, Bright, Warm
- **Selection:** 1–3 simultaneous (min 1)
- **Style:** Chip/tag — active: `plug-text` bg + white text, inactive: `plug-surface` bg
- **Spacing:** Horizontal row, `gap-1.5`

#### Source Samples
- **Options:** Piano, Strings, Woodwinds, Choir, Organ
- **Selection:** Exactly 3 of 5 (min 1 for swapping)
- **Style:** Same chip style as Sonic Vibes
- **Counter:** Shows `n/3` — turns amber when not at 3

#### Effects
- **Options:** Reverb, Delay, Distortion, Chorus, Phaser, Flanger, Compressor, EQ, Filter, Bitcrush, Tremolo, Saturation (12 total)
- **Selection:** Any combination, toggleable
- **Style:** Same chip style, wrap layout

#### Dark Mode Toggle
- Toggle at the bottom of the sidebar
- Syncs `dark` class to `<html>` element

---

### Plugin Panel

#### Header
- Plugin name: `GRANULAR-SYNTH` (Inter, 9px, Semi Bold)
- Active vibes displayed top-right
- Thin bottom border separator

#### Sound Visualisation
- Background: `#3a3a3a` (dark charcoal)
- Contains: SVG waveform (white, 12% opacity), 36 animated grain particles, scanline overlay (4% opacity)
- Grain animation: `grain-float` + `grain-pulse` CSS keyframes
- Label: `SOUND VISUALISATION` centered bottom, 20% white opacity
- Flex: `flex-1` — fills available horizontal space

#### Right Panel (260px wide)

Three stacked sections:

**Source Samples Pads**
- Shows exactly 3 active samples as large pressable pads
- Icons: Lucide React (`Piano`, `Guitar`, `Wind`, `Mic`, `Music`), `strokeWidth={1.5}`, `size={20}`
- Active style: `plug-text` bg + white text/icon
- Click behavior: cycles to next available sample (SWAP_SAMPLE action, preserves 3-pad count)

**Granular Engine**
- 4 knobs: SIZE, DENS, POS, PITCH
- Uses `@cutoff/audio-ui-react` Knob component
- Variant: `plainCap`, size: `small`, `valueAsLabel="interactive"`

**Sonic Vibes Pads**
- 3 pads: Dark, Bright, Warm (always all 3 visible)
- Icons: Lucide React (`Moon`, `Sun`, `Flame`), `strokeWidth={1.5}`, `size={20}`
- Active: `plug-text` bg + white, inactive: white bg + 30% opacity text/icon
- Min 1 active (cannot deselect last)

#### Effects Strip
- Renders active effects only
- Layout: `flex-wrap`, max 6 per row (each `w-1/6`)
- Each module: effect name + 2 knobs (Amt, W/D) at `xsmall` size
- Strip grows with more effects → middle row shrinks proportionally
- Max 2 rows (12 effects = 2 × 6)
- Borders: `border-r border-b` with `-mr-px -mb-px` clip trick

#### MIDI Keyboard
- Library: `react-piano`
- Range: C2–B3 (2 octaves, 14 white keys)
- Dynamic width via `ResizeObserver`
- `keyWidthToHeight={0.80}` for ~72px key height
- Custom color overrides in `piano-overrides.css`
- Active key color: `#d0d0d0` (light gray, not black)

---

## State Management

Single `useReducer` in `SynthContext` with the following state shape:

```typescript
interface SynthState {
  sonicVibes: VibeType[]        // 1–3 of ['Dark','Bright','Warm']
  sourceSamples: SampleName[]   // exactly 3 of 5
  activeEffects: EffectName[]   // 0–12
  granularParams: {
    size: number   // 0–100
    dens: number   // 0–100
    pos: number    // 0–100
    pitch: number  // 0–100
  }
  effectParams: Record<EffectName, { amount: number; wetDry: number }>
  darkMode: boolean
  activeNotes: number[]
}
```

**Key actions:**
- `TOGGLE_VIBE` — add/remove vibe (min 1)
- `TOGGLE_SAMPLE` — add/remove sample (max 3, min 1)
- `SWAP_SAMPLE` — atomic replace (preserves 3-pad display in plugin panel)
- `TOGGLE_EFFECT` — add/remove effect
- `SET_GRANULAR_PARAM` — update knob value
- `SET_EFFECT_PARAM` — update effect knob value
- `TOGGLE_DARK_MODE` — toggle + sync to `<html>` class

---

## Key Libraries

| Library | Purpose |
|---------|---------|
| `@cutoff/audio-ui-react` | Knob components |
| `react-piano` | MIDI keyboard |
| `lucide-react` | Icons (source sample pads + sonic vibe pads) |
| Tailwind CSS v3 | Styling (custom color tokens, `darkMode: 'class'`) |
| React 18 + Vite 5 | Framework + build tool |

---

## Dark Mode

Implemented via Tailwind's `class` strategy — toggling `dark` on `<html>`. Every color token has a dark variant defined in Tailwind config or inline. The Sound Visualisation uses `#111` in dark mode instead of `#3a3a3a`.

---

## File Structure

```
src/
├── components/
│   ├── ConfigSidebar/
│   │   ├── index.tsx
│   │   ├── SonicVibesSelector.tsx
│   │   ├── SourceSampleSelector.tsx
│   │   └── EffectsToggleList.tsx
│   ├── PluginPanel/
│   │   ├── index.tsx
│   │   ├── PluginHeader.tsx
│   │   ├── SoundVisualisation.tsx
│   │   ├── KeyboardModule.tsx
│   │   ├── EffectsStrip/
│   │   │   ├── index.tsx
│   │   │   └── EffectModule.tsx
│   │   └── RightPanel/
│   │       ├── index.tsx
│   │       ├── SourceSamplesModule.tsx
│   │       ├── GranularEngineModule.tsx
│   │       └── SonicVibesModule.tsx
│   └── shared/
│       └── KnobControl.tsx
├── context/
│   └── SynthContext.tsx
├── hooks/
│   └── useSynth.ts
├── styles/
│   └── piano-overrides.css
├── types/
│   ├── synth.ts
│   └── react-piano.d.ts
└── index.css
```

---

## Figma Reference

Design file: [GS-01 Granular Synth](https://www.figma.com/design/8qAU6ElhKmN9ssY6dSrpYI/GS-01-Granular-Synth)  
Light Mode frame: node `1:2`
