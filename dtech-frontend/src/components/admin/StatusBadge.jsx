const StatusBadge = ({ status }) => {
  const map = {
    active: 'bg-green-600/20 text-green-400 border-green-600/30',
    draft: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
    inactive: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
    patent: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
    legality: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${map[status] || 'bg-gray-600/20 text-gray-400'}`}>
      {status}
    </span>
  );
};
export default StatusBadge;
