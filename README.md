# 🎭 Money Heist (La Casa de Papel) Interactive Experience

Welcome to the **Money Heist Interactive Experience**, a highly immersive, premium web application built as a tribute to the legendary Netflix series, *La Casa de Papel*.

This single-page React application features stunning aesthetics, complex UI animations, an interactive 3D Dalí mask canvas, and bilingual support (English & Spanish), all optimized perfectly for desktop, tablet, and mobile devices.

---

## 🌟 Key Features

- **Dynamic Canvas Engine:** A custom HTML5 canvas in the Hero section renders an interactive Dalí mask that follows your cursor, creating an off-screen masked reveal effect.
- **Bilingual Interface:** Instant toggling between English (EN) and Spanish (ES) using React Context, updating all typography, character bios, and quotes seamlessly.
- **Responsive Architecture:** Fully responsive design utilizing CSS Grid and Flexbox, with carefully calibrated media queries for mobile and tablet perfection.
- **The Royal Mint Vault:** A fully interactive mini-game where users must input a PIN code on a virtual keypad to unlock the vault doors via 3D CSS transforms.
- **Interactive Character Grid:** Explore the crew with glassmorphic cards and a dynamic side-drawer (bottom-sheet on mobile) detailing their status (Alive/Deceased) and deep lore.
- **Custom Soundtrack:** Immersive audio integration featuring the iconic theme song, complete with a visual equalizer toggle.
- **Framer Motion Animations:** Smooth layout transitions, scramble-text decoding effects, and scroll-linked typography.

## 🛠 Technology Stack

- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, Grid, 3D Transforms, Glassmorphism)
- **Animations:** Framer Motion
- **Deployment:** GitHub Pages (`gh-pages`)

---

## 🚀 Local Development

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/therahimulislam/moneyheist.git
   ```
2. Navigate to the project directory:
   ```bash
   cd moneyheist
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the `localhost` URL provided in the terminal (usually `http://localhost:5173`).

---

## 🌍 Deployment

This project is configured to automatically deploy to GitHub pages.

To push your latest changes live to the internet, simply run:
```bash
npm run deploy
```
This command automatically executes the Vite build process and pushes the highly optimized `dist` folder to the `gh-pages` branch on GitHub.

---

<p align="center">
  <i>Made with ❤️ by Rahimul</i><br/>
  <i>"O Bella Ciao, Bella Ciao, Bella Ciao Ciao Ciao!"</i>
</p>
