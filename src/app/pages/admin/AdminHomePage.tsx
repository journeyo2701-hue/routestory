import { useState, useEffect } from "react";
import { useCMS, SiteContent } from "../../context/CMSContext";

export default function AdminHomePage() {
  const { content, updateHomeHero } = useCMS();
  const [heroData, setHeroData] = useState(content.home.hero);
  const [saved, setSaved] = useState(false);

  // Sync state if context changes externally
  useEffect(() => {
    setHeroData(content.home.hero);
  }, [content.home.hero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateHomeHero(heroData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Home Page Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            Edit the text and images displayed on the main landing page.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Hero Section</h3>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                Subtitle (Small text above title)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  value={heroData.subtitle}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="title1" className="block text-sm font-medium text-gray-700">
                Title Part 1
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title1"
                  id="title1"
                  value={heroData.title1}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="titleHighlight" className="block text-sm font-medium text-gray-700">
                Title Highlight (Gold/Italic)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="titleHighlight"
                  id="titleHighlight"
                  value={heroData.titleHighlight}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="title2" className="block text-sm font-medium text-gray-700">
                Title Part 2
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title2"
                  id="title2"
                  value={heroData.title2}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description Paragraph
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={heroData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Background Image URL
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={heroData.image}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="https://..."
                />
              </div>
              {heroData.image && (
                <div className="mt-4 rounded-md overflow-hidden h-48 relative">
                  <img src={heroData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded">Preview</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
