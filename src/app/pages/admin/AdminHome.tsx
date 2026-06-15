import { useCMS } from "../../context/CMSContext";
import { FileUploadInput } from "../../components/FileUploadInput";
import { useConfirm } from "../../context/ConfirmContext";
import { AdminPageColors } from "../../components/AdminPageColors";

export default function AdminHome() {
  const { content, updateContent } = useCMS();
  const { confirm } = useConfirm();
  const home = content.home;

  const handleHeroChange = (field: string, value: string) => {
    updateContent({
      ...content,
      home: {
        ...content.home,
        hero: {
          ...content.home.hero,
          [field]: value
        }
      }
    });
  };

  const handleWhyChange = (field: string, value: string) => {
    updateContent({
      ...content,
      home: {
        ...content.home,
        why: {
          ...content.home.why,
          [field]: value
        }
      }
    });
  };

  const handleWhyCardChange = (index: number, field: string, value: string) => {
    const newCards = [...content.home.why.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    updateContent({
      ...content,
      home: {
        ...content.home,
        why: {
          ...content.home.why,
          cards: newCards
        }
      }
    });
  };

  const handleStoryChange = (field: string, value: string) => {
    updateContent({
      ...content,
      home: {
        ...content.home,
        ourStory: {
          ...content.home.ourStory,
          [field]: value
        }
      }
    });
  };

  const handleCTAChange = (field: string, value: string) => {
    updateContent({
      ...content,
      home: {
        ...content.home,
        cta: {
          ...content.home.cta,
          [field]: value
        }
      }
    });
  };

  const handleFeaturedJourneyUpdate = (id: number, field: string, value: string) => {
    const updated = content.featuredJourneysData.map(j =>
      j.id === id ? { ...j, [field]: value } : j
    );
    updateContent({
      ...content,
      featuredJourneysData: updated
    });
  };

  const handleAddFeaturedJourney = () => {
    const newId = Math.max(0, ...content.featuredJourneysData.map(j => j.id)) + 1;
    const newJourney = {
      id: newId,
      title: "New Featured Journey",
      category: "Mountains",
      duration: "5 Days",
      image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=700&h=900&fit=crop&auto=format",
      description: "Description here..."
    };
    updateContent({
      ...content,
      featuredJourneysData: [...content.featuredJourneysData, newJourney]
    });
  };

  const handleDeleteFeaturedJourney = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Featured Journey",
      message: "Are you sure you want to delete this featured journey?"
    });
    if (isConfirmed) {
      updateContent({
        ...content,
        featuredJourneysData: content.featuredJourneysData.filter(j => j.id !== id)
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Home Page Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage the content of the home page sections: Hero, Why Choose Us, Our Story, and Call to Action.
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Hero Section</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              value={home.hero.subtitle}
              onChange={(e) => handleHeroChange("subtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title Part 1</label>
              <input
                type="text"
                value={home.hero.title1}
                onChange={(e) => handleHeroChange("title1", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title Highlight</label>
              <input
                type="text"
                value={home.hero.titleHighlight}
                onChange={(e) => handleHeroChange("titleHighlight", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title Part 2</label>
              <input
                type="text"
                value={home.hero.title2}
                onChange={(e) => handleHeroChange("title2", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={home.hero.description}
              onChange={(e) => handleHeroChange("description", e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <FileUploadInput
              label="Background Image/Video (URL or Upload)"
              value={home.hero.image || ""}
              onChange={(url) => handleHeroChange("image", url)}
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Why Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              value={home.why.subtitle}
              onChange={(e) => handleWhyChange("subtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={home.why.title}
              onChange={(e) => handleWhyChange("title", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <h4 className="text-md font-medium text-gray-700">Cards</h4>
          {home.why.cards.map((card, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Card {i + 1} Title</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleWhyCardChange(i, "title", e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Card {i + 1} Description</label>
                <textarea
                  value={card.description}
                  onChange={(e) => handleWhyCardChange(i, "description", e.target.value)}
                  rows={2}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Our Story Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              value={home.ourStory.subtitle}
              onChange={(e) => handleStoryChange("subtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title Part 1</label>
            <input
              type="text"
              value={home.ourStory.title1}
              onChange={(e) => handleStoryChange("title1", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title Part 2</label>
            <input
              type="text"
              value={home.ourStory.title2}
              onChange={(e) => handleStoryChange("title2", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Paragraph 1</label>
            <textarea
              value={home.ourStory.p1}
              onChange={(e) => handleStoryChange("p1", e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Paragraph 2</label>
            <textarea
              value={home.ourStory.p2}
              onChange={(e) => handleStoryChange("p2", e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <FileUploadInput
              label="Image/Video (URL or Upload)"
              value={home.ourStory.image || ""}
              onChange={(url) => handleStoryChange("image", url)}
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Call To Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              value={home.cta.subtitle}
              onChange={(e) => handleCTAChange("subtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={home.cta.title}
              onChange={(e) => handleCTAChange("title", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={home.cta.description}
              onChange={(e) => handleCTAChange("description", e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <FileUploadInput
              label="Background Image/Video (URL or Upload)"
              value={home.cta.image || ""}
              onChange={(url) => handleCTAChange("image", url)}
            />
          </div>
        </div>
      </div>

      {/* Featured Journeys List Manager */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-lg font-medium text-gray-900">Featured Journeys Cards</h3>
          <button
            onClick={handleAddFeaturedJourney}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
          >
            + Add Journey
          </button>
        </div>

        <div className="space-y-6">
          {content.featuredJourneysData.map((journey) => (
            <div key={journey.id} className="border p-4 rounded-md bg-gray-50 flex gap-6">
              <div className="w-24 h-32 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img src={journey.image} alt={journey.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Title</label>
                    <input
                      type="text"
                      value={journey.title}
                      onChange={(e) => handleFeaturedJourneyUpdate(journey.id, "title", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Category</label>
                    <input
                      type="text"
                      value={journey.category}
                      onChange={(e) => handleFeaturedJourneyUpdate(journey.id, "category", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Duration</label>
                    <input
                      type="text"
                      value={journey.duration}
                      onChange={(e) => handleFeaturedJourneyUpdate(journey.id, "duration", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                    />
                  </div>
                </div>
                <div>
                  <FileUploadInput
                    label="Image/Video (URL or Upload)"
                    value={journey.image || ""}
                    onChange={(url) => handleFeaturedJourneyUpdate(journey.id, "image", url)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Modal Description</label>
                  <textarea
                    value={journey.description || ""}
                    onChange={(e) => handleFeaturedJourneyUpdate(journey.id, "description", e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteFeaturedJourney(journey.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete Journey
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminPageColors pageKey="home" />
    </div>
  );
}
