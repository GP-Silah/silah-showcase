# Silah Showcase

_Last Updated: January 2026_

This is the permenant showcase of the frontend application for [Silah](https://github.com/GP-Silah), an AI-augmented full-stack B2B platform that connects suppliers and buyers. Built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/).
You can find the actual production frontend repository at [Silah Frontend](https://github.com/GP-Silah/silah-frontend).

> **Silah** (Arabic: صِلَة) _\[noun]_ Connection, bond, link; often used to describe the ties between people, family, or communities.

---

## About This Showcase

This repository represents a UI and UX showcase of the Silah platform.

- All data is mocked
- Backend interactions are simulated
- Some user flows are intentionally limited or disabled
- Demo notices are shown instead of executing real actions (e.g. chat messaging, payments)

This allows viewers to explore the platform’s structure, design, and user journeys without requiring a live backend.

From a project perspective, this approach also allows the platform to remain publicly accessible as a live demo without relying on continuously running backend services or external infrastructure. By deploying the showcase as a static frontend on GitHub Pages, the project can be preserved long-term, free of operational costs, while still presenting the complete user experience and design vision of Silah.

For the real architecture, full functionality, and production implementation, please refer to the main [Silah Frontend](https://github.com/GP-Silah/silah-frontend) repository.

---

## Showcase Scope

The showcase focuses on demonstrating:

- Landing page and marketing sections
- Buyer and Supplier interface layouts
- Navigation and routing structure
- Multi-language support (Arabic / English)
- RTL and LTR layout behavior
- Chat UI flows using mock data
- Demo-only interactions with contextual notices

The following features are **NOT** implemented in this showcase:

- Real-time messaging
- Payments or checkout flows
- File uploads

Instead, these actions trigger demo context popups instead of real functionality.

In the full application, these actions rely on real CRUD operations and integrations with external services (such as translations and object storage).  
In this showcase, those interactions are intentionally disabled or simulated, and informative popups are shown instead.

This ensures the user experience, UI flows, and state transitions can be explored without executing real backend logic or third-party service calls.

---

## Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** react-router-dom v6
- **State Management:** React Hooks
- **Styling:** CSS
- **Translation:** react-i18next
- **Testing:** Vitest + React Testing Library
- **Bundling:** Vite (HMR, optimized build)
- **Version Control:** Git + GitHub

---

## Prerequisites

Make sure you have:

- Node.js >= 20
- npm >= 10
- Git >= 2.40

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/GP-Silah/silah-showcase.git
cd silah-showcase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

This starts Vite dev server with HMR. The default URL: `http://localhost:5173`
No backend setup is required.

---

## Project Structure

```bash
public/
├─ mock-api/          # Static JSON responses used to simulate backend APIs
│  ├─ buyers/
│  │  ├─ cart.en.json
│  │  ├─ preferences.json
│  │  └─ ...
│  ├─ images/
│  │  ├─ code.webp
│  │  ├─ bread.jpg
│  │  ├─ s.png
│  │  └─ ...
│  └─ ...
```

```bash
src/
├─ components/       # Reusable UI components
├─ pages/            # Each page folder contains a page component
│  ├─ Landing/
│  │  └─ Landing.jsx
│  ├─ Signup/
│  ├─ Login/
│  └─ BuyerHomePage/
├─ utils/
│  └─ mock-api/      # Frontend helpers for consuming mock API responses
├─ App.jsx           # Auto-imports all pages dynamically
├─ main.jsx          # ReactDOM entry point
└─ i18n.js           # Language setup
```

The `public/mock-api` directory contains static JSON files that act as mocked API responses. These files are fetched directly by the frontend to simulate backend behavior in the showcase environment, allowing the UI to function without a live server.

> **Note:** Pages are auto-detected for routing. You can optionally export a `routePath` in your page file to override the default path.

---

## Dynamic Routing Example

Each page can export a custom path:

```jsx
// src/pages/BuyerHomePage/BuyerHomePage.jsx
import React from 'react';

export const routePath = '/buyer-home';

function BuyerHomePage() {
  return <h1>Welcome to Buyer Dashboard</h1>;
}

export default BuyerHomePage;
```

The App will automatically pick up this path without modifying `App.jsx`.

---

## Page Titles

Each page can set its own browser title dynamically, based on the current language, using the `useTranslation` hook from i18next.

```jsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Landing() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('pageTitle');
  }, [t, i18n.language]);

  return <div>Landing Page</div>;
}

export default Landing;
```

This ensures the page title updates automatically whenever the user changes the language.

---

## Multi-Language Support

- **Arabic (RTL)**
- **English (LTR)**

Language is handled globally via `i18next`. CSS classes `lang-ar` and `lang-en` adjust layout direction automatically.

```jsx
<div className={i18n.language === 'ar' ? 'lang-ar' : 'lang-en'}>
  <Header />
  <Routes>{routeElements}</Routes>
  <Footer />
</div>
```

---

## License

This project is licensed under the terms specified in the LICENSE file.

---

> Built with care by Silah's Frontend Team, as part of the Graduation Project.
