import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PageHeader from '../../components/admin/PageHeader';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { contactService } from '../../services/crudService';
import { MdEmail, MdDrafts, MdDelete, MdBusiness, MdPhone } from 'react-icons/md';
import { getImageUrl } from '../../utils/helpers';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const Contact = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try { const res = await contactService.getAll(); setData(res.data || []); }
    catch { toast.error('Gagal memuat pesan'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const markRead = async (id) => {
    try {
      await contactService.markRead(id);
      setData(prev => prev.map(m => m.id === id ? { ...m, is_read: 1 } : m));
    } catch { toast.error('Gagal update'); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await contactService.remove(deleteId); toast.success('Pesan dihapus'); fetchAll(); setDeleteId(null); }
    catch { toast.error('Gagal hapus'); }
    finally { setDeleting(false); }
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.is_read) markRead(msg.id);
  };

  const unread = data.filter(m => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader title="Contact Messages" subtitle={`${data.length} pesan${unread > 0 ? ` • ${unread} belum dibaca` : ''}`} />

        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/></div>
        ) : data.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">Belum ada pesan masuk</div>
        ) : (
          <div className="space-y-2">
            {data.map(msg => (
              <div key={msg.id} onClick={() => openMessage(msg)}
                className={`bg-[#161b27] border rounded-xl p-4 cursor-pointer hover:border-blue-500/50 transition-colors ${!msg.is_read ? 'border-blue-500/40 bg-blue-600/5' : 'border-[#2a3348]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!msg.is_read ? 'bg-blue-600/30 text-blue-400' : 'bg-[#2a3348] text-gray-400'}`}>
                      {!msg.is_read ? <MdEmail size={16}/> : <MdDrafts size={16}/>}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold truncate ${!msg.is_read ? 'text-white' : 'text-gray-300'}`}>{msg.name}</p>
                        {!msg.is_read && <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">Baru</span>}
                      </div>
                      <p className="text-gray-400 text-xs truncate">{msg.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-gray-500 text-xs">{formatDate(msg.created_at)}</span>
                    <button onClick={e => { e.stopPropagation(); setDeleteId(msg.id); }} className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors">
                      <MdDelete size={14}/>
                    </button>
                  </div>
                </div>
                {msg.subject && <p className="text-gray-300 text-xs mt-2 font-medium">{msg.subject}</p>}
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detail Pesan" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nama</p>
                <p className="text-white text-sm font-semibold">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${selected.email}`} className="text-blue-400 text-sm hover:underline">{selected.email}</a>
              </div>
              {selected.company && <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Perusahaan</p>
                <p className="text-gray-300 text-sm flex items-center gap-1"><MdBusiness size={14}/>{selected.company}</p>
              </div>}
              {selected.phone && <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Telepon</p>
                <p className="text-gray-300 text-sm flex items-center gap-1"><MdPhone size={14}/>{selected.phone}</p>
              </div>}
              {selected.subject && <div className="col-span-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Subjek</p>
                <p className="text-gray-300 text-sm">{selected.subject}</p>
              </div>}
            </div>
            <div className="border-t border-[#2a3348] pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Pesan</p>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#2a3348]">
              <p className="text-gray-500 text-xs">{formatDate(selected.created_at)}</p>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Pesan Anda'}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                <MdEmail size={14}/> Balas Email
              </a>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} message="Pesan ini akan dihapus permanen." />
    </AdminLayout>
  );
};
export default Contact;
