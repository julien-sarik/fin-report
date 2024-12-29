import { DragEvent, useState } from "react";
import Image from "next/image";


export default function FileDrop({onNewFile}: {onNewFile: (content: string) => void}) {
  const [dragIsOver, setDragIsOver] = useState(false);

  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);

        // Fetch the files
        const droppedFiles = Array.from(event.dataTransfer.files);
        // setFiles(droppedFiles);
     
        // Use FileReader to read file content
        droppedFiles.forEach((file) => {
          const reader = new FileReader();
     
          reader.onloadend = () => {
            let content = reader.result?.toString();
            content && onNewFile(content)
          };
     
          reader.onerror = () => {
            console.error("There was an issue reading the file.");
          };
     
          reader.readAsText(file);
          return reader;
        });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        width: "300px",
        border: "1px dotted",
        color: "black",
        backgroundColor: dragIsOver ? "lightgray" : "white",
      }}
    >
      Drag and drop CSV report here
    </div>
  );
}
