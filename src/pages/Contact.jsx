import React, { useState, useEffect } from 'react';
import { 
    Mail, Phone, MapPin, Loader2, ChevronDown, 
    Paperclip, CheckCircle, DollarSign, ArrowRight, X, AlertCircle 
} from 'lucide-react';

// Import Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import ScrollToTop from '../components/common/ScrollToTop'; 
import ScrollRestoration from '../components/common/ScrollRestoration'; 
import MetaData from '../components/common/MetaData'; 
import { axiosPublic } from '../api/axios'; 

const Contact = () => {
    // ✅ 1. DYNAMIC SETTINGS & FORM STATE
    const [settings, setSettings] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); 
    const [fileName, setFileName] = useState("");
    const [fileError, setFileError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // File store karne ke liye

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', budget: '', service: '', message: ''
    });

    // ✅ 2. FETCH ADMIN SETTINGS ON LOAD
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axiosPublic.get('/settings');
                setSettings(res.data);
            } catch (err) {
                console.error("Error fetching contact settings:", err);
            }
        };
        fetchSettings();
    }, []);

    // ✅ 3. HANDLERS
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 25 * 1024 * 1024) { // 25MB Limit
                setFileError("File exceeds 25MB limit.");
                setFileName("");
                setSelectedFile(null);
                e.target.value = ""; 
            } else {
                setFileError("");
                setFileName(file.name);
                setSelectedFile(file); // File state mein save karo
            }
        }
    };

    const removeFile = () => {
        setFileName("");
        setFileError("");
        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = "";
    };

    // ✅ 4. DYNAMIC SUBMISSION (With Attachment Support)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // ✅ IMPORTANT: Use FormData for files
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('budget', formData.budget);
        data.append('service', formData.service);
        data.append('message', formData.message);
        
        if (selectedFile) {
            data.append('attachment', selectedFile); // Backend 'attachment' field pakrega
        }

        try {
            // Backend API call
            const res = await axiosPublic.post('/inquiries', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (res.data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', budget: '', service: '', message: '' });
                removeFile();
                setTimeout(() => setSubmitStatus(null), 7000);
            }
        } catch (err) {
            console.error("Submission error:", err);
            setSubmitStatus('error');
            alert("Failed to send message. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = `w-full px-6 py-4 rounded-xl bg-white/5 border-none outline-none ring-0 focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 text-white caret-white placeholder-gray-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_#1e293b_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]`;

    return (
        <div className="w-full relative bg-[#020617] min-h-screen text-white selection:bg-blue-500/30">
            <MetaData 
               pageName="contact"
                title="Contact Us | Start Your Project with Canva Solutions" 
                description="Ready to build something amazing? Contact Canva Solutions for a free consultation on web development, mobile apps, and digital strategy."
                keywords="contact canva solutions, hire web developers, mobile app quote, software agency contact"
            />

            <div className="relative w-full flex items-center justify-center p-2 sm:p-4 z-50">
                <div className="relative z-10 w-full lg:w-[98%] bg-transparent border border-transparent flex flex-col px-4 sm:px-10 lg:px-16 pt-4">
                    <Navbar />
                </div>
            </div>

            <section className="relative pt-20 pb-24 px-6 lg:px-16 overflow-hidden text-center">
                <div className="absolute inset-0 bg-blue-600/10 blur-[120px] pointer-events-none"></div>
                <div className="container mx-auto max-w-[1000px] relative z-10">
                    <div className="inline-block border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-blue-400 mb-8 bg-white/5 backdrop-blur-sm">Contact Us</div>
                    <h1 className="text-5xl lg:text-7xl font-bold font-['Manrope'] mb-8 leading-[1.1] text-white">
                        Let's Start a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">Conversation.</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">Have a project in mind? We'd love to hear from you.</p>
                </div>
            </section>

            <main id="main-content">
                <section className="pb-32 px-6 lg:px-16 pt-6 lg:pt-10">
                    <div className="container mx-auto max-w-[1400px]">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
                            
                            {/* LEFT COLUMN: DYNAMIC INFO FROM ADMIN SETTINGS */}
                            <div className="lg:col-span-2 space-y-12 relative z-20">
                                <div className="space-y-6">
                                    {/* Email Card */}
                                    <div className="relative z-50 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group shadow-lg">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform"><Mail size={24} /></div>
                                        <h3 className="text-xl font-bold text-white mb-2">Chat with us</h3>
                                        <p className="text-gray-400 mb-4">Our friendly team is here to help.</p>
                                        <div className="flex flex-col gap-2">
                                            {settings?.emails?.map((email, idx) => (
                                                <a key={idx} href={`mailto:${email}`} className="text-white font-bold hover:text-blue-400 transition-colors underline decoration-blue-500/30 block break-all">{email}</a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visit Us Card */}
                                    <div className="relative z-50 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group shadow-lg">
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform"><MapPin size={24} /></div>
                                        <h3 className="text-xl font-bold text-white mb-6">Visit us</h3>
                                        <div className="space-y-6">
                                            {settings?.addresses?.map((addr, idx) => (
                                                <div key={idx} className="flex items-start gap-4">
                                                    <MapPin size={20} className="text-green-400 mt-1 shrink-0" />
                                                    <span className="text-white font-bold whitespace-pre-line leading-relaxed">{addr}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Phone Card */}
                                    <div className="relative z-50 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group shadow-lg">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform"><Phone size={24} /></div>
                                        <h3 className="text-xl font-bold text-white mb-2">Call us</h3>
                                        <p className="text-gray-400 mb-4">Mon-Fri from 8am to 6pm.</p>
                                        <div className="flex flex-col gap-3">
                                            {settings?.phones?.map((phone, idx) => (
                                                <a key={idx} href={`tel:${phone}`} className="text-white font-bold hover:text-purple-400 transition-colors block w-fit">{phone}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: THE FORM */}
                            <div className="lg:col-span-3">
                                <div className="p-8 lg:p-12 rounded-[2.5rem] bg-[#0f172a] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none"></div>
                                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">Send us a message</h2>
                                    
                                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group space-y-2">
                                                <label className="text-sm font-bold text-gray-400 ml-2">Full Name</label>
                                                <input type="text" name="name" value={formData.name} required placeholder="John Doe" className={inputClass} onChange={handleChange} />
                                            </div>
                                            <div className="group space-y-2">
                                                <label className="text-sm font-bold text-gray-400 ml-2">Email Address</label>
                                                <input type="email" name="email" value={formData.email} required placeholder="john@company.com" className={inputClass} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group space-y-2">
                                                <label className="text-sm font-bold text-gray-400 ml-2">Phone Number</label>
                                                <input type="tel" name="phone" value={formData.phone} placeholder="+1..." className={inputClass} onChange={handleChange} />
                                            </div>
                                            <div className="group space-y-2 relative">
                                                <label className="text-sm font-bold text-gray-400 ml-2">Estimated Budget ($)</label>
                                                <div className="relative">
                                                    <input type="number" name="budget" value={formData.budget} placeholder="5000" className={`${inputClass} pl-12`} onChange={handleChange} />
                                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                </div>
                                            </div>
                                        </div>

                                     <div className="group space-y-2 relative">
    <label className="text-sm font-bold text-gray-400 ml-2 group-focus-within:text-blue-400 transition-colors">
        Interested Service
    </label>
    <div className="relative">
        <select 
            name="service" 
            value={formData.service} 
            className={`${inputClass} appearance-none cursor-pointer pr-12`} 
            onChange={handleChange} 
            required
        >
            <option value="" disabled className="bg-[#0f172a] text-gray-400">
                Select a service...
            </option>
            <option value="Web Design & Development" className="bg-[#0f172a] text-white py-4">
                Web Design & Development
            </option>
            <option value="Mobile App Development" className="bg-[#0f172a] text-white py-4">
                Mobile App Development
            </option>
            <option value="Graphic Designing" className="bg-[#0f172a] text-white py-4">
                Graphic Designing
            </option>
            <option value="Social Media Management" className="bg-[#0f172a] text-white py-4">
                Social Media Management
            </option>
            <option value="SEO Services" className="bg-[#0f172a] text-white py-4">
                SEO Services
            </option>
            <option value="E-Commerce" className="bg-[#0f172a] text-white py-4">
                E-Commerce
            </option>
            <option value="Custom Software Development" className="bg-[#0f172a] text-white py-4">
                Custom Software Development
            </option>
        </select>
        
        {/* Custom Arrow Icon */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-blue-400 group-hover:text-white transition-colors">
            <ChevronDown size={20} />
        </div>
    </div>
</div>

                                        <div className="group space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-bold text-gray-400 ml-2">Attachment (Optional)</label>
                                                {fileName && (
                                                    <button type="button" onClick={removeFile} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                                                        <X size={14} /> Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                                                <label htmlFor="file-upload" className={`flex items-center justify-between w-full px-6 py-4 rounded-xl border border-dashed transition-all cursor-pointer ${fileError ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:border-blue-400'}`}>
                                                    <span className="flex items-center gap-2 truncate">
                                                        {fileError ? <AlertCircle size={18} /> : <Paperclip size={18} />}
                                                        {fileName || (fileError ? "File too large" : "Click to attach a file")}
                                                    </span>
                                                    <span className="text-xs bg-white/10 px-2 py-1 rounded whitespace-nowrap ml-2">Max 25MB</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="group space-y-2">
                                            <label className="text-sm font-bold text-gray-400 ml-2">Message</label>
                                            <textarea name="message" value={formData.message} rows="4" required placeholder="Tell us about your project goals..." className={`${inputClass} resize-none`} onChange={handleChange}></textarea>
                                        </div>

                                        <div className="pt-8 w-full flex justify-center flex-col items-center">
                                            <button 
                                                type="submit" 
                                                disabled={isSubmitting || submitStatus === 'success'}
                                                className={`group relative flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-lg transition-all ${submitStatus === 'success' ? 'bg-emerald-600' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:-translate-y-1 shadow-lg shadow-blue-500/20'}`}
                                            >
                                                {isSubmitting ? (
                                                    <><Loader2 className="animate-spin" size={20} /> Processing...</>
                                                ) : submitStatus === 'success' ? (
                                                    <>Sent Successfully <CheckCircle size={20} /></>
                                                ) : (
                                                    <>Send Message <ArrowRight size={20} /></>
                                                )}
                                            </button>
                                            
                                            {submitStatus === 'success' && (
                                                <p className="text-emerald-400 text-sm mt-4 animate-bounce">Thanks! We'll stay in touch soon.</p>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
            <ScrollRestoration />
        </div>
    );
};

export default Contact;