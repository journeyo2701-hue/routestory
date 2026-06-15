import { useState } from "react";
import { useCMS } from "../../context/CMSContext";

export default function AdminGlobal() {
  const { content, updateContent } = useCMS();
  const globalData = content.global;

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [status, setStatus] = useState({ message: "", isError: false });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      setStatus({ message: "New passwords do not match.", isError: true });
      return;
    }

    if (passwords.new.length < 4) {
      setStatus({ message: "Password must be at least 4 characters long.", isError: true });
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          currentPassword: passwords.current,
          newPassword: passwords.new
        })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ message: "Password updated successfully!", isError: false });
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setStatus({ message: data.error || "Failed to update password", isError: true });
      }
    } catch (err) {
      setStatus({ message: "Server connection failed", isError: true });
    }
  };

  const handleUpdate = (field: string, value: string) => {
    updateContent({
      ...content,
      global: {
        ...content.global,
        [field]: value
      }
    });
  };

  const handleSocialUpdate = (field: string, value: string) => {
    updateContent({
      ...content,
      global: {
        ...content.global,
        socialLinks: {
          ...content.global.socialLinks,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Global Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage header logo, footer text, contact details, and social links that appear on every page.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Header & Footer Text</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo Text</label>
            <input
              type="text"
              value={globalData.logoText}
              onChange={(e) => handleUpdate("logoText", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo Subtext</label>
            <input
              type="text"
              value={globalData.logoSubtext}
              onChange={(e) => handleUpdate("logoSubtext", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Footer Description</label>
            <textarea
              value={globalData.footerDescription}
              onChange={(e) => handleUpdate("footerDescription", e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Legal Policies</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Privacy Policy</label>
            <textarea
              value={globalData.privacyPolicy || ""}
              onChange={(e) => handleUpdate("privacyPolicy", e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm font-sans"
              placeholder="Enter Privacy Policy text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Terms & Conditions (Terms of Service)</label>
            <textarea
              value={globalData.termsOfService || ""}
              onChange={(e) => handleUpdate("termsOfService", e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm font-sans"
              placeholder="Enter Terms & Conditions text..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              value={globalData.contactEmail}
              onChange={(e) => handleUpdate("contactEmail", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="text"
              value={globalData.contactPhone}
              onChange={(e) => handleUpdate("contactPhone", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Office Address</label>
            <textarea
              value={globalData.contactAddress}
              onChange={(e) => handleUpdate("contactAddress", e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
            <input
              type="text"
              value={globalData.socialLinks?.instagram || ""}
              onChange={(e) => handleSocialUpdate("instagram", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
            <input
              type="text"
              value={globalData.socialLinks?.twitter || ""}
              onChange={(e) => handleSocialUpdate("twitter", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
            <input
              type="text"
              value={globalData.socialLinks?.facebook || ""}
              onChange={(e) => handleSocialUpdate("facebook", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
            <input
              type="text"
              value={globalData.socialLinks?.youtube || ""}
              onChange={(e) => handleSocialUpdate("youtube", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
            <input
              type="text"
              value={globalData.socialLinks?.linkedin || ""}
              onChange={(e) => handleSocialUpdate("linkedin", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Change Admin Password</h3>
        <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {status.message && (
            <div className={`md:col-span-3 py-3 px-4 rounded-md text-sm ${status.isError ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
              {status.message}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              required
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              required
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              required
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-md shadow-sm transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
