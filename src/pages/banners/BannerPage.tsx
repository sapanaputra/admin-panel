import { useState } from 'react';
import { Plus, Edit2, Trash2, MoveUp, MoveDown, Image as ImageIcon } from 'lucide-react';
import ConfirmDialog from '../../components/common/ConfirmDialog';

type Banner = {
  id: string;
  title: string;
  image: string;
  link: string;
  active: boolean;
  order: number;
};

const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Summer Special Offer',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/summer-special',
    active: true,
    order: 1
  },
  {
    id: '2',
    title: 'New Menu Items',
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/new-menu',
    active: true,
    order: 2
  }
];

const BannerPage = () => {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleMove = (bannerId: string, direction: 'up' | 'down') => {
    const newBanners = [...banners];
    const index = newBanners.findIndex(b => b.id === bannerId);
    if (direction === 'up' && index > 0) {
      [newBanners[index], newBanners[index - 1]] = [newBanners[index - 1], newBanners[index]];
    } else if (direction === 'down' && index < newBanners.length - 1) {
      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    }
    setBanners(newBanners);
  };

  const handleDelete = () => {
    if (selectedBanner) {
      setBanners(banners.filter(b => b.id !== selectedBanner.id));
      setShowDeleteDialog(false);
      setSelectedBanner(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          onClick={() => setIsEditing(true)}
        >
          <Plus size={20} className="mr-2" />
          Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Active Banners</h2>
            <div className="space-y-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="border rounded-lg p-4 flex items-center space-x-4"
                >
                  <div className="h-20 w-32 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{banner.title}</h3>
                    <p className="text-sm text-gray-500">{banner.link}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600"
                      onClick={() => handleMove(banner.id, 'up')}
                    >
                      <MoveUp size={20} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600"
                      onClick={() => handleMove(banner.id, 'down')}
                    >
                      <MoveDown size={20} />
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setIsEditing(true);
                      }}
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:text-red-800"
                      onClick={() => {
                        setSelectedBanner(banner);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banner Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Banner Preview</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
            {banners.length > 0 ? (
              <img
                src={banners[0].image}
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ImageIcon size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-center space-x-2">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`h-2 w-2 rounded-full ${
                    index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedBanner(null);
        }}
      />
    </div>
  );
};

export default BannerPage;