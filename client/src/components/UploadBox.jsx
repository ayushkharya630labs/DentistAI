export default function UploadBox({ setFile }) {
  return (
    <input
      type="file"
      accept="image/*"
      className="bg-glass p-6 rounded-xl border border-white/10 w-full"
      onChange={(e) => setFile(e.target.files[0])}
    />
  );
}
