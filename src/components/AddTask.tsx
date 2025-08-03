import { Plus } from "react-feather";


export function AddTaskPrompt({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="w-6 h-6 rounded flex items-center justify-center">
        <Plus className="w-4 h-4 text-blue-600 border border-blue-600 font-weight-bold" />
      </div>
      <span className="text-gray-600">Type to add new task</span>
    </div>
  );
}
