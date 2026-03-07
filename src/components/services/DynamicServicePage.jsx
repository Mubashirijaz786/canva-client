import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import { Loader2 } from 'lucide-react';

import { servicesData } from '../../data/servicesData';

import Ecommerce from './Ecommerce';
import SEO from './SEO';
import ContentWriting from './ContentWriting';
import GraphicDesign from './GraphicDesign';
import SocialMedia from './SocialMedia';
import MobileApp from './MobileApp';
import WebDevelopment from './WebDevelopment';
import CustomSoftware from './CustomSoftware';

const DynamicServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic.get(`/service-pages/slug/${slug}`);

        if (res.data && res.data.pageId) {
          if (res.data.slug && res.data.slug !== slug) {
            return navigate(`/services/${res.data.slug}`, { replace: true });
          }
          setPageData(res.data);
        } else {
          handleFallback();
        }
      } catch (err) {
        handleFallback();
        console.warn("Using static fallback because API failed.");
      } finally {
        setLoading(false);
      }
    };

    const handleFallback = () => {
      const staticMatch = servicesData.find((s) => s.id === slug || s.link.includes(slug));
      if (staticMatch) {
        setPageData({
          pageId: staticMatch.id,
          heroTitle: staticMatch.title,
          heroSubtitle: staticMatch.desc,
          isStaticFallback: true
        });
      } else {
        setPageData(null);
      }
    };

    fetchPageData();
  }, [slug, navigate]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020617]">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

 
  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
      </div>
    );
  }

  const componentsMap = {
    'e-commerce': Ecommerce,
    'seo': SEO,
    'content-writing': ContentWriting,
    'graphic-design': GraphicDesign,
    'social-media': SocialMedia,
    'app-development': MobileApp,
    'web-development': WebDevelopment,
    'custom-software': CustomSoftware
  };

 
  const TargetComponent = componentsMap[pageData.pageId];

  
  if (!TargetComponent) {
     return <WebDevelopment data={pageData} />;
  }

  return <TargetComponent data={pageData} />;
};

export default DynamicServicePage;