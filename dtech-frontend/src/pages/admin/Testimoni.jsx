import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Textarea, Select, ImageUpload, Toggle } from '../../components/admin/FormField';
import useCrud from '../../hooks/useCrud';
import { testimoniService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete, MdStar } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';

const EMPTY = { name: '', company: '', position: '', message: '', rating: 5, is_visible: true };

const Testimoni = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(testimoniService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const openCreate = () => { setForm(EMPTY); setPhoto(null); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ name: row.name, company: row.company || '', position: row.position || '', message: row.message, rating: row.rating, is_visible: !!row.is_visible });
    setPhoto(row.photo_url);
    setModal('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo instanceof File) fd.append('photo', photo);
    const ok = modal === 'create' ? await create(fd) : await update(selected.id, fd);
    if (ok) setModal(null);
  };

  const cols = [
    { key: 'photo_url', label: '', render: v => v ? <img src={`${import.meta.env.VITE_UPLOADS_URL || ''}${v}`} className="w-10 h-10 object-cover rounded-full" /> : <div className="w-10 h-10 bg-[#2a3348] rounded-full" /> },
    { key: 'name', label: 'Nama' },
    { key: 'company', label: 'Perusahaan' },
    { key: 'rating', label: 'Rating', render: v => <div className="flex items-center gap-1"><MdStar className="text-yellow-400" size={14}/><span>{v}/5</span></div> },
    { key: 'is_visible', label: 'Visible', render: v => v ? <span className="text-green-400 text-xs">✓</span> : <span className="text-gray-500 text-xs">—</span> },
    { key: 'id', label: 'Aksi', render: (_, row) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded"><MdEdit size={16}/></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded"><MdDelete size={16}/></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Testimoni" subtitle={`${data.length} testimoni`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Testimoni' : 'Edit Testimoni'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nama" required><Input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required /></FormField>
            <FormField label="Perusahaan"><Input value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} /></FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Jabatan"><Input value={form.position} onChange={e => setForm(p => ({...p, position: e.target.value}))} /></FormField>
            <FormField label="Rating">
              <Select value={form.rating} onChange={e => setForm(p => ({...p, rating: Number(e.target.value)}))}>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Bintang</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Isi Testimoni" required><Textarea rows={4} value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} required /></FormField>
          <ImageUpload label="Foto Client" value={photo} onChange={setPhoto} />
          <Toggle label="Tampilkan di website" checked={form.is_visible} onChange={v => setForm(p => ({...p, is_visible: v}))} />
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
export default Testimoni;
