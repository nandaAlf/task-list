import { IconButton } from "./IconButton";
import { Button } from "./Button";
import {
  Plus,
  Maximize2,
  Calendar,
  Unlock,
  Sun,
  Clock,
  X,
  Save,
} from "react-feather";
import { useIsMobile } from "../hook/useIsMobile";
import { HighlightedInput } from "./HighlightedInput";
import { useEffect, useRef } from "react";

interface Props {
  inputText: string;
  onInputChange: (text: string) => void;
  onCancel: () => void;
  onOK: () => void;
  onAdd: () => void;
  currentState: "input" | "typing";
}

export function TaskInputCard({
  inputText,
  onInputChange,
  onCancel,
  onOK,
  // onAdd,
  currentState,
}: Props) {
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Enfocar automáticamente al montar el componente
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-white border border-gray-100 rounded-lg space-y-1">
      <div className="flex items-start gap-3  p-2">
        <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-1">
          <Plus className="w-4 h-4 text-blue-600 border border-blue-600 font-weight-bold" />
        </div>

        <HighlightedInput
          ref={inputRef} // Pasamos la ref al componente interno
          value={inputText}
          onChange={onInputChange}
          placeholder="Type to add new task"
          className="flex-1"
        />

        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">F</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-50 border-t border-t-gray-100 p-2">
        <div className="flex items-center gap-2 bg">
          <IconButton
            icon={<Maximize2 />}
            variant="filled"
            label="Open"
            className="mr-4"
          />
          <IconButton icon={<Calendar />} label="Today" />
          <IconButton icon={<Unlock />} label="Public" />
          <IconButton icon={<Sun />} label="Normal" />
          <IconButton icon={<Clock />} label="Estimation" />
        </div>

        {!isMobile ? (
          <div className="flex items-center gap-2">
            <Button
              onClick={onCancel}
              variant="secondary"
              className="border border-gray-300"
            >
              Cancel
            </Button>
            {currentState === "input" ? (
              <Button onClick={onOK}>OK</Button>
            ) : (
              <Button onClick={onOK}>Add</Button>
            )}
          </div>
        ) : (
          // Mobile buttons
          <div className="flex items-center gap-2 ml-auto">
            {currentState === "input" && (
              <Button onClick={onCancel} variant="secondary" className="p-2">
                <X className="w-4 h-4" />
              </Button>
            )}
            {currentState === "typing" && (
              <Button onClick={onOK} className="p-2">
                <Save className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
