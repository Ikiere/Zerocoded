import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogOut, Settings, Folder, Plus, Trash2, Edit2, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

interface ProjectItem {
  id: string;
  title: string;
  type: string;
  category: string;
  color: string;
  accent_color: string;
  tags: string[];
}

interface AppSettings {
  github_username: string;
  use_github_cv: boolean;
  custom_cv_url: string;
  business_cert_url: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  
  // Auth check
  const [authLoading, setAuthLoading] = useState(true);

  // Dynamic projects state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    title: '',
    type: '',
    category: 'web-app',
    color: '#0f172a',
    accent_color: '#2563ff',
    tags: [],
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  // Settings state
  const [settingsForm, setSettingsForm] = useState<AppSettings>({
    github_username: '',
    use_github_cv: true,
    custom_cv_url: '',
    business_cert_url: '',
  });

  // UI notifications
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('zc_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    async function checkAuthAndLoadData() {
      try {
        setAuthLoading(true);
        // Verify token against me endpoint
        await api.get('/api/admin/me');
        
        // Fetch data
        const [projectsRes, settingsRes] = await Promise.all([
          api.get('/api/projects'),
          api.get('/api/settings'),
        ]);

        // Map public response formatting to CRUD array structure
        const publicProjects = projectsRes.data?.data || [];
        const rawSettings = settingsRes.data?.data || {};

        setProjects(publicProjects.map((p: any) => ({
          id: p.id,
          title: p.title,
          type: p.description,
          category: p.category,
          color: p.color || '#0f172a',
          accent_color: p.accentColor || '#2563ff',
          tags: p.technologies || [],
        })));

        setSettingsForm({
          github_username: rawSettings.github_username || '',
          use_github_cv: rawSettings.use_github_cv !== false,
          custom_cv_url: rawSettings.custom_cv_url || '',
          business_cert_url: rawSettings.business_cert_url || '',
        });
      } catch (err: any) {
        console.error('Auth verification failed:', err);
        localStorage.removeItem('zc_token');
        navigate('/admin/login');
      } finally {
        setAuthLoading(false);
      }
    }

    checkAuthAndLoadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('zc_token');
    navigate('/admin/login');
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      setSuccessMsg(message);
      setErrorMsg('');
    } else {
      setErrorMsg(message);
      setSuccessMsg('');
    }
    setTimeout(() => {
      setSuccessMsg('');
      setErrorMsg('');
    }, 4000);
  };

  // --- Project CRUD Operations ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.type || !projectForm.category) {
      showNotification('error', 'Please fill in all required fields.');
      return;
    }

    const payload = {
      ...projectForm,
      tags: tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0),
    };

    try {
      setActionLoading(true);
      if (editingProjectId) {
        // Edit existing project
        const res = await api.put(`/api/admin/projects/${editingProjectId}`, payload);
        if (res.data?.success) {
          const updated = res.data.data;
          setProjects((prev) =>
            prev.map((p) =>
              p.id === editingProjectId
                ? {
                    id: updated.id,
                    title: updated.title,
                    type: updated.type,
                    category: updated.category,
                    color: updated.color,
                    accent_color: updated.accent_color,
                    tags: updated.tags,
                  }
                : p
            )
          );
          showNotification('success', 'Project updated successfully');
          resetProjectForm();
        }
      } else {
        // Create new project
        const res = await api.post('/api/admin/projects', payload);
        if (res.data?.success) {
          const created = res.data.data;
          setProjects((prev) => [
            {
              id: created.id,
              title: created.title,
              type: created.type,
              category: created.category,
              color: created.color,
              accent_color: created.accent_color,
              tags: created.tags,
            },
            ...prev,
          ]);
          showNotification('success', 'Project added successfully');
          resetProjectForm();
        }
      }
    } catch (err: any) {
      showNotification('error', err.response?.data?.message || 'Failed to save project.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditProject = (project: ProjectItem) => {
    setEditingProjectId(project.id);
    setProjectForm(project);
    setTagsInput(project.tags.join(', '));
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      setActionLoading(true);
      const res = await api.delete(`/api/admin/projects/${id}`);
      if (res.data?.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showNotification('success', 'Project deleted successfully');
      }
    } catch (err: any) {
      showNotification('error', err.response?.data?.message || 'Failed to delete project.');
    } finally {
      setActionLoading(false);
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      type: '',
      category: 'web-app',
      color: '#0f172a',
      accent_color: '#2563ff',
      tags: [],
    });
    setTagsInput('');
    setEditingProjectId(null);
  };

  // --- Save Settings Operation ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const res = await api.post('/api/admin/settings', settingsForm);
      if (res.data?.success) {
        showNotification('success', 'Settings updated successfully');
      }
    } catch (err: any) {
      showNotification('error', err.response?.data?.message || 'Failed to save settings.');
    } finally {
      setActionLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary animate-pulse">Verifying Session...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Zerocoded</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-surface dark:bg-slate-950 text-secondary dark:text-slate-100 py-24">
        <div className="container-custom max-w-5xl">
          
          {/* Main action bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Workspace Management</span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1.5">
                <LogOut size={14} />
                Logout
              </Button>
            </div>
          </div>

          {/* Toast notifications */}
          {successMsg && (
            <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-success/5 border border-success/15 text-success text-xs leading-relaxed">
              <CheckCircle size={15} className="shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-danger/5 border border-danger/15 text-danger text-xs leading-relaxed">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-border mb-8 pb-px">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px flex items-center gap-2 transition-colors ${
                activeTab === 'projects'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-secondary dark:hover:text-white'
              }`}
            >
              <Folder size={15} />
              Portfolio Projects
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px flex items-center gap-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-secondary dark:hover:text-white'
              }`}
            >
              <Settings size={15} />
              System Config & CV
            </button>
          </div>

          {/* Tab 1: Portfolio CMS */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Form */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 shadow-soft sticky top-24">
                  <h3 className="text-sm font-bold text-secondary dark:text-white mb-4 flex items-center gap-1.5 border-b border-border pb-3">
                    <Plus size={16} className="text-primary" />
                    {editingProjectId ? 'Edit Project' : 'Add Project'}
                  </h3>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wide mb-1">Title</label>
                      <Input
                        type="text"
                        placeholder="e.g. FinTech Platform"
                        value={projectForm.title || ''}
                        onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wide mb-1">Description / Subtitle</label>
                      <Input
                        type="text"
                        placeholder="e.g. Web Application"
                        value={projectForm.type || ''}
                        onChange={(e) => setProjectForm((p) => ({ ...p, type: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wide mb-1">Category</label>
                      <select
                        value={projectForm.category || 'web-app'}
                        onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-border dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="website">Website</option>
                        <option value="web-app">Web App</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="e-commerce">E-Commerce</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wide mb-1">Primary Color (Hex)</label>
                      <Input
                        type="text"
                        placeholder="e.g. #0a1628"
                        value={projectForm.color || ''}
                        onChange={(e) => setProjectForm((p) => ({ ...p, color: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wide mb-1">Accent Color (Hex)</label>
                      <Input
                        type="text"
                        placeholder="e.g. #2563ff"
                        value={projectForm.accent_color || ''}
                        onChange={(e) => setProjectForm((p) => ({ ...p, accent_color: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wide mb-1">Tech Tags (comma separated)</label>
                      <Input
                        type="text"
                        placeholder="e.g. React, Next.js, Stripe"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button type="submit" variant="primary" size="sm" className="flex-1 justify-center" loading={actionLoading}>
                        {editingProjectId ? 'Update' : 'Add'}
                      </Button>
                      {editingProjectId && (
                        <Button type="button" variant="outline" size="sm" onClick={resetProjectForm}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Projects List */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 shadow-soft">
                  <h3 className="text-sm font-bold text-secondary dark:text-white border-b border-border pb-3 mb-4">
                    Active Portfolio Projects ({projects.length})
                  </h3>

                  <div className="divide-y divide-border">
                    {projects.map((project) => (
                      <div key={project.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-secondary dark:text-white truncate">{project.title}</h4>
                          <p className="text-xs text-muted mt-0.5">{project.type} • <span className="capitalize">{project.category}</span></p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface dark:hover:bg-slate-950 transition-colors"
                            aria-label="Edit project"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-surface dark:hover:bg-slate-950 transition-colors"
                            aria-label="Delete project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-center text-xs text-muted py-8">No dynamic projects created yet. System falls back to static list.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: System Config Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-8 shadow-soft">
                <h3 className="text-sm font-bold text-secondary dark:text-white border-b border-border pb-3 mb-6 flex items-center gap-2">
                  <Settings size={16} className="text-primary" />
                  Credentials & CV Configuration
                </h3>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {/* GitHub username config */}
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wide mb-1.5">GitHub Username</label>
                    <Input
                      type="text"
                      placeholder="e.g. ikiere"
                      value={settingsForm.github_username}
                      onChange={(e) => setSettingsForm((s) => ({ ...s, github_username: e.target.value }))}
                    />
                  </div>

                  {/* Toggle configuration selector */}
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wide mb-2">CV Generation Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSettingsForm((s) => ({ ...s, use_github_cv: true }))}
                        className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                          settingsForm.use_github_cv
                            ? 'border-primary bg-primary/5 text-primary font-semibold'
                            : 'border-border bg-white dark:bg-slate-950 text-muted hover:text-secondary'
                        }`}
                      >
                        GitHub CV Builder
                      </button>
                      <button
                        type="button"
                        onClick={() => setSettingsForm((s) => ({ ...s, use_github_cv: false }))}
                        className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                          !settingsForm.use_github_cv
                            ? 'border-primary bg-primary/5 text-primary font-semibold'
                            : 'border-border bg-white dark:bg-slate-950 text-muted hover:text-secondary'
                        }`}
                      >
                        Custom Upload (PDF)
                      </button>
                    </div>
                  </div>

                  {/* Custom PDF CV URL */}
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <FileText size={13} className="text-muted" />
                      Custom CV PDF URL
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. https://domain.com/my-cv.pdf"
                      value={settingsForm.custom_cv_url}
                      onChange={(e) => setSettingsForm((s) => ({ ...s, custom_cv_url: e.target.value }))}
                    />
                  </div>

                  {/* Business certificate URL */}
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <FileText size={13} className="text-muted" />
                      Business Registration Certificate URL
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. https://domain.com/business-cert.pdf"
                      value={settingsForm.business_cert_url}
                      onChange={(e) => setSettingsForm((s) => ({ ...s, business_cert_url: e.target.value }))}
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md" className="w-full justify-center shadow-primary" loading={actionLoading}>
                      Save System Settings
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
