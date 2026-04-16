import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Select, ImageUpload } from '../../components/admin/FormField';
import StatusBadge from '../../components/admin/StatusBadge';
import useCrud from '../../hooks/useCrud';
import { newsService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete, MdOpenInNew } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';
import { formatDateShort } from '../../utils/helpers';

const EMPTY = { title: '', source: '', url: '', published_at: '', status: 'active' };

const News = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(newsService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const openCreate = () => { setForm(EMPTY); setImage(null); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ title: row.title, source: row.source||'', url: row.url||'', published_at: row.published_at?.split('T')[0]||'', status: row.status });
    setImage(row.image_url);
    setModal('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    if (image instanceof File) fd.append('image', image);
    const ok = modal === 'create' ? await create(fd) : await update(selected.id, fd);
    if (ok) setModal(null);
  };

  const cols = [
    { key: 'image_url', label: '', render: v => v ? <img src={`${import.meta.env.VITE_UPLOADS_URL||''}${v}`} className="w-14 h-10 object-cover rounded" /> : <div className="w-14 h-10 bg-[#2a3348] rounded" /> },
    { key: 'title', label: 'Judul', render: v => <span className="line-clamp-2 text-xs">{v}</span> },
    { key: 'source', label: 'Sumber' },
    { key: 'published_at', label: 'Tanggal', render: v => formatDateShort(v) },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'id', label: 'Aksi', render: (_,row) => (
      <div className="flex gap-2">
        {row.url && <a href={row.url} target="_blank" rel="noreferrer" className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-600/10 rounded"><MdOpenInNew size={16}/></a>}
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded"><MdEdit size={16}/></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded"><MdDelete size={16}/></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="News" subtitle={`${data.length} berita`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Berita' : 'Edit Berita'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Judul" required><Input value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Sumber Media"><Input value={form.source} onChange={e => setForm(p=>({...p,source:e.target.value}))} placeholder="Kompas, CNN Indonesia..." /></FormField>
            <FormField label="Tanggal Publish"><Input type="date" value={form.published_at} onChange={e => setForm(p=>({...p,published_at:e.target.value}))} /></FormField>
          </div>
          <FormField label="URL Artikel"><Input value={form.url} onChange={e => setForm(p=>({...p,url:e.target.value}))} placeholder="https://..." /></FormField>
          <FormField label="Status"><Select value={form.status} onChange={e => setForm(p=>({...p,status:e.target.value}))}><option value="active">Active</option><option value="draft">Draft</option></Select></FormField>
          <ImageUpload label="Thumbnail" value={image} onChange={setImage} />
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-400 border border-[#2a3348] rounded-lg">Batal</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg">{saving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await remove(deleteId); setDeleteId(null); }} loading={deleting} />
    </AdminLayout>
  );
};
export default News;
