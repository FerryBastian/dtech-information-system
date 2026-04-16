const FormField = ({ label, required, error, children, hint }) => (
  <div>
    {label && (
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
    )}
    {children}
    {hint && <p className="text-gray-500 text-xs mt-1">{hint}</p>}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export const Input = ({ className = '', ...props }) => (
  <input className={`w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors ${className}`} {...props} />
);

export const Textarea = ({ className = '', rows = 4, ...props }) => (
  <textarea rows={rows} className={`w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none ${className}`} {...props} />
);

export const Select = ({ className = '', children, ...props }) => (
  <select className={`w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors ${className}`} {...props}>
    {children}
  </select>
);

export const ImageUpload = ({ value, onChange, label = 'Upload Gambar', hint }) => {
  const preview = value instanceof File ? URL.createObjectURL(value) : value ? `${import.meta.env.VITE_UPLOADS_URL || ''}${value}` : null;
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      {preview && <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg mb-2 border border-[#2a3348]" />}
      <input type="file" accept="image/*" onChange={e => onChange(e.target.files[0])}
        className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 cursor-pointer" />
      {hint && <p className="text-gray-500 text-xs mt-1">{hint}</p>}
    </div>
  );
};

export const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-[#2a3348]'}`} onClick={() => onChange(!checked)}>
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </div>
    {label && <span className="text-sm text-gray-300">{label}</span>}
  </label>
);

export default FormField;
