import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { DealsBanner } from './components/DealsBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { StoreShowroomSection } from './components/StoreShowroomSection';
import { VerifiedReviewsSection } from './components/VerifiedReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { QuickCategoriesBar } from './components/QuickCategoriesBar';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ShopProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        {/* Navigation Bar */}
        <Navbar onNavClick={scrollToSection} />

        {/* Main Store Sections */}
        <main className="flex-1">
          <HeroSection
            onExploreClick={() => scrollToSection('catalog')}
            onDealsClick={() => scrollToSection('deals')}
          />

          {/* Quick 1-Tap Category Filter Strip */}
          <QuickCategoriesBar
            onCategorySelected={() => scrollToSection('catalog')}
          />

          <FeaturedShowcase
            onViewAllClick={() => scrollToSection('catalog')}
          />

          <DealsBanner />

          <ProductCatalog />

          <StoreShowroomSection />

          <VerifiedReviewsSection />
        </main>

        {/* Store Footer */}
        <Footer onNavClick={scrollToSection} />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Interactive Modals & Drawers */}
        <CartDrawer />
        <CheckoutModal />
        <ProductDetailModal />
        <QuickViewModal />
        <OrderTrackingModal />
        <AdminDashboardModal />
      </div>
    </ShopProvider>
  );
}
