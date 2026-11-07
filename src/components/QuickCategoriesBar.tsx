import { ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface QuickCategoriesBarProps {
  onCategorySelected: () => void;
}

const CATEGORY_ITEMS = [
  { name: 'PlayStation Consoles', icon: '🎮', label: 'PlayStation 5', desc: 'PS5 Pro & Slim' },
  { name: 'Gaming Controllers', icon: '🕹️', label: 'Controllers', desc: 'DualSense & SCUF' },
  { name: 'Gaming Headsets', icon: '🎧', label: 'Headsets', desc: 'Planar & Esports' },
  { name: 'Xbox Consoles', icon: '⚡', label: 'Xbox Series', desc: 'Series X 1TB' },
  { name: 'Nintendo Consoles', icon: '🔴', label: 'Nintendo', desc: 'Switch OLED' },
  { name: 'Racing Wheels', icon: '🏎️', label: 'Sim Racing', desc: 'Logitech G29' },
  { name: 'VR Headsets', icon: '🥽', label: 'Virtual Reality', desc: 'Meta Quest 3' },
  { name: 'Gaming Mice', icon: '🖱️', label: 'Esports Mice', desc: 'HERO 25K Sensor' },
  { name: 'Gaming Keyboards', icon: '⌨️', label: 'Keyboards', desc: 'Analog Optical' },
  { name: 'Gaming Chairs', icon: '🪑', label: 'Gaming Chairs', desc: 'Secretlab Titan' },
];

export const QuickCategoriesBar: React.FC<QuickCategoriesBarProps> = ({ onCategorySelected }) => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    onCategorySelected();
  };

  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Browse by Gaming Category
            </h3>
          </div>
          <button
            onClick={() => handleSelect('All Products')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
          >
            <span>View All ({CATEGORY_ITEMS.length}+ Categories)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable / Responsive Category Cards */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_ITEMS.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left shrink-0 min-w-[160px] sm:min-w-[180px] active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                  {cat.icon}
                </span>
                <div className="overflow-hidden">
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {cat.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate font-mono">
                    {cat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
