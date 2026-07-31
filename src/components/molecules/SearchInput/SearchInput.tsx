import { Search, X } from "lucide-react";
import { FormEvent } from "react";

interface SearchInputProps {
  value: string | number;
  placeholder?: string;
  handleChange: (value: string) => void;
  handleClear: () => void;
  onSubmit: (e: FormEvent) => void;
}

const SearchInput = ({
  value,
  placeholder = "Search",
  handleChange,
  handleClear,
  onSubmit,
}: SearchInputProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      className="max-w-sm w-full relative px-2 h-8 rounded-full focus-within:border-purple-500 border border-gray-300 dark:border-gray-700 flex items-center gap-2 transition-all duration-300"
      onSubmit={handleSubmit}
    >
      <button type="submit">
        <Search className="w-6 h-6 text-gray-300 dark:text-gray-700" />
      </button>
      <input
        type="text"
        name="search"
        id="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        className="outline-none flex-1 text-gray-500"
      />
      {value && (
        <button type="button" onClick={handleClear} className="cursor-pointer">
          <X className="w-4 h-4 text-red-500" />
        </button>
      )}
    </form>
  );
};

export default SearchInput;
