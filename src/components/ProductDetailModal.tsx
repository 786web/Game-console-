import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, MessageCircle, Shield, Truck, Check, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/initialData';

export const ProductDetailModal: React.FC = () => {
  const {
    detailProduct,
    setDetailProduct,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setIsCheckoutOpen,
    generateProductWhatsAppUrl,
    reviews,
    addReview,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('Peshawar');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!detailProduct) return null;

  const currentColor = selectedColor || detailProduct.colors?.[0] || 'Standard';
  const wish = isWishlisted(detailProduct.id);

  const allImages = [
    detailProduct.image,
    ...(detailProduct.secondaryImages || []),
  ];

  const productReviews = reviews.filter((r) => r.productId === detailProduct.id);

  const handleBuyNow = () => {
    addToCart(detailProduct, quantity, currentColor);
    setDetailProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(detailProduct, quantity, currentColor);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview({
      productId: detailProduct.id,
      author: reviewerName,
      city: reviewerCity,
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true,
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
      setReviewNameReset();
    }, 2000);
  };

  const setReviewNameReset = () => {
    setReviewerName('');
    setReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 text-left">
        {/* Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>{detailProduct.category}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{detailProduct.sku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copy share link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setDetailProduct(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Main 2-Col Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                <img
                  src={allImages[activeImageIndex] || detailProduct.image}
                  onError={(e) => {
                    e.currentTarget.src = '/images/product_ps5_pro_console.jpg';
                  }}
                  alt={detailProduct.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {detailProduct.discountPercent && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded">
                    -{detailProduct.discountPercent}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === i ? 'border-cyan-400 scale-95' : 'border-slate-800 opacity-70'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">
                  {detailProduct.brand}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug">
                  {detailProduct.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-mono">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-white">{detailProduct.rating}</span>
                    <span className="text-slate-400">({detailProduct.reviewsCount} customer reviews)</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <span className={detailProduct.stock > 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                    {detailProduct.stock > 0 ? `In Stock (${detailProduct.stock} units)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                    Rs. {detailProduct.price.toLocaleString()}
                  </span>
                  {detailProduct.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                      Rs. {detailProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-400">PKR Official</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {detailProduct.description}
              </p>

              {/* Color / Variant Selector */}
              {detailProduct.colors && detailProduct.colors.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Selected Variant: <span className="text-cyan-400 font-mono">{currentColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {detailProduct.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          currentColor === c
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400">Quantity:</span>
                  <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-slate-300 hover:bg-slate-800 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-mono font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(detailProduct.stock, quantity + 1))}
                      className="px-3 py-1 text-slate-300 hover:bg-slate-800 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(detailProduct.id)}
                    className={`p-2 rounded-lg border ml-auto transition-colors ${
                      wish
                        ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-pink-400' : ''}`} />
                  </button>
                </div>

                {/* Primary Purchase Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={generateProductWhatsAppUrl(detailProduct, quantity, currentColor)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-600/50 text-emerald-400 text-xs font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp (+92 333 9348891)</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{detailProduct.warranty}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Peshawar: Same-day delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div className="border-t border-slate-800 pt-6 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(detailProduct.specs).map(([specKey, specVal]) => (
                <div
                  key={specKey}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between gap-3 text-xs"
                >
                  <span className="text-slate-400 font-medium">{specKey}:</span>
                  <span className="text-slate-200 font-mono text-right">{specVal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Customer Reviews Section */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
                  Customer Reviews ({productReviews.length})
                </h3>
                <span className="text-xs text-slate-400">Verified purchases from Naveed Games store</span>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
              >
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Tariq Mehmood"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Peshawar / Islamabad"
                      value={reviewerCity}
                      onChange={(e) => setReviewerCity(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    >
                      <option value={5}>5 Stars - Excellent</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                      <option value={2}>2 Stars - Fair</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Review Comments</label>
                  <textarea
                    rows={2}
                    placeholder="Share your experience with this gaming product..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                {reviewSubmitted ? (
                  <div className="text-xs text-emerald-400 font-semibold">
                    Review submitted successfully! Thank you.
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Submit Review
                  </button>
                )}
              </form>
            )}

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {productReviews.length > 0 ? (
                productReviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{r.author}</span>
                        <span className="text-slate-500">({r.city})</span>
                        <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.2 rounded font-mono">
                          Verified Buyer
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{r.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{r.comment}</p>
                    <div className="text-[10px] text-slate-500 font-mono">{r.date}</div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Be the first verified customer to leave a review for this product!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
