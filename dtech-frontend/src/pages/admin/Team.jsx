import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Textarea, Select, ImageUpload } from '../../components/admin/FormField';
import StatusBadge from '../../components/admin/StatusBadge';
import useCrud from '../../hooks/useCrud';
import { teamService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';

const EMPTY = { name: '', position: '', division: '', bio: '', email: '', linkedin_url: '', status: 'active', sort_order: 0 };

const Team = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(teamService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const openCreate = () => { setForm(EMPTY); setPhoto(null); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ name: row.name, position: row.position||'', division: row.division||'', bio: row.bio||'', email: row.email||'', linkedin_url: row.linkedin_url||'', status: row.status, sort_order: row.sort_order||0 });
    setPhoto(row.photo_url);
    setModal('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    if (photo instanceof File) fd.append('photo', photo);
    const ok = modal === 'create' ? await create(fd) : await update(selected.id, fd);
    if (ok) setModal(null);
  };

  const cols = [
    { key: 'photo_url', label: '', render: v => v ? <img src={`${import.meta.env.VITE_UPLOADS_URL||''}${v}`} className="w-10 h-10 object-cover rounded-full" /> : <div className="w-10 h-10 bg-[#2a3348] rounded-full" /> },
    { key: 'name', label: 'Nama' },
    { key: 'position', label: 'Jabatan' },
    { key: 'division', label: 'Divisi' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
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
        <PageHeader title="Team" subtitle={`${data.length} anggota`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Anggota' : 'Edit Anggota'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nama" required><Input value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} required /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Jabatan"><Input value={form.position} onChange={e => setForm(p=>({...p,position:e.target.value}))} /></FormField>
            <FormField label="Divisi"><Input value={form.division} onChange={e => setForm(p=>({...p,division:e.target.value}))} /></FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Email"><Input type="email" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} /></FormField>
            <FormField label="LinkedIn URL"><Input value={form.linkedin_url} onChange={e => setForm(p=>({...p,linkedin_url:e.target.value}))} /></FormField>
          </div>
          <FormField label="Bio"><Textarea rows={3} value={form.bio} onChange={e => setForm(p=>({...p,bio:e.target.value}))} /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Status"><Select value={form.status} onChange={e => setForm(p=>({...p,status:e.target.value}))}><option value="active">Active</option><option value="inactive">Inactive</option></Select></FormField>
            <FormField label="Sort Order"><Input type="number" value={form.sort_order} onChange={e => setForm(p=>({...p,sort_order:e.target.value}))} /></FormField>
          </div>
          <ImageUpload label="Foto" value={photo} onChange={setPhoto} />
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
export default Team;
