import { useState, useEffect } from 'react';
import { axiosPublic } from '../api/axios';

export const useGlobalSettings = () => {
    const [settings, setSettings] = useState({
        calendlyLink: "https://calendly.com/canvasolutions-info/", 
        whatsappNumber: "17374436352"
    });

    useEffect(() => {
        axiosPublic.get('/settings').then(res => {
            if (res.data) {
                setSettings({
                    calendlyLink: res.data.calendlyLink || settings.calendlyLink,
                    whatsappNumber: res.data.whatsappNumber || settings.whatsappNumber
                });
            }
        }).catch(() => console.log("Using fallback settings"));
    }, []);

    return settings;
};