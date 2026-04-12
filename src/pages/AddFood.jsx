import React, { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewFood } from "@/store/admin/foodSlice";
import {
  UtensilsCrossed, FileText, Tag, DollarSign,
  CheckCircle, ImagePlus, Loader2, ShoppingCart,
  Star, ChevronLeft,
} from "lucide-react";

const CATEGORIES = [
  { value: "Fish and chips", label: "Fish & Chips", emoji: "🐟" },
  { value: "Burger",         label: "Burger",       emoji: "🍔" },
  { value: "Drinks",         label: "Drinks",       emoji: "🍺" },
];

const initialState = {
  title: "",
  description: "",
  category: "",
  price: "",
  available: true,
};

const inputClass =
  "w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

const AddFood = () => {
  const [image,     setImage]     = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData,  setFormData]  = useState(initialState);
  const [loading,   setLoading]   = useState(false);
  const [dragOver,  setDragOver]  = useState(false);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

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

  const handleFileInput = (e) => handleImage(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImage(e.dataTransfer.files[0]);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "available" ? value === "true" : value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) { toast.error("Please select a category."); return; }
    setLoading(true);
    dispatch(addNewFood({ ...formData, imageUrl: image?.url || "" }))
      .then((data) => {
        setLoading(false);
        if (data?.payload?.success) {
          toast.success(data?.payload?.message || "Food item added!");
          navigate("/menu");
        } else {
          toast.error(data?.payload?.message || "Something went wrong.");
        }
      })
      .catch(() => setLoading(false));
  };

  const categoryObj = CATEGORIES.find((c) => c.value === formData.category);

  return (
    <div
      className="min-h-screen pt-[12vh] pb-16 px-4 md:px-6"
      style={{ background: "linear-gradient(160deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
    >
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center gap-4 py-7">
          <NavLink
            to="/menu"
            className="flex items-center gap-1.5 text-amber-500 hover:text-amber-600 text-sm font-semibold transition"
          >
            <ChevronLeft size={16} /> Back to Menu
          </NavLink>
          <div className="flex-1 h-px bg-amber-200" />
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-800">
              Add New <span className="text-amber-500">Menu Item</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details — preview updates live</p>
          </div>
          <div className="flex-1 h-px bg-amber-200" />
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* ── Form (3/5) ─────────────────────────────────── */}
          <form
            onSubmit={handleOnSubmit}
            className="md:col-span-3 bg-white rounded-2xl shadow-md border border-amber-100 p-7 space-y-5"
          >

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">
                Item Title <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <UtensilsCrossed size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="text" name="title" required
                  placeholder="e.g. Crispy Battered Cod"
                  value={formData.title} onChange={handleOnChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">
                Description <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FileText size={15} className="absolute left-3 top-3.5 text-amber-400" />
                <textarea
                  name="description" required rows={3}
                  placeholder="Describe the dish — ingredients, how it's cooked…"
                  value={formData.description} onChange={handleOnChange}
                  className="w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                />
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
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, category: cat.value }))}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-150 cursor-pointer ${
                      formData.category === cat.value
                        ? "bg-amber-400 border-amber-400 text-white shadow-md"
                        : "bg-white border-amber-200 text-amber-600 hover:border-amber-400"
                    }`}
                  >
                    <span>{cat.emoji}</span> {cat.label}
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
                  <input
                    type="number" name="price" required min="0" step="0.01"
                    placeholder="0.00"
                    value={formData.price} onChange={handleOnChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-700 mb-1.5">Availability</label>
                <div className="flex gap-2">
                  {[{ label: "Available", val: "true" }, { label: "Unavailable", val: "false" }].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, available: opt.val === "true" }))}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-150 cursor-pointer ${
                        String(formData.available) === opt.val
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

            {/* Image upload */}
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">Food Photo</label>
              <label
                htmlFor="food-image"
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-6 cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? "border-amber-400 bg-amber-100"
                    : image?.url
                    ? "border-teal-400 bg-teal-50"
                    : "border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100"
                }`}
              >
                {uploading ? (
                  <>
                    <Loader2 size={28} className="text-amber-400 animate-spin" />
                    <p className="text-xs text-amber-500 font-medium">Uploading…</p>
                  </>
                ) : image?.url ? (
                  <>
                    <CheckCircle size={28} className="text-teal-500" />
                    <p className="text-xs text-teal-600 font-semibold">Photo uploaded</p>
                    <p className="text-[10px] text-gray-400">Click to change</p>
                  </>
                ) : (
                  <>
                    <ImagePlus size={28} className="text-amber-400" />
                    <p className="text-xs text-amber-600 font-semibold">Drop photo here or click to browse</p>
                    <p className="text-[10px] text-gray-400">JPG, PNG, JPEG</p>
                  </>
                )}
              </label>
              <input
                id="food-image" type="file" name="myFile"
                accept=".jpg,.png,.jpeg" onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white font-bold py-3 rounded-full shadow-md transition duration-150 mt-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Tag size={17} />}
              {loading ? "Adding to menu…" : "Add to Menu"}
            </button>
          </form>

          {/* ── Live preview (2/5) ──────────────────���───────── */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest text-center">
              Live Preview
            </p>

            <div className="bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden">
              {/* Preview image */}
              <div className="relative h-48 bg-amber-50 flex items-center justify-center overflow-hidden">
                {image?.url ? (
                  <img src={image.url} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-amber-300">
                    <ImagePlus size={36} />
                    <p className="text-xs">Photo will appear here</p>
                  </div>
                )}

                {/* Category pill on preview */}
                {categoryObj && (
                  <span className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {categoryObj.emoji} {categoryObj.label}
                  </span>
                )}

                {/* Availability badge */}
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  formData.available ? "bg-teal-500 text-white" : "bg-red-400 text-white"
                }`}>
                  {formData.available ? "Available" : "Unavailable"}
                </span>
              </div>

              {/* Preview body */}
              <div className="p-4">
                <h3 className="font-extrabold text-gray-800 text-base leading-snug mb-1 min-h-[1.5rem]">
                  {formData.title || <span className="text-gray-300 font-normal">Item title…</span>}
                </h3>

                {/* Stars placeholder */}
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={11} className="text-gray-200 fill-gray-200" />
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">No reviews yet</span>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 min-h-[2rem]">
                  {formData.description || <span className="text-gray-300">Description will appear here…</span>}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-amber-50">
                  <span className="text-amber-500 font-extrabold text-xl">
                    {formData.price ? `$${formData.price}` : <span className="text-gray-300 text-base font-normal">$—</span>}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 bg-amber-400 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow pointer-events-none opacity-90"
                  >
                    <ShoppingCart size={12} /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Checklist</p>
              {[
                { label: "Title",       done: !!formData.title },
                { label: "Description", done: !!formData.description },
                { label: "Category",    done: !!formData.category },
                { label: "Price",       done: !!formData.price },
                { label: "Photo",       done: !!image?.url },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    row.done ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {row.done ? "✓" : "·"}
                  </span>
                  <span className={`text-xs ${row.done ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
