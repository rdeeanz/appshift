'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users as UsersIcon, 
  Settings, 
  LogOut,
  Clock,
  MoreVertical,
  Plus,
  Edit2,
  Trash2,
  Mail,
  X,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { createPostAction, updatePostAction, deletePostAction } from './blog-actions'

export function AdminDashboardUI({ user, stats, apps, users, posts, categories }: any) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [postToDelete, setPostToDelete] = useState<any>(null)
  const [isPending, setIsPending] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Apps', icon: Package },
    { name: 'Blog', icon: FileText },
    { name: 'Users', icon: UsersIcon },
    { name: 'Settings', icon: Settings },
  ]

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    const res = await createPostAction(formData)
    setIsPending(false)
    if (res.success) {
      showToast('Post created successfully')
      setIsModalOpen(false)
      setImagePreview(null)
    } else {
      showToast(res.error || 'Failed to create post', 'error')
    }
  }

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    const res = await updatePostAction(editingPost.id, formData)
    setIsPending(false)
    if (res.success) {
      showToast('Post updated successfully')
      setEditingPost(null)
      setImagePreview(null)
    } else {
      showToast(res.error || 'Failed to update post', 'error')
    }
  }

  const handleDeletePost = async () => {
    setIsPending(true)
    const res = await deletePostAction(postToDelete.id)
    setIsPending(false)
    if (res.success) {
      showToast('Post deleted successfully')
      setPostToDelete(null)
    } else {
      showToast(res.error || 'Failed to delete post', 'error')
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[120] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-in fade-in slide-in-from-right-4 ${
          toast.type === 'success' ? 'bg-bg border-emerald-500/20 text-emerald-500' : 'bg-bg border-red-500/20 text-red-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-bold text-[0.9375rem]">{toast.message}</span>
        </div>
      )}

      {/* Fixed Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col flex-shrink-0 h-full">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-[1.0625rem] font-bold text-txt">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="7" fill="#c96442"/>
              <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            AppShift Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9375rem] font-bold transition-all ${
                activeTab === item.name 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'text-muted hover:bg-surface-alt hover:text-txt'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="bg-surface-alt rounded-2xl p-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
              {user.username?.charAt(0) || user.email.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.875rem] font-bold text-txt truncate">{user.username}</p>
              <p className="text-[0.75rem] text-muted truncate">{user.role}</p>
            </div>
          </div>
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-[0.875rem] font-bold text-muted hover:text-red-500 hover:bg-red-500/5 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto p-10 scroll-smooth">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-[2rem] font-bold text-txt font-serif tracking-tight">{activeTab}</h1>
            <p className="text-muted mt-1">Manage your platform resources and settings.</p>
          </div>
          {activeTab !== 'Overview' && activeTab !== 'Settings' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New
            </button>
          )}
        </header>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Apps', value: stats.totalApps, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Total Users', value: stats.totalUsers, icon: UsersIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'Pending Submissions', value: stats.pendingSubmissions, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Total Blog Posts', value: stats.totalBlogPosts, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              ].map((stat, i) => (
                <div key={i} className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
                  <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-muted text-[0.875rem] font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[2rem] font-bold text-txt mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Apps' && (
          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-alt/50">
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">License</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {apps.map((app: any) => (
                  <tr key={app.id} className="hover:bg-surface-alt/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-txt">{app.name}</td>
                    <td className="px-6 py-4 text-muted text-[0.875rem]">{app.category?.name || 'Uncategorized'}</td>
                    <td className="px-6 py-4 text-muted text-[0.875rem]">{app.license}</td>
                    <td className="px-6 py-4">
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${app.isFeatured ? 'bg-accent' : 'bg-surface-alt'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${app.isFeatured ? 'left-[1.375rem]' : 'left-0.5'}`} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-faint hover:text-accent"><MoreVertical className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Users' && (
          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-alt/50">
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Avatar</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u: any) => (
                  <tr key={u.id} className="hover:bg-surface-alt/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-full bg-accentLight text-accent flex items-center justify-center font-bold border border-accent/10">
                        {u.username?.charAt(0) || u.email.charAt(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-txt">{u.username}</td>
                    <td className="px-6 py-4 text-muted text-[0.875rem]">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[0.7rem] font-black uppercase tracking-wider ${
                        u.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted text-[0.875rem]">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleResetPassword(u.email)} className="p-2 text-faint hover:text-accent transition-colors"><Mail className="w-4 h-4" /></button>
                        <button onClick={() => setEditingUser(u)} className="p-2 text-faint hover:text-blue-500 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setUserToDelete(u)} className="p-2 text-faint hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Blog' && (
          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-alt/50">
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-faint uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-surface-alt/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-txt">{post.title}</td>
                    <td className="px-6 py-4 text-muted text-[0.875rem]">{post.author}</td>
                    <td className="px-6 py-4 text-muted text-[0.875rem]">{new Date(post.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingPost(post)} className="p-2 text-faint hover:text-blue-500 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setPostToDelete(post)} className="p-2 text-faint hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="max-w-2xl bg-surface border border-border rounded-3xl p-8 shadow-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Site Name</label>
                <input type="text" defaultValue="AppShift" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Site Description</label>
                <textarea rows={3} defaultValue="Modern software discovery platform." className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Contact Email</label>
                <input type="email" defaultValue="hello@appshift.io" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <button type="button" className="btn-primary w-full h-12 shadow-lg shadow-accent/20">Save Changes</button>
            </form>
          </div>
        )}
      </main>

      {/* User Modals... (omitted for brevity in this replace call but should be kept) */}
      {/* (I'll re-include everything in the final code) */}

      {/* Blog Create Modal */}
      {(isModalOpen && activeTab === 'Blog') && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-txt/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 flex items-center justify-between border-b border-border">
              <h2 className="text-[1.5rem] font-bold text-txt font-serif">Create New Blog Post</h2>
              <button onClick={() => { setIsModalOpen(false); setImagePreview(null); }} className="p-2 hover:bg-surface-alt rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreatePost} className="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Title</label>
                  <input name="title" required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Slug</label>
                  <input name="slug" required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Author</label>
                  <input name="author" defaultValue={user.username} required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Date</label>
                  <input name="date" defaultValue={new Date().toISOString().split('T')[0]} required type="date" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Category</label>
                  <select name="category" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent appearance-none">
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="AI & LLM">AI & LLM</option>
                    <option value="Privacy">Privacy</option>
                    <option value="Design">Design</option>
                    <option value="Best Practices">Best Practices</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Hero Image</label>
                  <div className="flex flex-col gap-3">
                    <input 
                      name="heroImage" 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-[0.875rem] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[0.75rem] file:font-bold file:bg-accentLight file:text-accent hover:file:bg-accent hover:file:text-white transition-all" 
                    />
                    {imagePreview && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-surface-alt">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 p-1.5 bg-bg/80 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Excerpt</label>
                <textarea name="excerpt" required rows={2} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Content (HTML allowed)</label>
                <textarea name="content" required rows={6} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent font-mono text-[0.875rem]" />
              </div>
              <button disabled={isPending} className="btn-primary w-full h-12 shadow-lg shadow-accent/20 mt-4 flex items-center justify-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blog Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-txt/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 flex items-center justify-between border-b border-border">
              <h2 className="text-[1.5rem] font-bold text-txt font-serif">Edit Blog Post</h2>
              <button onClick={() => { setEditingPost(null); setImagePreview(null); }} className="p-2 hover:bg-surface-alt rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdatePost} className="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Title</label>
                  <input name="title" defaultValue={editingPost.title} required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Slug</label>
                  <input name="slug" defaultValue={editingPost.slug} required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Author</label>
                  <input name="author" defaultValue={editingPost.author} required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Date</label>
                  <input name="date" defaultValue={new Date(editingPost.date).toISOString().split('T')[0]} required type="date" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Category</label>
                  <select name="category" defaultValue={editingPost.category} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent appearance-none">
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="AI & LLM">AI & LLM</option>
                    <option value="Privacy">Privacy</option>
                    <option value="Design">Design</option>
                    <option value="Best Practices">Best Practices</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Hero Image</label>
                  <div className="flex flex-col gap-3">
                    <input 
                      name="heroImage" 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent text-[0.875rem] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[0.75rem] file:font-bold file:bg-accentLight file:text-accent hover:file:bg-accent hover:file:text-white transition-all" 
                    />
                    {(imagePreview || editingPost.heroImage?.url) && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-surface-alt">
                        <img src={imagePreview || editingPost.heroImage?.url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Excerpt</label>
                <textarea name="excerpt" defaultValue={editingPost.excerpt} required rows={2} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Content (HTML allowed)</label>
                <textarea name="content" defaultValue={editingPost.content} required rows={6} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent font-mono text-[0.875rem]" />
              </div>
              <button disabled={isPending} className="btn-primary w-full h-12 shadow-lg shadow-accent/20 mt-4 flex items-center justify-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blog Delete Confirm Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-txt/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-surface border border-border rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            <h2 className="text-[1.5rem] font-bold text-txt font-serif mb-2">Delete Post?</h2>
            <p className="text-muted mb-8 leading-relaxed">Are you sure you want to delete <span className="font-bold text-txt">{postToDelete.title}</span>? This action is permanent.</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setPostToDelete(null)} className="h-12 rounded-xl bg-surface-alt font-bold text-txt hover:bg-border transition-colors">Cancel</button>
              <button onClick={handleDeletePost} disabled={isPending} className="h-12 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Re-include User Modals... */}
      {isModalOpen && activeTab === 'Users' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-txt/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-surface border border-border rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 flex items-center justify-between border-b border-border">
              <h2 className="text-[1.5rem] font-bold text-txt font-serif">Create New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-alt rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateUser} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Username</label>
                <input name="username" required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Email Address</label>
                <input name="email" required type="email" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Role</label>
                <select name="role" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent appearance-none">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Password</label>
                  <input name="password" required type="password" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Confirm</label>
                  <input name="confirmPassword" required type="password" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
                </div>
              </div>
              <button disabled={isPending} className="btn-primary w-full h-12 shadow-lg shadow-accent/20 mt-4 flex items-center justify-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Save User
              </button>
            </form>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-txt/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-surface border border-border rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 flex items-center justify-between border-b border-border">
              <h2 className="text-[1.5rem] font-bold text-txt font-serif">Edit User</h2>
              <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-surface-alt rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Username</label>
                <input name="username" defaultValue={editingUser.username} required type="text" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Email Address</label>
                <input name="email" defaultValue={editingUser.email} required type="email" className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-bold text-txt uppercase tracking-widest ml-1">Role</label>
                <select name="role" defaultValue={editingUser.role} className="w-full bg-bg border border-border rounded-xl px-4 py-3 outline-none focus:border-accent appearance-none">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button disabled={isPending} className="btn-primary w-full h-12 shadow-lg shadow-accent/20 mt-4 flex items-center justify-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {userToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-txt/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-surface border border-border rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            <h2 className="text-[1.5rem] font-bold text-txt font-serif mb-2">Delete User?</h2>
            <p className="text-muted mb-8 leading-relaxed">Are you sure you want to delete <span className="font-bold text-txt">{userToDelete.username}</span>? This action is permanent.</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setUserToDelete(null)} className="h-12 rounded-xl bg-surface-alt font-bold text-txt hover:bg-border transition-colors">Cancel</button>
              <button onClick={handleDeleteUser} disabled={isPending} className="h-12 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
