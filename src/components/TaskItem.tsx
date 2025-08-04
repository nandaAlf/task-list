import { Mail, Link as LinkIcon, Trash2, Edit } from "react-feather";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onUpdate: (newTitle: string) => void;
}

export function TaskItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const renderText = () => {
    const parts = title.split(" ");
    let emailCount = 0;
    let linkCount = 0;

    return parts
      .map((part, index) => {
        if (part.startsWith("@")) {
          return (
            <span
              key={index}
              className="bg-green-100 text-green-700 px-1 rounded py-0.5"
            >
              {part}
            </span>
          );
        } else if (part.startsWith("#")) {
          return (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-1 rounded py-0.5"
            >
              {part}
            </span>
          );
        } else if (part.includes("@") && part.includes(".com")) {
          emailCount++;
          return (
            <span
              key={index}
              className="bg-orange-100 text-orange-700 px-1 rounded inline-flex items-center"
            >
              <Mail className="w-3 h-3 mr-1" />
              Mail {emailCount}
              <span className="sr-only">{part}</span>
            </span>
          );
        } else if (part.startsWith("www.") || part.startsWith("http")) {
          linkCount++;
          const displayUrl = part.startsWith("www.") ? `https://${part}` : part;
          return (
            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="bg-blue-100 text-blue-700 px-1 rounded inline-flex items-center"
            >
              <LinkIcon className="w-3 h-3 mr-1" />
              Link {linkCount}
              <span className="sr-only">{part}</span>
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })
      .reduce<React.ReactNode>((prev, curr) => <>{prev} {curr}</>, null);
  };

  return (
    <div className="flex items-start justify-between gap-3 p-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="mt-1"
        />
        <div
          className={`flex-1 ${
            completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {renderText()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition"
          title="Eliminar"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onUpdate(id)}
          className="text-blue-500 hover:text-blue-700 transition"
          title="Editar"
        >
          {/* EDITAR */}
          <Edit className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
