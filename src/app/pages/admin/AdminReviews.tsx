import { useCMS } from "../../context/CMSContext";
import { FileUploadInput } from "../../components/FileUploadInput";
import { useConfirm } from "../../context/ConfirmContext";
import { AdminPageColors } from "../../components/AdminPageColors";

export default function AdminReviews() {
  const { content, updateContent } = useCMS();
  const { confirm } = useConfirm();
  const reviews = content.testimonialsData || [];
  const pageData = content.experiencesPage || {
    heroTitle: "Traveller Stories",
    heroSubtitle: "In Their Words",
    heroDescription: "We don't measure our success in journeys booked, but in stories created. Here is what our travellers have to say about their time with Route Story.",
    heroImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&auto=format"
  };

  const handlePageUpdate = (field: string, value: string) => {
    updateContent({
      ...content,
      experiencesPage: {
        ...pageData,
        [field]: value
      }
    });
  };

  const handleReviewUpdate = (id: number, field: string, value: string) => {
    const updated = reviews.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    );
    updateContent({
      ...content,
      testimonialsData: updated
    });
  };

  const handleAddReview = () => {
    const newId = Date.now();
    const newReview = {
      id: newId,
      author: "New Author",
      location: "Location",
      journey: "Journey Name",
      quote: "Write the traveller story here..."
    };
    updateContent({
      ...content,
      testimonialsData: [newReview, ...reviews]
    });
  };

  const handleDeleteReview = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Review",
      message: "Are you sure you want to delete this review?"
    });
    if (isConfirmed) {
      updateContent({
        ...content,
        testimonialsData: reviews.filter(t => t.id !== id)
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Traveller Reviews</h2>
          <button
            onClick={handleAddReview}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
          >
            + Add Review
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Edit the hero section, background cover, and dynamic reviews list displayed on the Reviews page.
        </p>
      </div>

      {/* Hero Section */}
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

      {/* Reviews List */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Reviews List</h3>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-md bg-gray-50 flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Author Name</label>
                  <input
                    type="text"
                    value={review.author}
                    onChange={(e) => handleReviewUpdate(review.id, "author", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Location</label>
                  <input
                    type="text"
                    value={review.location}
                    onChange={(e) => handleReviewUpdate(review.id, "location", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Journey Name</label>
                  <input
                    type="text"
                    value={review.journey}
                    onChange={(e) => handleReviewUpdate(review.id, "journey", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">Traveller Story (Quote)</label>
                <textarea
                  value={review.quote}
                  onChange={(e) => handleReviewUpdate(review.id, "quote", e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-1.5 border"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminPageColors pageKey="experiences" />
    </div>
  );
}
