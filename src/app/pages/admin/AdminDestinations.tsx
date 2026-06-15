import { useState } from "react";
import { useCMS } from "../../context/CMSContext";
import { FileUploadInput } from "../../components/FileUploadInput";
import { useConfirm } from "../../context/ConfirmContext";
import { X } from "lucide-react";
import { AdminPageColors } from "../../components/AdminPageColors";

export default function AdminDestinations() {
  const { content, updateContent } = useCMS();
  const { confirm } = useConfirm();
  
  const categories = Object.keys(content.destinationsData || {});
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "");
  const [newCategoryName, setNewCategoryName] = useState("");
  
  const destinations = (activeCategory ? content.destinationsData[activeCategory] : []) || [];
  const pageData = content.destinationsPage;

  const handleUpdate = (id: number, field: string, value: any) => {
    if (!activeCategory) return;
    const updatedDestinations = destinations.map(dest => 
      dest.id === id ? { ...dest, [field]: value } : dest
    );

    updateContent({
      ...content,
      destinationsData: {
        ...content.destinationsData,
        [activeCategory]: updatedDestinations
      }
    });
  };

  const handleItineraryUpdate = (destId: number, dayIndex: number, field: string, value: string) => {
    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;
    const newItinerary = [...(dest.itinerary || [])];
    newItinerary[dayIndex] = { ...newItinerary[dayIndex], [field]: value };
    handleUpdate(destId, "itinerary", newItinerary as any);
  };

  const handleAddItineraryDay = (destId: number) => {
    const dest = destinations.find(d => d.id === destId);
    if (!dest) return;
    const newItinerary = [...(dest.itinerary || [])];
    const dayNum = newItinerary.length + 1;
    newItinerary.push({
      day: `Day ${dayNum}`,
      title: "New Day Activity",
      description: "Activity description..."
    });
    handleUpdate(destId, "itinerary", newItinerary as any);
  };

  const handleDeleteItineraryDay = async (destId: number, dayIndex: number) => {
    const isConfirmed = await confirm({
      title: "Remove Day",
      message: "Are you sure you want to remove this day from the itinerary?"
    });
    if (isConfirmed) {
      const dest = destinations.find(d => d.id === destId);
      if (!dest) return;
      const newItinerary = (dest.itinerary || []).filter((_, idx) => idx !== dayIndex)
        .map((item, idx) => ({
          ...item,
          day: `Day ${idx + 1}`
        }));
      handleUpdate(destId, "itinerary", newItinerary as any);
    }
  };

  const handleAdd = (category: string) => {
    if (!category) return;
    const categoryDests = content.destinationsData[category] || [];
    const allDests = Object.keys(content.destinationsData).flatMap(k => content.destinationsData[k] || []);
    const newId = Math.max(0, ...allDests.map(d => d.id)) + 1;
    const newDest = {
      id: newId,
      name: "New Destination",
      description: "Description",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80",
      tag: category.charAt(0).toUpperCase() + category.slice(1),
      state: "State",
      price: "18500",
      duration: "6 Days / 5 Nights",
      difficulty: "Moderate",
      itinerary: []
    };
    updateContent({
      ...content,
      destinationsData: {
        ...content.destinationsData,
        [category]: [...categoryDests, newDest]
      }
    });
  };

  const handleDelete = async (id: number) => {
    if (!activeCategory) return;
    const isConfirmed = await confirm({
      title: "Delete Destination",
      message: "Are you sure you want to delete this destination?"
    });
    if (isConfirmed) {
      updateContent({
        ...content,
        destinationsData: {
          ...content.destinationsData,
          [activeCategory]: destinations.filter(d => d.id !== id)
        }
      });
    }
  };

  const handlePageUpdate = (field: string, value: string) => {
    updateContent({
      ...content,
      destinationsPage: {
        ...content.destinationsPage,
        [field]: value
      }
    });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newCategoryName.trim().toLowerCase();
    if (!cleanName) return;
    if (content.destinationsData[cleanName]) {
      alert("Category already exists!");
      return;
    }

    updateContent({
      ...content,
      destinationsData: {
        ...content.destinationsData,
        [cleanName]: []
      }
    });
    setActiveCategory(cleanName);
    setNewCategoryName("");
  };

  const handleDeleteCategory = async (categoryToDelete: string) => {
    const isConfirmed = await confirm({
      title: "Delete Category",
      message: `Are you sure you want to delete the category "${categoryToDelete}"? All destinations in this category will be permanently deleted.`
    });
    if (isConfirmed) {
      const newDestsData = { ...content.destinationsData };
      delete newDestsData[categoryToDelete];
      
      const remainingKeys = Object.keys(newDestsData);
      const newActive = remainingKeys.includes(activeCategory) 
        ? activeCategory 
        : (remainingKeys[0] || "");
      
      setActiveCategory(newActive);
      updateContent({
        ...content,
        destinationsData: newDestsData
      });
    }
  };

  const handleMoveCategory = (id: number, fromCat: string, toCat: string) => {
    if (fromCat === toCat) return;
    const dest = content.destinationsData[fromCat].find(d => d.id === id);
    if (!dest) return;

    const updatedFrom = content.destinationsData[fromCat].filter(d => d.id !== id);
    const updatedTo = [...(content.destinationsData[toCat] || []), {
      ...dest,
      tag: toCat.charAt(0).toUpperCase() + toCat.slice(1)
    }];

    updateContent({
      ...content,
      destinationsData: {
        ...content.destinationsData,
        [fromCat]: updatedFrom,
        [toCat]: updatedTo
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Destinations</h2>
          <button
            onClick={() => handleAdd(activeCategory)}
            disabled={!activeCategory}
            className={`px-4 py-2 rounded-md transition-colors shadow-sm font-medium text-sm ${
              activeCategory 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            + Add Destination
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Edit the hero section and the destination cards displayed on the Destinations page.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Hero Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
            <input
              type="text"
              value={pageData.heroSubtitle}
              onChange={(e) => handlePageUpdate("heroSubtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Title</label>
            <input
              type="text"
              value={pageData.heroTitle}
              onChange={(e) => handlePageUpdate("heroTitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Hero Description</label>
            <textarea
              value={pageData.heroDescription}
              onChange={(e) => handlePageUpdate("heroDescription", e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <FileUploadInput
              label="Hero Background Cover Image (URL or Upload)"
              value={pageData.heroImage || ""}
              onChange={(url) => handlePageUpdate("heroImage", url)}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <nav className="-mb-px flex space-x-8 overflow-x-auto py-2">
          {categories.map((category) => (
            <div
              key={category}
              className={`flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium capitalize ${
                activeCategory === category
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <button
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </button>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="text-gray-400 hover:text-red-500 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                title={`Delete ${category}`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </nav>

        <form onSubmit={handleAddCategory} className="flex items-center gap-2 pb-2">
          <input
            type="text"
            placeholder="New Category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-36 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium text-xs whitespace-nowrap"
          >
            Add Category
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {destinations.length > 0 ? (
          destinations.map((dest) => (
            <div key={dest.id} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 flex gap-6">
              <div className="w-48 h-32 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={dest.name}
                      onChange={(e) => handleUpdate(dest.id, "name", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={dest.state}
                      onChange={(e) => handleUpdate(dest.id, "state", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea
                    value={dest.description}
                    onChange={(e) => handleUpdate(dest.id, "description", e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Category (Move to Tab)</label>
                    <select
                      value={activeCategory}
                      onChange={(e) => handleMoveCategory(dest.id, activeCategory, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border bg-white outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Tag (Displays on Card)</label>
                    <input
                      type="text"
                      value={dest.tag}
                      onChange={(e) => handleUpdate(dest.id, "tag", e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <FileUploadInput
                      label="Image/Video (URL or Upload)"
                      value={dest.image || ""}
                      onChange={(url) => handleUpdate(dest.id, "image", url)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="text"
                      value={dest.price || ""}
                      onChange={(e) => handleUpdate(dest.id, "price", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Duration (e.g. 6 Days / 5 Nights)</label>
                    <input
                      type="text"
                      value={dest.duration || ""}
                      onChange={(e) => handleUpdate(dest.id, "duration", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Difficulty (e.g. Easy, Moderate)</label>
                    <input
                      type="text"
                      value={dest.difficulty || ""}
                      onChange={(e) => handleUpdate(dest.id, "difficulty", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                  </div>
                </div>

                {/* Itinerary section */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-800">Day-by-Day Itinerary</h4>
                    <button
                      onClick={() => handleAddItineraryDay(dest.id)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded border"
                    >
                      + Add Day
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(dest.itinerary || []).map((day: any, dayIdx: number) => (
                      <div key={dayIdx} className="bg-gray-50 p-3 rounded border space-y-2 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-600">{day.day}</span>
                          <button
                            onClick={() => handleDeleteItineraryDay(dest.id, dayIdx)}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Remove Day
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="md:col-span-1">
                            <label className="block text-[10px] font-medium text-gray-500">Day Label (e.g. Day 1)</label>
                            <input
                              type="text"
                              value={day.day}
                              onChange={(e) => handleItineraryUpdate(dest.id, dayIdx, "day", e.target.value)}
                              className="w-full text-xs rounded border border-gray-300 p-1 bg-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-medium text-gray-500">Day Title</label>
                            <input
                              type="text"
                              value={day.title}
                              onChange={(e) => handleItineraryUpdate(dest.id, dayIdx, "title", e.target.value)}
                              className="w-full text-xs rounded border border-gray-300 p-1 bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-gray-500">Activity Description</label>
                          <textarea
                            value={day.description}
                            onChange={(e) => handleItineraryUpdate(dest.id, dayIdx, "description", e.target.value)}
                            rows={2}
                            className="w-full text-xs rounded border border-gray-300 p-1 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleDelete(dest.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete Destination
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center text-gray-500 font-medium">
            {activeCategory 
              ? `No destinations in "${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}". Click "+ Add Destination" to create one.`
              : "Please add a category first using the form on the right of the tabs."}
          </div>
        )}
      </div>

      <AdminPageColors pageKey="destinations" />
    </div>
  );
}
