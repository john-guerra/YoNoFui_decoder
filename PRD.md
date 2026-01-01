# ¡Yo No Fui! - Product Requirements Document

## Overview
A cooperative family board game decoder app inspired by Outfoxed. Players work together to identify which family member is the "culprit" before Padre Mejía escapes. The app replaces the physical decoder mechanism.

## Theme
Something broke or went missing at Grandma Nes's house. Everyone says "¡Yo no fui!" (I didn't do it!). Players are family detectives who must find clues and discover the culprit before the mysterious Padre Mejía escapes with the secret.

## Core App Functions
1. **Select culprit secretly** - Random selection at game start, hidden from players
2. **Reveal clues** - Show random trait with SÍ/NO indicating if culprit has it
3. **Verify accusation** - Confirm if player's guess is correct

## The 14 Suspects

| Character | Traits | Image |
|-----------|--------|-------|
| Vicente | gafas, llorón, hombre, adulto, religioso, calvo, café | Vicente.jpg |
| Edwin | llorón, ejercicio, hombre, adulto, religioso, calvo, café, picante | Edwin.jpg |
| Jambita | gafas, llorón, ejercicio, hombre, adulto, videojuegos, calvo, café, picante | Jambita.jpg |
| Eli | gafas, llorón, ejercicio, adulto, religioso, fashionista | Eli.jpg |
| Magda | adulto, religioso, fashionista, café, picante | Magda.jpg |
| Aide | pelo_lacio, adulto, religioso, fashionista, café, picante | Aide.jpg |
| Yuli | pelo_lacio, adulto | Yuli.jpg |
| Johan | gafas, hombre, adulto, videojuegos, religioso, calvo | Johan.jpg |
| Mafe | ejercicio, adulto, picante | Mafe.png |
| Santi | llorón, pelo_lacio, ejercicio, hombre, videojuegos | Santi.jpg |
| Goyo | pelo_lacio, ejercicio, hombre, videojuegos | Goyo.jpg |
| Luchi | pelo_lacio, videojuegos, fashionista | Luchi.jpg |
| Juanchito | hombre, videojuegos, religioso | Juanchito.jpg |
| Miguelito | llorón, hombre, videojuegos | Miguelito.jpg |

## The 12 Traits

| Key | Name | Icon | Count |
|-----|------|------|-------|
| gafas | Usa gafas | 👓 | 4 |
| lloron | Llorón | 😢 | 6 |
| pelo_lacio | Pelo lacio | 👱 | 5 |
| ejercicio | Hace ejercicio | 🏋️ | 6 |
| hombre | Es hombre | 👨 | 8 |
| adulto | Es adulto | 🧑 | 9 |
| videojuegos | Videojuegos | 🎮 | 7 |
| religioso | Religioso | ⛪ | 7 |
| fashionista | Fashionista | 👗 | 4 |
| calvo | Calvo/Canoso | 👨‍🦲 | 4 |
| cafe | Toma café | ☕ | 5 |
| picante | Come picante | 🌶️ | 5 |

All 14 suspects have unique trait combinations. Traits balanced 4-9 characters each.

## Image Assets
- Base URL: `https://johnguerra.co/viz/YoNoFui/imgs/`
- Character cards: `{Name}.jpg` or `{Name}.png`
- Special: `Nes.png` (grandmother), `Padre_Mejia.png` (villain token)

## Design Guidelines
- **Colors**: Warm Colombian aesthetic - terracotta (#C4956A), cream (#FFF8F0), tan (#E8D5C4), brown (#5D4E37)
- **Target users**: Ages 3-77, mobile-first
- **Language**: Spanish with proper accents
- **No magic/esoteric elements** (family religious beliefs)

## Game Flow
1. Start screen → "Nueva Partida" button
2. App secretly selects random culprit
3. Players tap "Revelar Pista" to get random trait clue (SÍ/NO)
4. Players manually track/eliminate suspects on physical board
5. App helps by letting players tap suspects to mark eliminated
6. When ready, player taps "¡Acusar!" and selects suspect
7. App reveals if correct → Victory or Defeat screen

## Tech Stack
- React (single-file component)
- Tailwind CSS (core utilities only)
- No external dependencies beyond React
- Mobile-responsive design
