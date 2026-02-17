import { categories } from '../data/products';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-xs sm:text-sm font-light uppercase tracking-widest mb-3 sm:mb-4 text-black">
        Categorías
      </h3>
      {/* Scroll horizontal en móviles, wrap en desktop */}
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs uppercase tracking-wider 
              transition-all border whitespace-nowrap flex-shrink-0
              ${selectedCategory === category.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:border-black'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
