import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Textarea, Select, ImageUpload, Toggle } from '../../components/admin/FormField';
import StatusBadge from '../../components/admin/StatusBadge';
import RichEditor from '../../components/admin/RichEditor';
import useCrud from '../../hooks/useCrud';
import { achievementsService } from '../../services/crudService';
import { MdAdd, MdEdit, MdDelete, MdImage, MdComputer } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';
import toast from 'react-hot-toast';

const EMPTY = { title: '', subtitle: '', description: '', about_project: '', complex_challenges: '', industry_challenges: '', global_recognition_text: '', global_recognition_image: '', award_by: '', year: '', is_featured: false, status: 'active', sort_order: 0 };

const Achievements = () => {
  const { data, loading, saving, deleting, create, update, remove } = useCrud(achievementsService);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [techForm, setTechForm] = useState({ name: '', description: '' });
  const [techImg, setTechImg] = useState(null);
  const [techLoading, setTechLoading] = useState(false);

  const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const openCreate = () => { setForm(EMPTY); setImage(null); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ title: row.title, subtitle: row.subtitle||'', description: row.description||'', about_project: row.about_project||'', complex_challenges: row.complex_challenges||'', industry_challenges: row.industry_challenges||'', global_recognition_text: row.global_recognition_text||'', global_recognition_image: row.global_recognition_image||'', award_by: row.award_by||'', year: row.year||'', is_featured: !!row.is_featured, status: row.status, sort_order: row.sort_order||0 });
    setImage(row.image_url);
    setModal('edit');
  };
  const openDetail = async (row, tab) => {
    setSelected(row);
    const res = await achievementsService.getById(row.id);
    setDetail(res.data);
    setModal(tab);
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
      await achievementsService.addImage(selected.id, fd);
      toast.success('Gambar ditambahkan');
      const res = await achievementsService.getById(selected.id);
      setDetail(res.data); setImgFile(null);
    } catch { toast.error('Gagal upload'); } finally { setImgLoading(false); }
  };

  const handleAddTech = async (e) => {
    e.preventDefault();
    setTechLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', techForm.name);
      fd.append('description', techForm.description);
      if (techImg instanceof File) fd.append('image', techImg);
      await achievementsService.addTechnology(selected.id, fd);
      toast.success('Teknologi ditambahkan');
      const res = await achievementsService.getById(selected.id);
      setDetail(res.data);
      setTechForm({ name: '', description: '' }); setTechImg(null);
    } catch { toast.error('Gagal tambah teknologi'); } finally { setTechLoading(false); }
  };

  const cols = [
    { key: 'image_url', label: '', render: v => v ? <img src={getImageUrl(v)} className="w-10 h-10 object-cover rounded-lg" /> : <div className="w-10 h-10 bg-[#2a3348] rounded-lg" /> },
    { key: 'title', label: 'Judul', render: v => <span className="line-clamp-1 font-medium text-white">{v}</span> },
    { key: 'award_by', label: 'Penyelenggara' },
    { key: 'year', label: 'Tahun' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'id', label: 'Aksi', render: (_, row) => (
      <div className="flex gap-1">
        <button onClick={() => openDetail(row, 'images')} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-600/10 rounded transition-colors" title="Gallery"><MdImage size={16}/></button>
        <button onClick={() => openDetail(row, 'tech')} className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-600/10 rounded transition-colors" title="Technologies"><MdComputer size={16}/></button>
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded transition-colors"><MdEdit size={16}/></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded transition-colors"><MdDelete size={16}/></button>
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Global Achievements" subtitle={`${data.length} achievement`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>

      <Modal open={modal === 'create' || modal === 'edit'} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah Achievement' : 'Edit Achievement'} size="xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Judul" required><Input value={form.title} onChange={f('title')} required /></FormField>
          <FormField label="Subtitle" hint="Contoh: Attended by 47 of the best research institutions worldwide"><Input value={form.subtitle} onChange={f('subtitle')} /></FormField>
          <FormField label="Deskripsi Singkat"><Textarea rows={2} value={form.description} onChange={f('description')} /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Diselenggarakan oleh"><Input value={form.award_by} onChange={f('award_by')} /></FormField>
            <FormField label="Tahun"><Input type="number" value={form.year} onChange={f('year')} /></FormField>
          </div>
          <FormField label="About the Project" hint="Mendukung format teks">
            <RichEditor value={form.about_project} onChange={v => setForm(p => ({ ...p, about_project: v }))} placeholder="Ceritakan tentang proyek ini..." />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Complex Challenges"><Textarea rows={3} value={form.complex_challenges} onChange={f('complex_challenges')} /></FormField>
            <FormField label="Industry Challenges"><Textarea rows={3} value={form.industry_challenges} onChange={f('industry_challenges')} /></FormField>
          </div>
          <FormField label="Global Recognition Text"><Textarea rows={3} value={form.global_recognition_text} onChange={f('global_recognition_text')} /></FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Status"><Select value={form.status} onChange={f('status')}><option value="active">Active</option><option value="draft">Draft</option></Select></FormField>
            <FormField label="Sort Order"><Input type="number" value={form.sort_order} onChange={f('sort_order')} /></FormField>
          </div>
          <ImageUpload label="Thumbnail" value={image} onChange={setImage} />
          <Toggle label="Tampilkan di Homepage" checked={form.is_featured} onChange={v => setForm(p => ({ ...p, is_featured: v }))} />
          <div className="flex gap-3 justify-end pt-2 border-t border-[#2a3348]">
            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-400 border border-[#2a3348] rounded-lg hover:border-gray-500 transition-colors">Batal</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors">{saving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal === 'images'} onClose={() => setModal(null)} title={`Hero Images — ${selected?.title}`} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {(detail?.images || []).length === 0 && <div className="col-span-3 text-center py-8 text-gray-500 text-sm">Belum ada gambar</div>}
            {(detail?.images || []).map(img => (
              <div key={img.id} className="relative group">
                <img src={getImageUrl(img.image_url)} className="w-full h-28 object-cover rounded-lg border border-[#2a3348]" />
                <button onClick={async () => { await achievementsService.removeImage(img.id); toast.success('Dihapus'); const res = await achievementsService.getById(selected.id); setDetail(res.data); }} className="absolute top-1 right-1 bg-red-600 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><MdDelete size={14}/></button>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2a3348] pt-4">
            <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-blue-600/20 file:text-blue-400 cursor-pointer mb-3" />
            <button onClick={handleAddImage} disabled={!imgFile || imgLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors">{imgLoading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </div>
      </Modal>

      <Modal open={modal === 'tech'} onClose={() => setModal(null)} title={`Technologies — ${selected?.title}`} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(detail?.technologies || []).length === 0 && <div className="col-span-2 text-center py-6 text-gray-500 text-sm">Belum ada teknologi</div>}
            {(detail?.technologies || []).map(tech => (
              <div key={tech.id} className="bg-[#1e2535] border border-[#2a3348] rounded-lg p-3 relative group">
                {tech.image_url && <img src={getImageUrl(tech.image_url)} className="w-full h-24 object-cover rounded mb-2" />}
                <p className="text-white text-sm font-semibold">{tech.name}</p>
                <p className="text-gray-400 text-xs mt-1">{tech.description}</p>
                <button onClick={async () => { await achievementsService.removeTechnology(tech.id); toast.success('Dihapus'); const res = await achievementsService.getById(selected.id); setDetail(res.data); }} className="absolute top-2 right-2 bg-red-600 text-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><MdDelete size={14}/></button>
              </div>
            ))}
          </div>
          <div className="border-t border-[#2a3348] pt-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Tambah Teknologi</p>
            <form onSubmit={handleAddTech} className="space-y-3">
              <FormField label="Nama Teknologi"><Input value={techForm.name} onChange={e => setTechForm(p => ({ ...p, name: e.target.value }))} required /></FormField>
              <FormField label="Deskripsi"><Textarea rows={2} value={techForm.description} onChange={e => setTechForm(p => ({ ...p, description: e.target.value }))} /></FormField>
              <ImageUpload label="Gambar" value={techImg} onChange={setTechImg} />
              <button type="submit" disabled={techLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors">{techLoading ? 'Menyimpan...' : 'Tambah'}</button>
            </form>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await remove(deleteId); setDeleteId(null); }} loading={deleting} />
    </AdminLayout>
  );
};
export default Achievements;
