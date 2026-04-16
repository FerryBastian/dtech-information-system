import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Textarea, Select, ImageUpload } from '../../components/admin/FormField';
import StatusBadge from '../../components/admin/StatusBadge';
import RichEditor from '../../components/admin/RichEditor';
import useCrud from '../../hooks/useCrud';
import { servicesService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';

const EMPTY = { title: '', description: '', short_desc: '', status: 'active', sort_order: 0 };

const Services = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(servicesService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState(null);
  const [items, setItems] = useState(['']);
  const [deleteId, setDeleteId] = useState(null);

  const openCreate = () => { setForm(EMPTY); setImage(null); setItems(['']); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ title: row.title, description: row.description || '', short_desc: row.short_desc || '', status: row.status, sort_order: row.sort_order || 0 });
    setImage(row.image_url);
    setItems(row.items?.map(i => i.item_text) || ['']);
    setModal('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    items.filter(Boolean).forEach(item => fd.append('items[]', item));
    if (image instanceof File) fd.append('image', image);
    const ok = modal === 'create' ? await create(fd) : await update(selected.id, fd);
    if (ok) setModal(null);
  };

  const cols = [
    { key: 'image_url', label: '', render: v => v ? <img src={getImageUrl(v)} className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-[#2a3348] rounded-lg" /> },
    { key: 'title', label: 'Nama Service', render: v => <span className="font-medium text-white">{v}</span> },
    { key: 'items', label: 'Items', render: v => <span className="text-xs bg-[#2a3348] px-2 py-0.5 rounded-full">{v?.length || 0} item</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'id', label: 'Aksi', render: (_, row) => (
      <div className="flex gap-1">
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded transition-colors"><MdEdit size={16}/></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded transition-colors"><MdDelete size={16}/></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Services" subtitle={`${data.length} service tersedia`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah Service</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Service' : 'Edit Service'} size="xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Judul Service" required>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
          </FormField>
          <FormField label="Deskripsi Singkat" hint="Ditampilkan di card service">
            <Textarea rows={2} value={form.short_desc} onChange={e => setForm(p => ({ ...p, short_desc: e.target.value }))} />
          </FormField>
          <FormField label="Deskripsi Lengkap" hint="Mendukung format teks (bold, list, dll)">
            <RichEditor value={form.description} onChange={v => setForm(p => ({ ...p, description: v }))} placeholder="Tulis deskripsi service lengkap..." />
          </FormField>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Service Items (Bullet Points)</label>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={item} onChange={e => { const n = [...items]; n[i] = e.target.value; setItems(n); }} placeholder={`Item ${i + 1}`} />
                  {items.length > 1 && (
                    <button type="button" onClick={() => setItems(items.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded transition-colors"><MdDelete size={16}/></button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setItems([...items, ''])} className="text-blue-400 text-xs flex items-center gap-1 mt-2 hover:text-blue-300 transition-colors">
              <MdAdd size={14}/> Tambah Item
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Status">
              <Select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </Select>
            </FormField>
            <FormField label="Sort Order">
              <Input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))} />
            </FormField>
          </div>
          <ImageUpload value={image} onChange={setImage} />
          <div className="flex gap-3 justify-end pt-2 border-t border-[#2a3348]">
            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-400 border border-[#2a3348] rounded-lg hover:border-gray-500 transition-colors">Batal</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors">{saving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await remove(deleteId); setDeleteId(null); }} loading={deleting} />
    </AdminLayout>
  );
};
export default Services;
