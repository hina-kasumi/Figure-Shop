import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    console.log("Searching for:", query);
  }

  return (
    <div className="flex items-center gap-1 bg-background p-1 rounded w-2/5">
      <input
        className="text-black outline-none px-2 flex-1 min-w-0"
        type="text"
        placeholder="Bạn đang tìm gì..."
        value={query}
        onChange={(e) => handleChange(e)}
      />
      <button
        className="bg-theme-400 text-background py-1 px-5 rounded cursor-pointer"
        onClick={handleSearch}
      >
        <IoIosSearch size={30} />
      </button>
    </div>
  );
}
