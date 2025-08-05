import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

type HighlightedInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  className?: string;
};

type HighlightedInputHandle = {
  focus: () => void;
};

export const HighlightedInput = forwardRef<HighlightedInputHandle, HighlightedInputProps>(
  ({ value, onChange, placeholder = "Type to add new task", className = "" }, ref) => {
    const highlightRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Exponemos la función focus al componente padre
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    }));

    const renderHighlightedText = (text: string) => {
      if (!text) return placeholder;

      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
      const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
      const mentionRegex = /(^|\s)(@\w+)/g;
      const hashtagRegex = /(^|\s)(#\w+)/g;

      const processedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(
          emailRegex,
          '<span class="text-orange-700 rounded px-1">$1</span>'
        )
        .replace(
          urlRegex,
          '<span class="text-blue-700 rounded px-1">$1</span>'
        )
        .replace(
          mentionRegex,
          '$1<span class="text-green-700 rounded px-1">$2</span>'
        )
        .replace(
          hashtagRegex,
          '$1<span class="text-purple-700 rounded px-1">$2</span>'
        )
        .replace(/\n$/g, "\n ")
        .replace(/\n/g, "<br/>");

      return processedText;
    };

    const syncScroll = () => {
      if (textareaRef.current && highlightRef.current) {
        highlightRef.current.scrollTop = textareaRef.current.scrollTop;
        highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    };

    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

        if (highlightRef.current) {
          highlightRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }
    };

    useEffect(() => {
      adjustTextareaHeight();
      if (highlightRef.current) {
        highlightRef.current.innerHTML = value
          ? renderHighlightedText(value)
          : `<span class="text-gray-400">${placeholder}</span>`;
      }
    }, [value, placeholder]);

    return (
      <div className={`relative ${className}`}>
        <div
          ref={highlightRef}
          className={`absolute inset-0 p-2 whitespace-pre-wrap break-words pointer-events-none overflow-hidden 
           text-sm rounded bg-white`}
          aria-hidden="true"
        />

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          placeholder={placeholder}
          className={`w-full p-2 resize-none text-sm focus:outline-none z-10 bg-transparent 
            text-opacity-0 caret-black rounded`}
          rows={1}
          spellCheck={false}
        />
      </div>
    );
  }
);

HighlightedInput.displayName = "HighlightedInput";