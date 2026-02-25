import React, { useState, useEffect } from 'react';
import { axiosPrivate, axiosPublic } from '../../api/axios';
import { Plus } from 'lucide-react';
import TeamForm from '../components/team/TeamForm';
import TeamList from '../components/team/TeamList';

const ManageTeam = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [uploadType, setUploadType] = useState('file'); 
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', image: '', linkedin: '', twitter: '' });

    useEffect(() => { fetchTeam(); }, []);

    const fetchTeam = async () => {
        try {
            const res = await axiosPublic.get('/team');
            setMembers(res.data);
        } catch (err) { console.error("Fetch error", err); }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', role: '', image: '', linkedin: '', twitter: '' });
        setSelectedFile(null);
        setImagePreview(null);
        setEditMode(false);
        setEditId(null);
        setIsModalOpen(false);
    };

    const startEdit = (m) => {
        setEditMode(true);
        setEditId(m._id);
        setFormData({ name: m.name, role: m.role, image: m.image, linkedin: m.linkedin || '', twitter: m.twitter || '' });
        setImagePreview(m.image);
        setUploadType(m.image.startsWith('http') ? 'url' : 'file');
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('role', formData.role);
            if (uploadType === 'file' && selectedFile) data.append('image', selectedFile);
            else data.append('imageUrl', formData.image);

            if (editMode) await axiosPrivate.put(`/team/${editId}`, data);
            else await axiosPrivate.post('/team', data);

            resetForm();
            fetchTeam();
        } catch (err) { alert("Operation failed"); } 
        finally { setLoading(false); }
    };

    const deleteMember = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axiosPrivate.delete(`/team/${id}`);
            fetchTeam();
        } catch (err) { alert("Delete failed"); }
    };

    return (
        <div className="space-y-8 p-2 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black italic tracking-tight text-white">Manage Team</h1>
                    <p className="text-gray-500 text-sm font-medium">Add, Edit or Remove agency members.</p>
                </div>
                <button 
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                >
                    <Plus size={20} /> Add New Member
                </button>
            </div>

            <TeamList members={members} startEdit={startEdit} deleteMember={deleteMember} />

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={resetForm} />
                    <div className="relative w-full max-w-xl">
                        <TeamForm 
                            formData={formData} setFormData={setFormData}
                            handleSubmit={handleSubmit} loading={loading}
                            editMode={editMode} resetForm={resetForm}
                            uploadType={uploadType} setUploadType={setUploadType}
                            handleFileChange={handleFileChange} imagePreview={imagePreview}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTeam;