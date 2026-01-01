# CLAUDE.md - Development Instructions

## Project: ¡Yo No Fui! Decoder App

### Quick Context
Family board game companion app (Outfoxed-style). Secretly picks culprit, reveals clues, verifies accusations. See PRD.md for full details.

### Key Files
- `yo_no_fui_decoder.jsx` - Main React component
- `PRD.md` - Product requirements and game data

### Commands
```bash
# If using Vite
npm create vite@latest . -- --template react
npm install
# Copy yo_no_fui_decoder.jsx content to src/App.jsx
npm run dev
```

### Important Constraints
- Single-file React component (no separate CSS/JS files)
- Tailwind core utilities only (no compiler)
- Spanish language, proper accents (í, ó, ñ, etc.)
- No magic/esoteric themes
- Mobile-first, ages 3-77

### Image Assets
Base URL: `https://johnguerra.co/viz/YoNoFui/imgs/`

Missing images that may need creation:
- Goyo.jpg
- Johan.jpg (verify filename)

### Current Status
- ✅ 14 suspects with unique trait combinations
- ✅ 12 balanced traits (4-9 chars each)
- ✅ Character images integrated
- ✅ Core game flow working
- 🔲 Sound effects (optional)
- 🔲 Padre Mejía escape timer (optional)
