import { XIcon } from "lucide-react";

function FavoritesModal({ open, onOpen, children }) {
  if (!open) return null;
  return (
    <div className="flex justify-start">
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
        onClick={() => onOpen(false)}
      ></div>
      <div className="flex flex-col fixed z-50 top-1/2 left-1/2 w-[80%] max-w-md min-h-[250px] max-h-[80%] -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-4 rounded-3xl shadow-[0_0_40px_theme(colors.gray.700)]">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-slate-50">Favorites</h2>
          <button onClick={() => onOpen(false)}>
            <XIcon className="text-red-500" />
          </button>
        </div>
        {/* Divider */}
        <hr className="h-[1px] bg-slate-600 rounded-3xl my-0.5 mx-6"></hr>
        <div className="max-h-[80%]  flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default FavoritesModal;
