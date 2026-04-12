import { fetchAllFoods } from "@/store/admin/foodSlice";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchCart } from "@/store/cart/cartSlice";
import { getOrCreateGuestId } from "@/utils/guestId";
import { ShoppingCart, Star, Loader2, Search, X, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { id: 0, label: "All",          value: "all",           emoji: "🍽️" },
  { id: 1, label: "Fish & Chips", value: "Fish and chips", emoji: "🐟" },
  { id: 2, label: "Burgers",      value: "Burger",         emoji: "🍔" },
  { id: 3, label: "Drinks",       value: "Drinks",         emoji: "🍺" },
];

const avgRating = (reviews) => {
  if (!reviews?.length) return null;
  return (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1);
};

const StarRow = ({ rating, size = 11 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
      />
    ))}
  </div>
);

const getBadge = (item) => {
  const r = avgRating(item.reviews);
  if (r >= 4.5) return { label: "Top Rated", color: "bg-amber-400 text-white" };
  if (item.reviews?.length >= 5) return { label: "Popular", color: "bg-orange-400 text-white" };
  if (item.reviews?.length === 0) return { label: "New", color: "bg-teal-500 text-white" };
  return null;
};

/* ── Single food card ─────────────────────────────────────────── */
const FoodCard = ({ item, onAddToCart, adding, isAdmin }) => {
  const rating = avgRating(item.reviews);
  const badge  = getBadge(item);

  return (
    <Link
      to={`/fooddetail/${item._id}`}
      className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-amber-100 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-amber-50">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow ${badge.color}`}>
            {badge.label}
          </span>
        )}

        {/* Rating */}
        {rating && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-amber-600 px-2 py-1 rounded-full shadow">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            {rating}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-gray-800 text-[15px] leading-snug mb-1">{item.title}</h3>

        {item.reviews?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            <StarRow rating={rating} />
            <span className="text-[10px] text-gray-400">({item.reviews.length})</span>
          </div>
        )}

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-grow mb-3">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-amber-50 mt-auto">
          <div>
            <span className="text-amber-500 font-extrabold text-xl">${item.price}</span>
          </div>
          {!isAdmin && (
            <button
              onClick={(e) => onAddToCart(e, item)}
              disabled={adding}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 active:scale-95 disabled:bg-amber-200 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow transition-all duration-200"
            >
              {adding ? <Loader2 size={12} className="animate-spin" /> : <ShoppingCart size={12} />}
              {adding ? "Adding…" : "Add"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

/* ── Section heading ──────────────────────────────────────────── */
const SectionHeading = ({ emoji, label, count }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-2xl">{emoji}</span>
    <h2 className="text-xl font-extrabold text-gray-800">{label}</h2>
    <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{count}</span>
    <div className="flex-1 h-px bg-amber-100 ml-2" />
  </div>
);

/* ── Page ─────────────────────────────────────────────────────── */
const MenuPage = () => {
  const dispatch   = useDispatch();
  const { foodList, isLoading } = useSelector((state) => state.food);
  const { user }   = useSelector((state) => state.auth);
  const [activeId, setActiveId]   = useState(0);
  const [filter,   setFilter]     = useState(CATEGORIES[0]);
  const [search,   setSearch]     = useState("");
  const [addingId, setAddingId]   = useState(null);

  useEffect(() => { dispatch(fetchAllFoods()); }, [dispatch]);

  const handleAddToCart = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    getOrCreateGuestId();
    setAddingId(item._id);
    try {
      await dispatch(addToCart({ foodId: item._id, quantity: 1 })).unwrap();
      dispatch(fetchCart());
    } finally {
      setAddingId(null);
    }
  };

  /* Filtered + searched list */
  const baseList = useMemo(() => {
    const byCategory = filter.value === "all"
      ? foodList ?? []
      : (foodList ?? []).filter((f) => f.category === filter.value);
    if (!search.trim()) return byCategory;
    const q = search.toLowerCase();
    return byCategory.filter(
      (f) => f.title?.toLowerCase().includes(q) || f.description?.toLowerCase().includes(q)
    );
  }, [foodList, filter, search]);

  /* When showing "All", group by category */
  const grouped = useMemo(() => {
    if (filter.value !== "all") return null;
    const map = {};
    CATEGORIES.slice(1).forEach((cat) => {
      const items = baseList.filter((f) => f.category === cat.value);
      if (items.length) map[cat.value] = { ...cat, items };
    });
    return map;
  }, [filter, baseList]);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 30%,#fff 70%)" }}>

      {/* ── Hero banner ────────────────────────────────────── */}
      <div className="pt-[12vh]">
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#92400e 0%,#b45309 50%,#d97706 100%)" }}
        >
          {/* Decorative dots */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative container mx-auto max-w-6xl px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-amber-200 text-xs font-bold uppercase tracking-widest mb-1">The Chippy · Est. 2024</p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Our Menu
              </h1>
              <p className="text-amber-100 mt-2 text-sm">
                Fresh battered cod · Hand-cut chips · Made to order
              </p>
            </div>

            {/* Opening hours pill */}
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white text-center shrink-0">
              <p className="text-xs text-amber-200 uppercase tracking-widest font-semibold mb-1">Opening Hours</p>
              <p className="font-bold text-lg">4:00 PM – 8:00 PM</p>
              <p className="text-xs text-amber-200 mt-0.5">Closed Mondays</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6 pb-20">

        {/* ── Search + filters ───────────────────────────────── */}
        <div className="sticky top-[4rem] z-20 bg-white/80 backdrop-blur-md border-b border-amber-100 -mx-4 md:-mx-6 px-4 md:px-6 py-4 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

            {/* Search */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="text"
                placeholder="Search the menu…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-amber-50 border border-amber-200 rounded-full text-sm text-gray-700 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveId(cat.id); setFilter(cat); }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    activeId === cat.id
                      ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            {!isLoading && (
              <p className="text-xs text-gray-400 sm:ml-auto shrink-0">
                {baseList.length} {baseList.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>
        </div>

        {/* ── Loading ────────────────────────────────────────── */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 size={40} className="animate-spin text-amber-400" />
            <p className="text-gray-400 text-sm">Fetching today's menu…</p>
          </div>
        )}

        {/* ── Empty ──────────────────────────────────────────── */}
        {!isLoading && baseList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
            <span className="text-6xl">🐟</span>
            <p className="text-gray-700 font-bold text-lg">Nothing found</p>
            <p className="text-gray-400 text-sm max-w-xs">
              {search ? `No results for "${search}"` : "No items in this category yet — check back soon!"}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-2 text-amber-500 text-sm font-semibold hover:underline">
                Clear search
              </button>
            )}
          </div>
        )}

        {/* ── Grouped (All view) ─────────────────────────────── */}
        {!isLoading && grouped && Object.keys(grouped).length > 0 && (
          <div className="space-y-14">
            {Object.values(grouped).map((group) => (
              <section key={group.value}>
                <SectionHeading emoji={group.emoji} label={group.label} count={group.items.length} />
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
                  {group.items.map((item) => (
                    <FoodCard
                      key={item._id}
                      item={item}
                      onAddToCart={handleAddToCart}
                      adding={addingId === item._id}
                      isAdmin={user?.role === "admin"}
                    />
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => { setActiveId(CATEGORIES.find(c => c.value === group.value)?.id ?? 0); setFilter(CATEGORIES.find(c => c.value === group.value) ?? CATEGORIES[0]); }}
                    className="flex items-center gap-1 text-xs text-amber-500 font-semibold hover:underline"
                  >
                    See all {group.label} <ChevronRight size={13} />
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ── Single category flat list ──────────────────────── */}
        {!isLoading && !grouped && baseList.length > 0 && (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
            {baseList.map((item) => (
              <FoodCard
                key={item._id}
                item={item}
                onAddToCart={handleAddToCart}
                adding={addingId === item._id}
                isAdmin={user?.role === "admin"}
              />
            ))}
          </div>
        )}

        {/* ── Search results (any category) ─────────────────── */}
        {!isLoading && search.trim() && baseList.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-8">
            Showing {baseList.length} result{baseList.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
