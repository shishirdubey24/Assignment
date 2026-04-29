import { useState } from "react";
import NavBar from "../components/NavBar";
import VoucherForm from "../components/VoucherForm";
import VoucherList from "../components/VoucherList";
import { List, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'form'
  const [editingVoucher, setEditingVoucher] = useState(null);

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
    setActiveTab("form");
  };

  const handleFormSuccess = () => {
    setEditingVoucher(null);
    setActiveTab("list");
  };

  const handleCreateNew = () => {
    setEditingVoucher(null);
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === "list"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <List className="w-5 h-5" /> View Vouchers
          </button>
          
          <button
            onClick={handleCreateNew}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === "form" && !editingVoucher
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : activeTab === "form" && editingVoucher
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <PlusCircle className="w-5 h-5" /> 
            {editingVoucher ? "Editing Voucher" : "Create Voucher"}
          </button>
        </div>

        {/* Content */}
        {activeTab === "list" ? (
          <VoucherList onEdit={handleEdit} />
        ) : (
          <VoucherForm 
            initialData={editingVoucher} 
            onSuccess={handleFormSuccess} 
          />
        )}

      </main>
    </div>
  );
};

export default Dashboard;