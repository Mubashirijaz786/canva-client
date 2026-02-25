import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- AUTH IMPORTS ---
import { AdminAuthProvider } from './admin/context/AdminAuthContext'; 
import PersistAdminLogin from './admin/layouts/PersistAdminLogin';
import AdminProtectedRoute from './admin/layouts/AdminProtectedRoute';

// Layout & Common
import ScrollToTop from './components/common/ScrollToTop';
import ScrollRestoration from './components/common/ScrollRestoration';
import Sidebar from './components/layout/Sidebar';

// Public Pages
import Home from './pages/Home';
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const BlogPost = lazy(() => import('./components/blogs/BlogPost'));

// --- ADMIN PAGES ---
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const ForgotPassword = lazy(() => import('./admin/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./admin/pages/ResetPassword'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const ManageTeam = lazy(() => import('./admin/pages/ManageTeam'));
const AddAdmin = lazy(() => import('./admin/pages/AddAdmin'));
const ManageSettings = lazy(() => import('./admin/pages/ManageSettings'));
const ManageBlogs = lazy(() => import('./admin/pages/ManageBlogs'));
const ManageReviews = lazy(() => import('./admin/pages/ManageReviews'));
const ManagePortfolio = lazy(() => import('./admin/pages/ManagePortfolio'));
const ManageServicePages = lazy(() => import('./admin/pages/ManageServicePages'));
const ManageAboutPage = lazy(() => import('./admin/pages/ManageAbout'));
const Inquiries = lazy(() => import('./admin/pages/Inquiries'));
const ManageFAQsPage = lazy(() => import('./admin/pages/ManageFAQs'));
const ManageWhyChooseUs = lazy(() => import('./admin/pages/ManageWhyChooseUs'));
const ManageHero = lazy(() => import('./admin/pages/ManageHero'));

const ManageTrustedBy = lazy(() => import('./admin/pages/ManageTrustedBy'));
const ManageSEO = lazy(() => import('./admin/pages/ManageSEO'));
const ManagePortfolioConfig = lazy(() => import('./admin/pages/ManagePortfolioConfig'));
const ManageServices = lazy(() => import('./admin/pages/ManageServices'));




// Admin Layout
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

// Service Sub-pages
const Ecommerce = lazy(() => import('./components/services/Ecommerce'));
const SEO = lazy(() => import('./components/services/SEO'));
const ContentWriting = lazy(() => import('./components/services/ContentWriting'));
const GraphicDesign = lazy(() => import('./components/services/GraphicDesign'));
const SocialMedia = lazy(() => import('./components/services/SocialMedia'));
const MobileApp = lazy(() => import('./components/services/MobileApp'));
const WebDevelopment = lazy(() => import('./components/services/WebDevelopment'));
const CustomSoftware = lazy(() => import('./components/services/CustomSoftware'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#020617]">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-white/50 italic font-['Manrope']">Authenticating...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <AdminAuthProvider>
      <Router>
        <ScrollRestoration />
        <ScrollToTop />
        <Sidebar />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* --- 1. PUBLIC WEBSITE ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Service sub-pages */}
            <Route path="/services/e-commerce" element={<Ecommerce />} />
            <Route path="/services/seo" element={<SEO />} />
            <Route path="/services/content-writing" element={<ContentWriting />} />
            <Route path="/services/graphic-design" element={<GraphicDesign />} />
            <Route path="/services/social-media" element={<SocialMedia />} />
            <Route path="/services/app-development" element={<MobileApp />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/custom-software" element={<CustomSoftware />} />
            
            {/* --- 2. PUBLIC AUTH ROUTES --- */}
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* ❌ PUBLIC REGISTER ROUTE REMOVED FOR SECURITY */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* --- 3. PROTECTED ADMIN ROUTES --- */}
            <Route element={<PersistAdminLogin />}> 
              <Route element={<AdminProtectedRoute />}> 
                <Route path="/admin" element={<AdminLayout />}>
                 
                  <Route index element={<Dashboard />} />
                  
                  {/* Manage Team */}
                  <Route path="team" element={<ManageTeam />} />

                  {/* ✅ ADD NEW ADMIN (Protected: Super Admin Only logic inside) */}
                  <Route path="manage-admins" element={<AddAdmin />} />
                  <Route path="settings" element={<ManageSettings />} />
                  <Route path="services-manager" element={<ManageServicePages />} />
                  {/* Future Admin Modules */}
                <Route path="blogs" element={<ManageBlogs />} />
                  <Route path="reviews" element={<ManageReviews />} />
                  <Route path="portfolio" element={<ManagePortfolio />} />
                  <Route path="about-page" element={<ManageAboutPage />} />
                  <Route path="/admin/messages" element={<Inquiries />} />
                  <Route path="manage-faqs" element={<ManageFAQsPage/>} />
                  <Route path="manage-choose-us" element={<ManageWhyChooseUs />} />
                  <Route path="manage-hero" element={<ManageHero />} />
                  <Route path="trusted-by" element={<ManageTrustedBy />} />
                  <Route path="manage-seo" element={<ManageSEO />} />
                  <Route path="portfolio-settings" element={<ManagePortfolioConfig />} />
                  <Route path="services" element={<ManageServices />} />
                </Route>
              </Route>
            </Route>

          </Routes>
        </Suspense>
      </Router>
    </AdminAuthProvider>
  );
};

export default App;