import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Textarea, Select, ImageUpload, Toggle } from '../../components/admin/FormField';
import StatusBadge from '../../components/admin/StatusBadge';
import useCrud from '../../hooks/useCrud';
import { portfolioService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete, MdImage } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';
import toast from 'react-hot-toast';

const EMPTY = { title: '', category: '', description: '', year: '', is_featured: false, status: 'active', sort_order: 0 };

const Portfolio = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(portfolioService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  const openCreate = () => { setForm(EMPTY); setImage(null); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ title: row.title, category: row.category || '', description: row.description || '', year: row.year || '', is_featured: !!row.is_featured, status: row.status, sort_order: row.sort_order || 0 });
    setImage(row.image_url);
    setModal('edit');
  };
  const openImages = async (row) => {
    setSelected(row);
    const res = await portfolioService.getById(row.id);
    setDetail(res.data);
    setModal('images');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image instanceof File) fd.append('image', image);
    const ok = modal === 'create' ? await create(fd) : await update(selected.id, fd);
    if (ok) setModal(null);
  };

  const handleAddImage = async () => {
    if (!imgFile) return;
    setImgLoading(true);
    try {
      const fd = new FormData(); fd.append('image', imgFile);
      await portfolioService.addImage(selected.id, fd);
      toast.success('Gambar ditambahkan');
      const res = await portfolioService.getById(selected.id);
      setDetail(res.data); setImgFile(null);
    } catch { toast.error('Gagal upload'); } finally { setImgLoading(false); }
  };

  const handleRemoveImage = async (imgId) => {
    try {
      await portfolioService.removeImage(imgId);
      toast.success('Gambar dihapus');
      const res = await portfolioService.getById(selected.id);
      setDetail(res.data);
    } catch { toast.error('Gagal hapus'); }
  };

  const cols = [
    { key: 'image_url', label: '', render: v => v ? <img src={getImageUrl(v)} className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-[#2a3348] rounded-lg" /> },
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori' },
    { key: 'year', label: 'Tahun' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'id', label: 'Aksi', render: (_, row) => (
      <div className="flex gap-2">
        <button onClick={() => openImages(row)} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-600/10 rounded"><MdImage size={16}/></button>
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded"><MdEdit size={16}/></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded"><MdDelete size={16}/></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Portfolio" subtitle={`${data.length} item`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>

      <Modal open={modal === 'create' || modal === 'edit'} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Portfolio' : 'Edit Portfolio'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Judul" required><Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Kategori"><Input value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} /></FormField>
            <FormField label="Tahun"><Input type="number" value={form.year} onChange={e => setForm(p => ({...p, year: e.target.value}))} placeholder="2024" /></FormField>
          </div>
          <FormField label="Deskripsi"><Textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Status"><Select value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}><option value="active">Active</option><option value="draft">Draft</option></Select></FormField>
            <FormField label="Sort Order"><Input type="number" value={form.sort_order} onChange={e => setForm(p => ({...p, sort_order: e.target.value}))} /></FormField>
          </div>
          <ImageUpload label="Thumbnail" value={image} onChange={setImage} />
          <Toggle label="Tampilkan di Homepage" checked={form.is_featured} onChange={v => setForm(p => ({...p, is_featured: v}))} />
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-400 border border-[#2a3348] rounded-lg">Batal</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg">{saving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal === 'images'} onClose={() => setModal(null)} title={`Gallery — ${selected?.title}`} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {(detail?.images || []).map(img => (
              <div key={img.id} className="relative group">
                <img src={getImageUrl(img.image_url)} className="w-full h-28 object-cover rounded-lg border border-[#2a3348]" />
                <button onClick={() => handleRemoveImage(img.id)} className="absolute top-1 right-1 bg-red-600 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><MdDelete size={14}/></button>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2a3348] pt-4">
            <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Tambah Gambar</p>
            <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-blue-600/20 file:text-blue-400 cursor-pointer mb-3" />
            <button onClick={handleAddImage} disabled={!imgFile || imgLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg">{imgLoading ? 'Mengupload...' : 'Upload'}</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await remove(deleteId); setDeleteId(null); }} loading={deleting} />
    </AdminLayout>
  );
};

export default Portfolio;
