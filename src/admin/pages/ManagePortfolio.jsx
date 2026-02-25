import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Plus, LayoutGrid } from 'lucide-react';
import ProjectList from '../components/portfolio/ProjectList';
import ProjectForm from '../components/portfolio/ProjectForm';

const ManagePortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        try {
            const res = await axiosPublic.get('/projects');
            setProjects(res.data);
        } catch (err) { console.error("Error fetching projects", err); }
    };

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('desc', formData.desc);
        data.append('link', formData.link);
        data.append('tags', JSON.stringify(formData.tags)); 

        
        if (formData.imageFile) {
            data.append('image', formData.imageFile);
        } else {
          
            data.append('imageUrl', formData.image);
        }

        try {
            if (currentProject) {
                await axiosPrivate.put(`/projects/${currentProject._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axiosPrivate.post('/projects', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setIsFormOpen(false);
            fetchProjects();
            alert("✅ Portfolio Updated Successfully!");
        } catch (err) { 
            console.error(err.response?.data);
            alert(err.response?.status === 401 ? "Session Expired! Please login again." : "Action failed: " + (err.response?.data?.message || "Error")); 
        } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            try {
                await axiosPrivate.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) { alert("Delete failed"); }
        }
    };

    return (
        <div className="relative min-h-[80vh] font-['Manrope'] animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black italic text-white flex items-center gap-3">
                        <LayoutGrid className="text-blue-500" size={36}/> Portfolio
                    </h1>
                    <p className="text-gray-500 text-sm">Manage your professional showcase.</p>
                </div>
                <button onClick={() => { setCurrentProject(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95">
                    <Plus size={20} /> Add Project
                </button>
            </div>

            <ProjectList 
                projects={projects} 
                onEdit={(p) => { setCurrentProject(p); setIsFormOpen(true); }} 
                onDelete={handleDelete} 
            />

            <ProjectForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit} 
                loading={loading}
                initialData={currentProject} 
            />
        </div>
    );
};

export default ManagePortfolio;