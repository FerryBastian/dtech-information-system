import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Textarea, Select, ImageUpload } from '../../components/admin/FormField';
import StatusBadge from '../../components/admin/StatusBadge';
import useCrud from '../../hooks/useCrud';
import { certificatesService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';
import { formatDate } from '../../utils/helpers';

const EMPTY = { title: '', type: 'patent', description: '', issued_by: '', issued_date: '', status: 'active', sort_order: 0 };

const Certificates = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(certificatesService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState('all');

  const openCreate = () => { setForm(EMPTY); setImage(null); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ title: row.title, type: row.type, description: row.description||'', issued_by: row.issued_by||'', issued_date: row.issued_date?.split('T')[0]||'', status: row.status, sort_order: row.sort_order||0 });
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

  const filtered = filter === 'all' ? data : data.filter(d => d.type === filter);

  const cols = [
    { key: 'image_url', label: '', render: v => v ? <img src={`${import.meta.env.VITE_UPLOADS_URL||''}${v}`} className="w-10 h-14 object-cover rounded" /> : <div className="w-10 h-14 bg-[#2a3348] rounded" /> },
    { key: 'title', label: 'Judul', render: v => <span className="line-clamp-2 text-xs">{v}</span> },
    { key: 'type', label: 'Tipe', render: v => <StatusBadge status={v} /> },
    { key: 'issued_by', label: 'Diterbitkan oleh' },
    { key: 'issued_date', label: 'Tanggal', render: v => formatDate(v) },
    { key: 'id', label: 'Aksi', render: (_,row) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded"><MdEdit size={16}/></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded"><MdDelete size={16}/></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Certificates" subtitle={`${data.length} sertifikat`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah</button>} />
        <div className="flex gap-2 mb-4">
          {['all','patent','legality'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-lg font-semibold capitalize transition-colors ${filter===f ? 'bg-blue-600 text-white' : 'bg-[#1e2535] text-gray-400 hover:text-white'}`}>{f === 'all' ? 'Semua' : f}</button>
          ))}
        </div>
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={filtered} loading={loading} />
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Sertifikat' : 'Edit Sertifikat'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Judul" required><Input value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipe">
              <Select value={form.type} onChange={e => setForm(p=>({...p,type:e.target.value}))}>
                <option value="patent">Patent</option>
                <option value="legality">Legality</option>
              </Select>
            </FormField>
            <FormField label="Tanggal Terbit"><Input type="date" value={form.issued_date} onChange={e => setForm(p=>({...p,issued_date:e.target.value}))} /></FormField>
          </div>
          <FormField label="Diterbitkan oleh"><Input value={form.issued_by} onChange={e => setForm(p=>({...p,issued_by:e.target.value}))} /></FormField>
          <FormField label="Deskripsi"><Textarea rows={2} value={form.description} onChange={e => setForm(p=>({...p,description:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Status"><Select value={form.status} onChange={e => setForm(p=>({...p,status:e.target.value}))}><option value="active">Active</option><option value="draft">Draft</option></Select></FormField>
            <FormField label="Sort Order"><Input type="number" value={form.sort_order} onChange={e => setForm(p=>({...p,sort_order:e.target.value}))} /></FormField>
          </div>
          <ImageUpload label="Gambar Sertifikat" value={image} onChange={setImage} />
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
export default Certificates;
