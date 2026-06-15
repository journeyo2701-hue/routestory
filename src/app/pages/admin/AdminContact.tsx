import { useCMS } from "../../context/CMSContext";
import { FileUploadInput } from "../../components/FileUploadInput";
import { useConfirm } from "../../context/ConfirmContext";
import { AdminPageColors } from "../../components/AdminPageColors";

export default function AdminContact() {
  const { content, updateContent } = useCMS();
  const { confirm } = useConfirm();
  const faqs = content.faqsData;
  const pageData = content.contactPage;

  const handleUpdate = (index: number, field: string, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };

    updateContent({
      ...content,
      faqsData: updatedFaqs
    });
  };

  const handleAddFaq = () => {
    updateContent({
      ...content,
      faqsData: [...content.faqsData, { q: "New Question?", a: "Answer goes here." }]
    });
  };

  const handleDeleteFaq = async (index: number) => {
    const isConfirmed = await confirm({
      title: "Delete FAQ",
      message: "Are you sure you want to delete this FAQ?"
    });
    if (isConfirmed) {
      updateContent({
        ...content,
        faqsData: content.faqsData.filter((_, i) => i !== index)
      });
    }
  };

  const handlePageUpdate = (field: string, value: string) => {
    updateContent({
      ...content,
      contactPage: {
        ...content.contactPage,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Contact & FAQs</h2>
          <button
            onClick={handleAddFaq}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
          >
            + Add FAQ
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Edit the hero section of the Contact page and manage Frequently Asked Questions. Note: Contact details (email, phone, address) can be edited in Global Settings.
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
        </div>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 flex gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Question</label>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => handleUpdate(index, "q", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700">Answer</label>
                <textarea
                  value={faq.a}
                  onChange={(e) => handleUpdate(index, "a", e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleDeleteFaq(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete FAQ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminPageColors pageKey="contact" />
    </div>
  );
}
