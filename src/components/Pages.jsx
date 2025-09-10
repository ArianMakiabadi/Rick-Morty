function Pages({ currentPage, setCurrentPage, pageCount }) {
  const pages = getPagination(currentPage, pageCount);
  function getPagination(current, total) {
    const delta = 2; // how many pages to show around current
    const range = [];

    // Always show first page
    range.push(1);

    const left = Math.max(current - delta, 2); // start of window (after 1)
    const right = Math.min(current + delta, total - 1); // end of window (before last)

    // Add left ellipsis if needed
    if (left > 2) {
      range.push("...");
    }

    // Add pages in the window
    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    // Add right ellipsis if needed
    if (right < total - 1) {
      range.push("...");
    }

    // Always show last page if total > 1
    if (total > 1) range.push(total);

    return range;
  }

  return (
    <div className="text-slate-200 text-xs xl:text-sm flex justify-center items-center gap-1 mt-5 mb-10">
      {/* Prev button */}
      <button
        className="bg-gray-800 p-2 w-12 rounded-xl hover:bg-slate-600"
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1">
            ...
          </span>
        ) : (
          <button
            key={`page-${i}`}
            onClick={() => setCurrentPage(p)}
            className={`px-2 py-2 w-8 rounded-xl ${
              p === currentPage
                ? "bg-gray-500 text-slate-200"
                : "bg-gray-800 hover:bg-slate-600"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        className="bg-gray-800 p-2 w-12 rounded-xl hover:bg-slate-600"
        onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
      >
        Next
      </button>
    </div>
  );
}

export default Pages;
