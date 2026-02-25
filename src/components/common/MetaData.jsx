import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../../utils/config';
import { axiosPublic } from '../../api/axios';

const MetaData = ({ pageName, title: defaultTitle, description: defaultDescription, keywords: defaultKeywords }) => {
    const location = useLocation();
    const currentUrl = `${SITE_URL}${location.pathname}`;
    const [seo, setSeo] = useState(null);

    useEffect(() => {
        const fetchSEO = async () => {
            if (!pageName) return;
            try {
                const res = await axiosPublic.get(`/seo/${pageName}`);
                if (res.data && res.data.metaTitle) {
                    setSeo(res.data);
                }
            } catch (err) {
                console.error("SEO Fetch Error:", err);
            }
        };
        fetchSEO();
    }, [pageName]);

    // Priority logic: Database data > Props data
    const title = seo?.metaTitle || defaultTitle;
    const description = seo?.metaDescription || defaultDescription;
    const keywords = seo?.metaKeywords || defaultKeywords;
    const image = seo?.ogImage || `${SITE_URL}/default-og.png`;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={seo?.ogTitle || title} />
            <meta property="og:description" content={seo?.ogDescription || description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />

            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo?.ogTitle || title} />
            <meta name="twitter:description" content={seo?.ogDescription || description} />
            <meta name="twitter:image" content={image} />
        </>
    );
};

export default MetaData;