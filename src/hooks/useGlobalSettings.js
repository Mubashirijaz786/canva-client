import { useState, useEffect } from 'react';
import { axiosPublic } from '../api/axios';

export const useGlobalSettings = () => {
  const [settings, setSettings] = useState({
    calendlyLink: "https://calendly.com/canvasolutions-info/",
    whatsappNumber: "17374436352"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosPublic.get('/settings');
        if (res.data) {
          setSettings(prev => ({
            calendlyLink: res.data.calendlyLink || prev.calendlyLink,
            whatsappNumber: res.data.whatsappNumber || prev.whatsappNumber
          }));
        }
      } catch {
        console.log("Using fallback settings");
      }
    };

    fetchSettings();
  }, []);

  return settings;
};