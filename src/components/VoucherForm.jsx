import { useState } from 'react';
import { Plus, Trash2, Save, FileText, Calendar, AlignLeft, Wallet, AlertCircle } from 'lucide-react';
import useAuth from '../hook/useAuth';

export default function VoucherForm({ initialData, onSuccess }) {
  const { user } = useAuth();
  
  const [voucherType, setVoucherType] = useState(initialData?.voucherType || 'Payment');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [narration, setNarration] = useState(initialData?.narration || 'On Account');
  
  const initialRow = { id: Date.now(), account: '', amount: '', tdsApplicable: 'No', tdsType: '' };
  const [rows, setRows] = useState(initialData?.rows || [{ ...initialRow }]);

  const handleFocusNarration = () => {
    if (narration === 'On Account') {
      setNarration('');
    }
  };

  const handleBlurNarration = () => {
    if (narration.trim() === '') {
      setNarration('On Account');
    }
  };

  const addRow = () => {
    setRows([...rows, { ...initialRow, id: Date.now() + Math.random() }]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowChange = (id, field, value) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (field === 'tdsApplicable' && value === 'No') {
          updatedRow.tdsType = '';
        }
        return updatedRow;
      }
      return row;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: initialData?.id || Date.now(),
      voucherType, 
      date, 
      narration, 
      rows, 
      createdBy: initialData?.createdBy || user?.username,
      createdAt: initialData?.createdAt || new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('vouchers') || '[]');
    
    if (initialData) {
      const updated = existing.map(v => v.id === initialData.id ? payload : v);
      localStorage.setItem('vouchers', JSON.stringify(updated));
      alert('Voucher Updated Successfully!');
    } else {
      localStorage.setItem('vouchers', JSON.stringify([...existing, payload]));
      alert('Voucher Saved Successfully!');
    }
    
    window.dispatchEvent(new Event('vouchersUpdated'));

    if (onSuccess) {
      onSuccess();
    } else {
      setVoucherType('Payment');
      setDate(new Date().toISOString().split('T')[0]);
      setNarration('On Account');
      setRows([{ ...initialRow, id: Date.now() }]);
    }
  };

  const totalAmount = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-indigo-500 w-6 h-6" />
            Create Voucher
          </h2>
          <p className="text-gray-500 text-sm mt-1">Record a new payment or receipt</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold border border-indigo-100 flex items-center gap-2 shadow-sm">
          <Wallet className="w-4 h-4" />
          Role: {user?.role || 'Guest'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Voucher Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" /> Voucher Type
            </label>
            <div className="flex p-1 bg-gray-100 rounded-xl">
              {['Payment', 'Received'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setVoucherType(type)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    voucherType === type 
                      ? 'bg-white text-indigo-600 shadow-md transform scale-[1.02]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" /> Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-gray-700"
            />
          </div>

          {/* Narration */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-gray-400" /> Narration
            </label>
            <input
              type="text"
              required
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              onFocus={handleFocusNarration}
              onBlur={handleBlurNarration}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        {/* Dynamic Rows Section */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Voucher Entries</h3>
            {rows.length === 0 && (
              <span className="text-sm text-red-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-4 h-4" /> At least one entry is required
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {rows.map((row, index) => (
              <div 
                key={row.id} 
                className="grid grid-cols-12 gap-4 items-end bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group transition-all hover:shadow-md"
              >
                {/* Account */}
                <div className="col-span-12 md:col-span-4 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</label>
                  <select
                    required
                    value={row.account}
                    onChange={(e) => handleRowChange(row.id, 'account', e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-700 font-medium"
                  >
                    <option value="">Select Account</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank Account</option>
                    <option value="Sales">Sales Account</option>
                    <option value="Purchase">Purchase Account</option>
                    <option value="Expense">General Expense</option>
                  </select>
                </div>

                {/* Amount */}
                <div className="col-span-12 md:col-span-3 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      value={row.amount}
                      onChange={(e) => handleRowChange(row.id, 'amount', e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-700 font-medium"
                    />
                  </div>
                </div>

                {/* TDS Applicable */}
                <div className="col-span-12 md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TDS</label>
                  <select
                    value={row.tdsApplicable}
                    onChange={(e) => handleRowChange(row.id, 'tdsApplicable', e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-700 font-medium"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* TDS Type */}
                <div className={`col-span-12 md:col-span-2 space-y-1 transition-all ${row.tdsApplicable === 'Yes' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TDS Type</label>
                  <select
                    required={row.tdsApplicable === 'Yes'}
                    value={row.tdsType}
                    onChange={(e) => handleRowChange(row.id, 'tdsType', e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-700 font-medium"
                  >
                    <option value="">Select Type</option>
                    <option value="194C">194C (Contractor)</option>
                    <option value="194J">194J (Professional)</option>
                    <option value="194I">194I (Rent)</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-1 flex justify-end pb-1">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    className={`p-2 rounded-lg transition-colors ${rows.length === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg font-semibold shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add Row
            </button>
            
            <div className="text-xl font-bold text-gray-800 bg-white px-6 py-2 rounded-xl shadow-sm border border-gray-100">
              Total: <span className="text-indigo-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={rows.length === 0}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" /> Save Voucher
          </button>
        </div>
      </form>
    </div>
  );
}
