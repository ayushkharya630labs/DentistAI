import { useRef } from "react";

export default function UploadBox({ setFile, file }) {
  const inputRef = useRef();

  return (
    <div
      onClick={() => inputRef.current.click()}
      className="cursor-pointer bg-glass p-8 rounded-xl border border-white/10 text-center hover:border-purple-500 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file ? (
        <div className="space-y-2">
          <p className="text-green-400 font-medium">Image Selected ✓</p>
          <p className="text-sm text-gray-400">{file.name}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-lg text-white font-semibold">
            Click to upload dental image
          </p>
          <p className="text-sm text-gray-400">
            JPG / PNG • high resolution recommended
          </p>
        </div>
      )}
    </div>
  );
}
