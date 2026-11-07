import React, { useState } from 'react';
import {
  X,
  Lock,
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order, OrderStatus } from '../types';
import { CATEGORIES } from '../data/initialData';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    orders,
    addProduct,
    editProduct,
    deleteProduct,
    updateOrderStatus,
    deleteOrder,
    resetToDefaultCatalog,
  } = useShop();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders'>('analytics');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New product form state
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    brand: 'Sony PlayStation',
    category: 'PlayStation Consoles',
    price: 25000,
    originalPrice: 28000,
    stock: 10,
    warranty: '1 Year Store Warranty',
    sku: 'NG-NEW-01',
    image: '/src/assets/images/product_ps5_pro_console_1794052339639.jpg',
    description: 'High performance gaming equipment with original store warranty.',
  });

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
  };

  // Analytics calculations
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.totalAmount : sum), 0);
  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name) return;

    addProduct({
      name: newProductForm.name,
      brand: newProductForm.brand,
      category: newProductForm.category,
      price: Number(newProductForm.price),
      originalPrice: Number(newProductForm.originalPrice),
      stock: Number(newProductForm.stock),
      warranty: newProductForm.warranty,
      sku: newProductForm.sku,
      image: newProductForm.image,
      description: newProductForm.description,
      rating: 5.0,
      reviewsCount: 1,
      isNew: true,
      specs: {
        Compatibility: 'Universal Next-Gen Gaming',
        Warranty: newProductForm.warranty,
      },
    });

    setIsAddingNew(false);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    editProduct(editingProduct);
    setEditingProduct(null);
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 text-left">
      <div className="relative w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Top Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400">STORE MANAGEMENT SYSTEM</span>
              <h2 className="text-lg font-bold text-white font-display">Naveed Games Admin Portal</h2>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-display">Owner Access Authentication</h3>
              <p className="text-xs text-slate-400">
                Enter your administrative PIN to manage products, customer orders, and inventory.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Store PIN (e.g. 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
                {pinError && (
                  <span className="text-xs text-red-400 mt-1 block">
                    Incorrect PIN. Use demo PIN: 1234
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Verify PIN
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs"
                >
                  1-Click Demo Login
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-5 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Analytics Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'orders'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Orders ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'products'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Products Inventory ({products.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefaultCatalog}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-white"
                  title="Reset to default store dataset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Catalog</span>
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-800/40 text-red-400 text-xs font-semibold"
                >
                  Lock
                </button>
              </div>
            </div>

            {/* TAB 1: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* 4 KPI cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">TOTAL REVENUE (PKR)</span>
                    <div className="text-2xl font-black text-white font-mono tabular-nums">
                      Rs. {totalRevenue.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">From active orders</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">TOTAL ORDERS</span>
                    <div className="text-2xl font-black text-cyan-400 font-mono tabular-nums">
                      {orders.length}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{pendingOrdersCount} pending action</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">STOCK UNITS</span>
                    <div className="text-2xl font-black text-purple-400 font-mono tabular-nums">
                      {totalStockUnits}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Across {products.length} products</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">STORE LOCATION</span>
                    <div className="text-sm font-bold text-white">Karkhano Market</div>
                    <span className="text-[10px] text-slate-400 font-mono">Shop #75, S.S Plaza, Peshawar</span>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white font-display">Recent Customer Inquiries</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      View all orders →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800 text-xs">
                    {orders.slice(0, 4).map((ord) => (
                      <div key={ord.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white font-mono">
                            #{ord.id} · {ord.customerName}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {ord.city} · {ord.paymentMethod.toUpperCase()} · Tracking: {ord.trackingNumber}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono font-bold text-cyan-400 tabular-nums">
                            Rs. {ord.totalAmount.toLocaleString()}
                          </div>
                          <span className="text-[10px] font-mono uppercase text-slate-400">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {/* Status filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Filter by Status:</span>
                  {['all', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                        orderFilter === st
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-cyan-400 font-bold">#{ord.id}</span>
                          <span className="text-slate-500">|</span>
                          <span className="text-slate-300">Tracking: {ord.trackingNumber}</span>
                        </div>

                        {/* Status Updater */}
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">Change Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-slate-950 border border-slate-700 rounded-lg py-1 px-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => deleteOrder(ord.id)}
                            className="p-1 text-slate-500 hover:text-red-400 ml-1"
                            title="Delete order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Customer details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                        <div>
                          <strong className="text-white block">{ord.customerName}</strong>
                          <span className="font-mono text-cyan-400">{ord.phone}</span>
                        </div>
                        <div>
                          <strong className="text-white block">Delivery Destination:</strong>
                          <span>{ord.address}, {ord.city}</span>
                        </div>
                        <div>
                          <strong className="text-white block">Payment & Courier:</strong>
                          <span>{ord.paymentMethod.toUpperCase()} · {ord.courierName}</span>
                        </div>
                      </div>

                      {/* Item list */}
                      <div className="bg-slate-950/80 p-2.5 rounded-xl space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-slate-400 text-[11px]">
                            <span>
                              {it.product.name} ({it.selectedColor}) x{it.quantity}
                            </span>
                            <span className="font-mono text-white">
                              Rs. {(it.product.price * it.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-xs font-bold text-white pt-1 border-t border-slate-800 font-mono">
                          <span>Total Amount:</span>
                          <span className="text-cyan-400">Rs. {ord.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS INVENTORY */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-display">Manage Product Catalog</h3>
                  <button
                    onClick={() => setIsAddingNew(!isAddingNew)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Gaming Gear</span>
                  </button>
                </div>

                {/* Add New Product Form */}
                {isAddingNew && (
                  <form onSubmit={handleCreateProduct} className="p-4 rounded-2xl bg-slate-900 border border-cyan-800/60 space-y-3 text-xs">
                    <div className="font-bold text-cyan-400">Add New Product to Store:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={newProductForm.name}
                          onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Brand</label>
                        <input
                          type="text"
                          required
                          value={newProductForm.brand}
                          onChange={(e) => setNewProductForm({ ...newProductForm, brand: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Category</label>
                        <select
                          value={newProductForm.category}
                          onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                        >
                          {CATEGORIES.filter((c) => c !== 'All Products').map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Price (PKR)</label>
                        <input
                          type="number"
                          required
                          value={newProductForm.price}
                          onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Stock Units</label>
                        <input
                          type="number"
                          required
                          value={newProductForm.stock}
                          onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                )}

                {/* Edit Product Modal */}
                {editingProduct && (
                  <form onSubmit={handleSaveEditProduct} className="p-4 rounded-2xl bg-slate-900 border border-amber-500/60 space-y-3 text-xs">
                    <div className="font-bold text-amber-400">Editing: {editingProduct.name}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Price (PKR)</label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Stock Count</label>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Warranty Description</label>
                        <input
                          type="text"
                          value={editingProduct.warranty}
                          onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold"
                      >
                        Update Product
                      </button>
                    </div>
                  </form>
                )}

                {/* Product Inventory Table */}
                <div className="space-y-2">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-950"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-white line-clamp-1">{p.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {p.category} · SKU: {p.sku}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-mono font-bold text-white tabular-nums">
                            Rs. {p.price.toLocaleString()}
                          </div>
                          <div className={`text-[10px] font-mono ${p.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            Stock: {p.stock} units
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
