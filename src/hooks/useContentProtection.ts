import { useEffect } from "react";

const isEditableTarget = (e: Event): boolean => {
  const target = e.target as HTMLElement;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
};

export const useContentProtection = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (isEditableTarget(e)) return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const inEditable = isEditableTarget(e);

      // Always block dev tools shortcuts
      if (e.key === "F12") { e.preventDefault(); return; }
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) { e.preventDefault(); return; }
      if (e.ctrlKey && e.key === "u") { e.preventDefault(); return; }
      if (e.ctrlKey && e.key === "s") { e.preventDefault(); return; }
      if (e.ctrlKey && e.key === "p") { e.preventDefault(); return; }

      // Allow all shortcuts inside input/textarea
      if (inEditable) return;

      // Block copy/select-all outside editable elements
      if (e.ctrlKey && e.key === "c") { e.preventDefault(); return; }
      if (e.ctrlKey && e.key === "a") { e.preventDefault(); return; }
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (isEditableTarget(e)) return;
      e.preventDefault();
    };

    const handleCut = (e: ClipboardEvent) => {
      if (isEditableTarget(e)) return;
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      if (isEditableTarget(e)) return;
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);
};
