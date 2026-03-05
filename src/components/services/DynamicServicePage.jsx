import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../api/axios';
import { Loader2 } from 'lucide-react';

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
                if (res.data && Object.keys(res.data).length > 0) {
                    setPageData(res.data);
                } else {
                    navigate('/services'); 
                }
            } catch (err) {
                console.error("Error fetching service data:", err);
                navigate('/services');
            } finally {
                setLoading(false);
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

    const componentsMap = {
        'e-commerce': Ecommerce,
        'seo': SEO,
        'content-writing': ContentWriting,
        'graphic-design': GraphicDesign,
        'social-media': SocialMedia,
        'mobile-app': MobileApp,
        'web-development': WebDevelopment,
        'custom-software': CustomSoftware
    };

    const TargetComponent = componentsMap[pageData?.pageId] || WebDevelopment;

    return <TargetComponent data={pageData} />;
};

export default DynamicServicePage;