import { brands, categories, SneakerFormData } from '@/data/sneakers';
import { motion } from 'framer-motion';
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

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function SneakerForm({
  formData,
  urlError,
  onInputChange,
  onSave,
  onPreview,
}: SneakerFormProps) {
  return (
    <motion.form
      className="h-full flex flex-col"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4 flex-1">
        <motion.div variants={itemVariants}>
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
        </motion.div>

        <motion.div variants={itemVariants}>
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
        </motion.div>

        <motion.div variants={itemVariants}>
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
        </motion.div>

        <motion.div variants={itemVariants}>
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
        </motion.div>

        <motion.div variants={itemVariants}>
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
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-red-500"
                >
                  {urlError}
                </motion.p>
              )}
            </div>
          </FormGroup>
        </motion.div>
      </div>

      <motion.div
        className="flex gap-2"
        variants={itemVariants}
      >
        <Button onClick={onSave} className="mt-4 flex items-center justify-center w-[85%]">
          <FaSave className="w-4 h-4 ml-2" />
          Save
        </Button>
        <Button
          onClick={onPreview}
          className="mt-4 flex items-center justify-center flex-1"
          disabled={!!urlError}
        >
          <FaEye className="w-6 h-6" />
        </Button>
      </motion.div>
    </motion.form>
  );
} 