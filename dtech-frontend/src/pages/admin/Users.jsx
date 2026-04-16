import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import FormField, { Input, Select } from '../../components/admin/FormField';
import { usersService } from '../../services/crudService';
import { useAuth } from '../../context/AuthContext';
import { MdAdd, MdEdit, MdDelete, MdPerson } from 'react-icons/md';
import toast from 'react-hot-toast';

const EMPTY = { username: '', email: '', password: '', role: 'admin' };

const Users = () => {
  const { user: currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await usersService.getAll();
      setData(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  const openEdit = (row) => {
    setSelected(row);
    setForm({ username: row.username, email: row.email, password: '', role: row.role });
    setModal('edit');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      constpayload = { username: form.username, email: form.email, role: form.role };
      if (form.password) payload.password = form.password;
      
      if (modal === 'create') {
        await usersService.create(payload);
        toast.success('User berhasil ditambahkan');
      } else {
        await usersService.update(selected.id, payload);
        toast.success('User berhasil diperbarui');
      }
      setModal(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan user');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await usersService.remove(deleteId);
      toast.success('User berhasil dihapus');
      setDeleteId(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menghapus user');
    } finally {
      setDeleting(false);
    }
  };

  const cols = [
    { key: 'username', label: 'Nama', render: v => <span className="font-medium text-white">{v}</span> },
    { key: 'email', label: 'Email', render: v => <span className="text-gray-400">{v}</span> },
    { key: 'role', label: 'Role', render: v => (
      <span className={`text-xs px-2 py-0.5 rounded-full ${v === 'superadmin' ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'}`}>
        {v}
      </span>
    ) },
    { key: 'created_at', label: 'Dibuat', render: v => <span className="text-gray-500 text-sm">{v ? new Date(v).toLocaleDateString('id-ID') : '-'}</span> },
    { key: 'id', label: 'Aksi', render: (_, row) => (
      <div className="flex gap-1">
        <button onClick={() => openEdit(row)} className="p-1.5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 rounded transition-colors" title="Edit"><MdEdit size={16} /></button>
        {row.id !== currentUser?.id && (
          <button onClick={() => setDeleteId(row.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded transition-colors" title="Hapus"><MdDelete size={16} /></button>
        )}
      </div>
    )},
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Users" subtitle={`${data.length} user terdaftar`}
          action={<button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"><MdAdd size={18}/> Tambah User</button>} />
        <div className="bg-[#161b27] border border-[#2a3348] rounded-xl">
          <DataTable columns={cols} data={data} loading={loading} />
        </div>
      </div>

      <Modal open={modal === 'create' || modal === 'edit'} onClose={() => setModal(null)} title={modal === 'create' ? 'Tambah User' : 'Edit User'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Username" required>
            <Input value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))} required />
          </FormField>
          <FormField label="Email" required>
            <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          </FormField>
          <FormField label={modal === 'create' ? 'Password' : 'Password Baru'} hint={modal === 'edit' ? 'Kosongkan jika tidak ingin mengubah' : null}>
            <Input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
          </FormField>
          <FormField label="Role" required>
            <Select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </Select>
          </FormField>
          <div className="flex gap-3 justify-end pt-2 border-t border-[#2a3348]">
            <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-400 border border-[#2a3348] rounded-lg hover:border-gray-500 transition-colors">Batal</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors">{saving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} message="Yakin ingin menghapus user ini?" />
    </AdminLayout>
  );
};
export default Users;