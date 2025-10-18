interface PaginationProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  className = "",
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const gap = 2; // Số trang hiển thị trước và sau trang hiện tại

  return (
    <div className={`${className} flex items-center justify-center space-x-2`}>
      {pages.map((page) => {
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - gap && page <= currentPage + gap)
        ) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border border-gray-400 rounded transition-all ${
                page === currentPage
                  ? "bg-gray-400 text-white"
                  : "text-gray-500 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          );
        } else if (
          page === currentPage - gap - 1 ||
          page === currentPage + gap + 1
        ) {
          return <span key={page}>...</span>;
        } else {
          return null;
        }
      })}
    </div>
  );
}
