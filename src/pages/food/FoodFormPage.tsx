import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Save, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { getFoodItemById, createFoodItem, updateFoodItem } from '../../services/foodService';
import { FoodItem, FoodVariant, FoodTopping } from '../../types/food';

const FoodFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    description: '',
    category: '',
    price: 0,
    image: '',
    status: 'Available',
    variants: [],
    toppings: []
  });
  
  const [newVariant, setNewVariant] = useState<Omit<FoodVariant, 'id'>>({
    name: '',
    price: 0
  });
  
  const [newTopping, setNewTopping] = useState<Omit<FoodTopping, 'id'>>({
    name: '',
    price: 0
  });

  useEffect(() => {
    const fetchFoodItem = async () => {
      if (!isEditMode) return;
      
      try {
        const foodItem = await getFoodItemById(id);
        
        if (foodItem) {
          const { id: _, ...itemWithoutId } = foodItem;
          setFormData(itemWithoutId);
        } else {
          toast.error('Food item not found');
          navigate('/admin/food');
        }
      } catch (error) {
        console.error('Error fetching food item:', error);
        toast.error('Failed to load food item');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItem();
  }, [id, isEditMode, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FoodVariant) => {
    const { value } = e.target;
    setNewVariant((prev) => ({
      ...prev,
      [field]: field === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleToppingChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FoodTopping) => {
    const { value } = e.target;
    setNewTopping((prev) => ({
      ...prev,
      [field]: field === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const addVariant = () => {
    if (!newVariant.name || newVariant.price <= 0) {
      toast.error('Please enter a valid variant name and price');
      return;
    }
    
    const newVariantWithId: FoodVariant = {
      ...newVariant,
      id: `VAR-${Date.now()}`
    };
    
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariantWithId]
    }));
    
    setNewVariant({
      name: '',
      price: 0
    });
  };

  const removeVariant = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter(variant => variant.id !== id)
    }));
  };

  const addTopping = () => {
    if (!newTopping.name || newTopping.price <= 0) {
      toast.error('Please enter a valid topping name and price');
      return;
    }
    
    const newToppingWithId: FoodTopping = {
      ...newTopping,
      id: `TOP-${Date.now()}`
    };
    
    setFormData((prev) => ({
      ...prev,
      toppings: [...prev.toppings, newToppingWithId]
    }));
    
    setNewTopping({
      name: '',
      price: 0
    });
  };

  const removeTopping = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      toppings: prev.toppings.filter(topping => topping.id !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.price <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (isEditMode) {
        await updateFoodItem(id, formData);
        toast.success('Food item updated successfully');
      } else {
        await createFoodItem(formData);
        toast.success('Food item created successfully');
      }
      
      navigate('/admin/food');
    } catch (error) {
      console.error('Error saving food item:', error);
      toast.error('Failed to save food item');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <button
          type="button"
          className="mr-3 text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/admin/food')}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          {isEditMode ? 'Edit Food Item' : 'Add New Food Item'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Cheeseburger Deluxe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Category</option>
              <option value="Main Course">Main Course</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Side">Side</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Salad">Salad</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a description of the food item"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <div className="flex">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                className="bg-gray-100 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-200"
              >
                <ImageIcon size={18} />
              </button>
            </div>
            {formData.image && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <div className="h-20 w-20 rounded border border-gray-200 overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Food preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/100x100?text=Image+Error';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Variants Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Variants</h2>
          
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Variant Name
                </label>
                <input
                  type="text"
                  value={newVariant.name}
                  onChange={(e) => handleVariantChange(e, 'name')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Large Size"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={newVariant.price}
                  onChange={(e) => handleVariantChange(e, 'price')}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addVariant}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {formData.variants.length > 0 ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="divide-y divide-gray-200">
                {formData.variants.map((variant) => (
                  <li key={variant.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{variant.name}</p>
                      <p className="text-sm text-gray-500">${variant.price.toFixed(2)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No variants added yet.</p>
          )}
        </div>
        
        {/* Toppings Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Toppings</h2>
          
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topping Name
                </label>
                <input
                  type="text"
                  value={newTopping.name}
                  onChange={(e) => handleToppingChange(e, 'name')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Extra Cheese"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={newTopping.price}
                  onChange={(e) => handleToppingChange(e, 'price')}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addTopping}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {formData.toppings.length > 0 ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="divide-y divide-gray-200">
                {formData.toppings.map((topping) => (
                  <li key={topping.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{topping.name}</p>
                      <p className="text-sm text-gray-500">${topping.price.toFixed(2)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTopping(topping.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No toppings added yet.</p>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex justify-end">
          <button
            type="button"
            className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate('/admin/food')}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                {isEditMode ? 'Update Item' : 'Save Item'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodFormPage;