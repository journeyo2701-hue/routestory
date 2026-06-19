import { useState, useEffect } from "react";
import { useCMS } from "../../context/CMSContext";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { content } = useCMS();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("rs_admin_token");
    fetch("/api/contact", {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch enquiries");
        return res.json();
      })
      .then((data) => {
        setEnquiries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to the CMS Dashboard</h3>
        <p className="text-gray-600">
          This dashboard manages your premium travel website content. Any changes you make here will instantly reflect on the main website. All submissions are stored locally in the SQLite database.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h4 className="font-medium text-gray-900 mb-4">Content Stats</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Destinations</span>
              <span className="font-semibold text-gray-900">
                {Object.values(content.destinationsData).flat().length}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Reviews</span>
              <span className="font-semibold text-gray-900">{content.testimonialsData?.length || 0}</span>
            </li>
          </ul>
        </div>

        {/* Recent Enquiries Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h4 className="font-medium text-gray-900 mb-4">Recent Traveller Enquiries</h4>
          {loading ? (
            <p className="text-sm text-gray-500">Loading enquiries...</p>
          ) : enquiries.length === 0 ? (
            <p className="text-sm text-gray-500">No enquiries received yet.</p>
          ) : (
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Destination</th>
                    <th className="px-4 py-3 font-semibold">Travel Date</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{enq.name}</div>
                        <div className="text-xs text-gray-500">{enq.email}</div>
                        {enq.phone && <div className="text-xs text-gray-500">{enq.phone}</div>}
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">{enq.destination || "N/A"}</td>
                      <td className="px-4 py-3 text-gray-600">{enq.travelDate || "N/A"}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={enq.message}>
                        {enq.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
