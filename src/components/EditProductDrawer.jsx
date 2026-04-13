import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editFood } from "@/store/admin/foodSlice";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
import {
  X, UtensilsCrossed, FileText, DollarSign,
  ImagePlus, CheckCircle, Loader2, Save,
} from "lucide-react";

const CATEGORIES = [
  { value: "Fish and chips", label: "Fish & Chips", emoji: "🐟" },
  { value: "Burger",         label: "Burger",       emoji: "🍔" },
  { value: "Drinks",         label: "Drinks",       emoji: "🍺" },
];

const inputClass =
  "w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

const EditProductDrawer = ({ isOpen, onClose, food }) => {
  const [image,     setImage]     = useState({});
  const [uploading, setUploading] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [formData,  setFormData]  = useState({
    title: "", description: "", category: "", price: "", available: "true",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (food) {
      setFormData({
        title:       food.title       || "",
        description: food.description || "",
        category:    food.category    || "",
        price:       food.price       || "",
        available:   food.available?.toString() || "true",
      });
      setImage({ url: food.imageUrl || food.image?.url || "" });
    }
  }, [food]);

  if (!isOpen) return null;

  const handleImage = async (file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/all/upload-image`, fd);
      setImage({ url: data.url, public_id: data.public_id });
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) { toast.error("Please select a category."); return; }
    setLoading(true);
    try {
      await dispatch(editFood({
        id: food._id,
        formData: { ...formData, imageUrl: image.url, _id: food._id },
      })).unwrap();
      toast.success("Item updated successfully!");
      onClose();
      navigate("/menu");
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden"
        style={{ animation: "slideIn 0.25s ease-out" }}
      >
        {/* Header */}
        <div
          className="shrink-0 px-6 py-5 flex items-center justify-between border-b border-amber-100"
          style={{ background: "linear-gradient(135deg,#92400e,#d97706)" }}
        >
          <div>
            <p className="text-amber-200 text-[10px] font-bold uppercase tracking-widest">Admin</p>
            <h2 className="text-white font-extrabold text-lg leading-tight">Edit Menu Item</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleOnSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Image preview + upload */}
          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-2">Food Photo</label>
            <div className="relative h-36 rounded-2xl overflow-hidden border-2 border-dashed border-amber-200 bg-amber-50 mb-2">
              {image?.url ? (
                <img src={image.url} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-1 text-amber-300">
                  <ImagePlus size={28} />
                  <p className="text-xs">No photo yet</p>
                </div>
              )}
            </div>

            <label
              htmlFor="edit-image"
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleImage(e.dataTransfer.files[0]); }}
              className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-3 cursor-pointer transition-all duration-200 text-xs font-semibold ${
                dragOver
                  ? "border-amber-400 bg-amber-100 text-amber-600"
                  : image?.url
                  ? "border-teal-300 bg-teal-50 text-teal-600"
                  : "border-amber-200 bg-amber-50 text-amber-500 hover:border-amber-400 hover:bg-amber-100"
              }`}
            >
              {uploading ? (
                <><Loader2 size={14} className="animate-spin" /> Uploading…</>
              ) : image?.url ? (
                <><CheckCircle size={14} /> Photo uploaded — click to change</>
              ) : (
                <><ImagePlus size={14} /> Drop or click to upload photo</>
              )}
            </label>
            <input id="edit-image" type="file" accept=".jpg,.png,.jpeg"
              onChange={(e) => handleImage(e.target.files[0])} className="hidden" />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <UtensilsCrossed size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
              <input type="text" name="title" required placeholder="Item title"
                value={formData.title} onChange={handleOnChange} className={inputClass} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FileText size={15} className="absolute left-3 top-3.5 text-amber-400" />
              <textarea name="description" required rows={3} placeholder="Describe the dish…"
                value={formData.description} onChange={handleOnChange}
                className="w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-2">
              Category <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value} type="button"
                  onClick={() => setFormData((p) => ({ ...p, category: cat.value }))}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border-2 transition-all cursor-pointer ${
                    formData.category === cat.value
                      ? "bg-amber-400 border-amber-400 text-white shadow-md"
                      : "bg-white border-amber-200 text-amber-600 hover:border-amber-400"
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">
                Price ($) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input type="number" name="price" required min="0" step="0.01"
                  placeholder="0.00" value={formData.price} onChange={handleOnChange}
                  className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">Availability</label>
              <div className="flex gap-2">
                {[{ label: "Yes", val: "true" }, { label: "No", val: "false" }].map((opt) => (
                  <button
                    key={opt.val} type="button"
                    onClick={() => setFormData((p) => ({ ...p, available: opt.val }))}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition cursor-pointer ${
                      formData.available === opt.val
                        ? opt.val === "true"
                          ? "bg-teal-500 border-teal-500 text-white"
                          : "bg-red-400 border-red-400 text-white"
                        : "bg-white border-amber-200 text-gray-500 hover:border-amber-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </form>

        {/* Sticky footer */}
        <div className="shrink-0 px-6 py-4 border-t border-amber-100 bg-white flex gap-3">
          <button
            type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-full border-2 border-amber-200 text-amber-600 text-sm font-semibold hover:bg-amber-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit" form="edit-form"
            onClick={handleOnSubmit}
            disabled={loading || uploading}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white text-sm font-bold py-2.5 rounded-full shadow transition"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={15} />}
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EditProductDrawer;
