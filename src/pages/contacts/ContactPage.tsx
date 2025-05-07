import { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Save } from 'lucide-react';

type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
};

const initialContact: ContactInfo = {
  phone: '+1 (555) 123-4567',
  email: 'contact@foodadmin.com',
  address: '123 Restaurant Street, Foodie City, FC 12345',
  website: 'www.foodadmin.com',
  socialMedia: {
    facebook: 'facebook.com/foodadmin',
    instagram: 'instagram.com/foodadmin',
    twitter: 'twitter.com/foodadmin'
  },
  businessHours: {
    monday: '9:00 AM - 10:00 PM',
    tuesday: '9:00 AM - 10:00 PM',
    wednesday: '9:00 AM - 10:00 PM',
    thursday: '9:00 AM - 10:00 PM',
    friday: '9:00 AM - 11:00 PM',
    saturday: '10:00 AM - 11:00 PM',
    sunday: '10:00 AM - 9:00 PM'
  }
};

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContact);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const handleInputChange = (
    field: keyof ContactInfo,
    value: string | object
  ) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: keyof typeof contactInfo.socialMedia, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleHoursChange = (day: keyof typeof contactInfo.businessHours, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Information</h1>
        <button
          className={`px-4 py-2 rounded-lg flex items-center ${
            isEditing
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save size={20} className="mr-2" />
              Save Changes
            </>
          ) : (
            'Edit Information'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Contact Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                ) : (
                  <span className="text-gray-900">{contactInfo.phone}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                ) : (
                  <span className="text-gray-900">{contactInfo.email}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                ) : (
                  <span className="text-gray-900">{contactInfo.address}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <div className="flex items-center">
                <Globe size={20} className="text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={contactInfo.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                ) : (
                  <span className="text-gray-900">{contactInfo.website}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Social Media</h2>
          <div className="space-y-4">
            {Object.entries(contactInfo.socialMedia).map(([platform, url]) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {platform}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleSocialMediaChange(platform as keyof typeof contactInfo.socialMedia, e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <div className="text-blue-600 hover:text-blue-800">
                    <a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Business Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(contactInfo.businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="font-medium capitalize">{day}</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => handleHoursChange(day as keyof typeof contactInfo.businessHours, e.target.value)}
                    className="w-48 p-1 border rounded"
                  />
                ) : (
                  <span>{hours}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;