import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import PersistAdminLogin from './admin/layouts/PersistAdminLogin';
import AdminProtectedRoute from './admin/layouts/AdminProtectedRoute';

import ScrollToTop from './components/common/ScrollToTop';
import ScrollRestoration from './components/common/ScrollRestoration';
import Sidebar from './components/layout/Sidebar';

import Home from './pages/Home';
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const BlogPost = lazy(() => import('./components/blogs/BlogPost'));

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

const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));


const DynamicServicePage = lazy(() => import('./components/services/DynamicServicePage'));

const LoadingSpinner = () =>
<div className="flex items-center justify-center min-h-screen bg-[#020617]">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-white/50 italic font-['Manrope']">Syncing...</p>
    </div>
  </div>;


const App = () => {
  return (
    <AdminAuthProvider>
      <Router>
        <ScrollRestoration />
        <ScrollToTop />
        <Sidebar />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            
            
            <Route path="/services/:slug" element={<DynamicServicePage />} />

            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            
            <Route element={<PersistAdminLogin />}> 
              <Route element={<AdminProtectedRoute />}> 
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="team" element={<ManageTeam />} />
                  <Route path="manage-admins" element={<AddAdmin />} />
                  <Route path="settings" element={<ManageSettings />} />
                  <Route path="services-manager" element={<ManageServicePages />} />
                  <Route path="blogs" element={<ManageBlogs />} />
                  <Route path="reviews" element={<ManageReviews />} />
                  <Route path="portfolio" element={<ManagePortfolio />} />
                  <Route path="about-page" element={<ManageAboutPage />} />
                  <Route path="messages" element={<Inquiries />} />
                  <Route path="manage-faqs" element={<ManageFAQsPage />} />
                  <Route path="manage-choose-us" element={<ManageWhyChooseUs />} />
                  <Route path="manage-hero" element={<ManageHero />} />
                  <Route path="trusted-by" element={<ManageTrustedBy />} />
                  <Route path="manage-seo" element={<ManageSEO />} />
                  <Route path="portfolio-settings" element={<ManagePortfolioConfig />} />
                </Route>
              </Route>
            </Route>

          </Routes>
        </Suspense>
      </Router>
    </AdminAuthProvider>);

};

export default App;