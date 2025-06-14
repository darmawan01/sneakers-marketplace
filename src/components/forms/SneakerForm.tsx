import { brands, categories, SneakerFormData } from '@/data/sneakers';
import { FaEye, FaSave } from 'react-icons/fa';
import Button from './Button';
import FormGroup from './FormGroup';

interface SneakerFormProps {
  formData: SneakerFormData;
  urlError: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onPreview: () => void;
}

export default function SneakerForm({
  formData,
  urlError,
  onInputChange,
  onSave,
  onPreview,
}: SneakerFormProps) {
  return (
    <form className="h-full flex flex-col">
      <div className="space-y-4 flex-1">
        <FormGroup label="Sneaker Name" htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={onInputChange}
            className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none text-black"
          />
        </FormGroup>
        <FormGroup label="Brand" htmlFor="brand">
          <select
            name="brand"
            id="brand"
            required
            value={formData.brand}
            onChange={onInputChange}
            className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none bg-white text-black"
          >
            <option value="">Select a brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Price" htmlFor="price">
          <input
            type="number"
            name="price"
            id="price"
            required
            min="0"
            value={formData.price}
            onChange={onInputChange}
            className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none text-black"
          />
        </FormGroup>
        <FormGroup label="Category" htmlFor="category">
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={onInputChange}
            className="h-12 w-full rounded-md border border-gray-300 shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none bg-white text-black"
          >
            <option value="">Select a category</option>
            {categories.filter(category => category !== 'All').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Image URL" htmlFor="imageUrl">
          <div className="space-y-1">
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              required
              value={formData.imageUrl}
              onChange={onInputChange}
              className={`h-12 w-full rounded-md border ${urlError ? 'border-red-500' : 'border-gray-300'
                } shadow-sm px-3 focus:border-black focus:ring-black focus:outline-none text-black`}
              placeholder="https://example.com/image.jpg"
            />
            {urlError && (
              <p className="text-sm text-red-500">{urlError}</p>
            )}
          </div>
        </FormGroup>
      </div>
      <div className="flex gap-2">
        <Button onClick={onSave} className="mt-4 flex items-center justify-center w-[85%]">
          Save
          <FaSave className="w-4 h-4 ml-2" />
        </Button>
        <Button
          onClick={onPreview}
          className="mt-4 flex items-center justify-center flex-1"
          disabled={!!urlError}
        >
          <FaEye className="w-6 h-6" />
        </Button>
      </div>
    </form>
  );
} 