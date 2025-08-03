import { Mail,Link as LinkIcon } from "react-feather";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export function TaskItem({ id, title, completed, onToggle }: TaskItemProps) {
  const renderText = () => {
    const parts = title.split(" ");
    let emailCount = 0;
    let linkCount = 0;

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span key={index} className="bg-green-100 text-green-700 px-1 rounded">
            {part}
          </span>
        );
      } else if (part.startsWith("#")) {
        return (
          <span key={index} className="bg-purple-100 text-purple-700 px-1 rounded">
            {part}
          </span>
        );
      } else if (part.includes("@") && part.includes(".com")) {
        emailCount++;
        return (
          <span key={index} className="bg-orange-100 text-orange-700 px-1 rounded inline-flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            <span>Mail {emailCount}</span>
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
            <LinkIcon className="w-4 h-4 mr-1" />
            <span>Link {linkCount}</span>
            <span className="sr-only">{part}</span>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    }).reduce((prev, curr) => [prev, " ", curr]);
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
      <input type="checkbox" checked={completed} onChange={onToggle} className="mt-1" />
      <div className="flex-1">
        <div className={completed ? "line-through bg text-gray-500" : "text-gray-900"}>
          {renderText()}
        </div>
      </div>
    </div>
  );
}
