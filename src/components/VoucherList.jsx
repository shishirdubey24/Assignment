import { useState, useEffect } from 'react';
import { Pencil, Trash2, FileText, IndianRupee, User, Calendar, Receipt } from 'lucide-react';
import useAuth from '../hook/useAuth';

export default function VoucherList({ onEdit }) {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const loadVouchers = () => {
      const stored = JSON.parse(localStorage.getItem('vouchers') || '[]');
      setVouchers(stored.sort((a, b) => b.id - a.id));
    };
    loadVouchers();
    
    // Optional: listen to custom event if we want cross-component updates without lifting state
    window.addEventListener('vouchersUpdated', loadVouchers);
    return () => window.removeEventListener('vouchersUpdated', loadVouchers);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      const updated = vouchers.filter(v => v.id !== id);
      localStorage.setItem('vouchers', JSON.stringify(updated));
      setVouchers(updated);
      window.dispatchEvent(new Event('vouchersUpdated'));
    }
  };

  if (vouchers.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <Receipt className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-800">No Vouchers Found</h3>
        <p className="text-gray-500 mt-2">Create your first voucher to see it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="text-indigo-500 w-5 h-5" />
          Recent Vouchers
        </h2>
        <div className="text-sm font-medium text-gray-500">
          Total: {vouchers.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Narration</th>
              <th className="px-6 py-4">Created By</th>
              <th className="px-6 py-4 text-right">Amount</th>
              {user?.role === 'admin' && (
                <th className="px-6 py-4 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vouchers.map((voucher) => {
              const totalAmount = voucher.rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
              
              return (
                <tr key={voucher.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(voucher.date).toLocaleDateString('en-GB')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      voucher.voucherType === 'Received' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {voucher.voucherType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]" title={voucher.narration}>
                    {voucher.narration}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="capitalize">{voucher.createdBy || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-800">
                    ₹{totalAmount.toFixed(2)}
                  </td>
                  
                  {user?.role === 'admin' && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(voucher)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(voucher.id)}
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
