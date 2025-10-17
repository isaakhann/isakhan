# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## ✉️ Contact Form Setup (Formspree)

This project now ships with a ready-to-use Formspree integration.

1. Create a free form at Formspree and copy its endpoint ID (it looks like `xyzabcd` from `https://formspree.io/f/xyzabcd`).
2. Copy `.env.example` to `.env.local` and set:
   ```bash
   VITE_FORMSPREE_ID=xyzabcd
   ```
3. Start the app. The **Contact** page form will POST directly to Formspree. Success and error states are shown inline.  

> **Tip:** A hidden `_gotcha` field is added as a honeypot to reduce bot spam.

### Using EmailJS instead (optional)
If you prefer EmailJS:
1. Create a project at EmailJS, grab your **Public Key**, **Service ID**, and **Template ID**.
2. Install the SDK:
   ```bash
   npm i @emailjs/browser
   ```
3. Replace the `handleSubmit` function in `src/App.jsx` with the EmailJS send logic:
   ```js
   import emailjs from '@emailjs/browser';
   // inside handleSubmit:
   await emailjs.send('<SERVICE_ID>', '<TEMPLATE_ID>', {
     name: formData.get('name'),
     email: formData.get('email'),
     message: formData.get('message'),
   }, '<PUBLIC_KEY>');
   ```
4. Keep the same success/error UI state handling.
