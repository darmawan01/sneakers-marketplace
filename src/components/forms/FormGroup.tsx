export default function FormGroup({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode; }) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}