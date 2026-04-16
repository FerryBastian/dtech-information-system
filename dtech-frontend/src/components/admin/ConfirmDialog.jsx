import Modal from './Modal';

const ConfirmDialog = ({ open, onClose, onConfirm, title = 'Hapus Data', message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.', loading }) => (
  <Modal open={open} onClose={onClose} title={title} size="sm">
    <p className="text-gray-400 text-sm mb-6">{message}</p>
    <div className="flex gap-3 justify-end">
      <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-[#2a3348] rounded-lg hover:border-gray-500 transition-colors">
        Batal
      </button>
      <button onClick={onConfirm} disabled={loading}
        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors">
        {loading ? 'Menghapus...' : 'Hapus'}
      </button>
    </div>
  </Modal>
);
export default ConfirmDialog;
