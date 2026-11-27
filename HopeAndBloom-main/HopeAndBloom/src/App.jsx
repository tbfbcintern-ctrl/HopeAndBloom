import { useEffect } from 'react';
import { initializeInteractions } from './interactions.js';
import { Header, Hero } from './components/Header.jsx';
import { PageSections } from './components/PageSections.jsx';
import { Dialogs } from './components/Dialogs.jsx';
import { Footer, FloatingControls } from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    initializeInteractions();
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <PageSections />
      </main>
      <Dialogs />
      <Footer />
      <FloatingControls />
    </>
  );
}
