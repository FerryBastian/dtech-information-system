import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const useCrud = (service, autoFetch = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await service.getAll(params);
      setData(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => { if (autoFetch) fetchAll(); }, []);

  const create = async (formData) => {
    setSaving(true);
    try {
      await service.create(formData);
      toast.success('Data berhasil ditambahkan!');
      fetchAll();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const update = async (id, formData) => {
    setSaving(true);
    try {
      await service.update(id, formData);
      toast.success('Data berhasil diupdate!');
      fetchAll();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengupdate data');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    setDeleting(true);
    try {
      await service.remove(id);
      toast.success('Data berhasil dihapus!');
      fetchAll();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menghapus data');
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return { data, loading, saving, deleting, fetchAll, create, update, remove };
};

export default useCrud;
