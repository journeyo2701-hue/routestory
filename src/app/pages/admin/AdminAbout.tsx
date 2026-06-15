import { useCMS } from "../../context/CMSContext";
import { FileUploadInput } from "../../components/FileUploadInput";
import { useConfirm } from "../../context/ConfirmContext";
import { AdminPageColors } from "../../components/AdminPageColors";

export default function AdminAbout() {
  const { content, updateContent } = useCMS();
  const { confirm } = useConfirm();
  const team = content.teamMembersData;
  const aboutData = content.aboutPage;

  const handlePageUpdate = (field: string, value: any) => {
    updateContent({
      ...content,
      aboutPage: {
        ...content.aboutPage,
        [field]: value
      }
    });
  };

  const handleNestedPageUpdate = (section: string, field: string, value: string) => {
    updateContent({
      ...content,
      aboutPage: {
        ...content.aboutPage,
        [section]: {
          ...(content.aboutPage as any)[section],
          [field]: value
        }
      }
    });
  };

  const handleStatUpdate = (index: number, field: string, value: string) => {
    const newStats = [...content.aboutPage.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateContent({
      ...content,
      aboutPage: {
        ...content.aboutPage,
        stats: newStats
      }
    });
  };

  const handleTeamMemberUpdate = (id: number, field: string, value: string) => {
    const updatedTeam = content.teamMembersData.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    );

    updateContent({
      ...content,
      teamMembersData: updatedTeam
    });
  };

  const handleAddTeamMember = () => {
    const newId = Math.max(0, ...content.teamMembersData.map(m => m.id)) + 1;
    const newMember = {
      id: newId,
      name: "New Member",
      role: "Role",
      bio: "Short bio here...",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80"
    };
    updateContent({
      ...content,
      teamMembersData: [...content.teamMembersData, newMember]
    });
  };

  const handleDeleteTeamMember = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Team Member",
      message: "Are you sure you want to delete this team member?"
    });
    if (isConfirmed) {
      updateContent({
        ...content,
        teamMembersData: content.teamMembersData.filter(m => m.id !== id)
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage About Page & Team</h2>
        <p className="mt-1 text-sm text-gray-500">
          Edit the hero section, text blocks, and team members displayed on the About page.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Hero Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
            <input
              type="text"
              value={aboutData.heroSubtitle}
              onChange={(e) => handlePageUpdate("heroSubtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hero Title</label>
            <input
              type="text"
              value={aboutData.heroTitle}
              onChange={(e) => handlePageUpdate("heroTitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Hero Description</label>
            <textarea
              value={aboutData.heroDescription}
              onChange={(e) => handlePageUpdate("heroDescription", e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Why We Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              value={aboutData.whyWeStarted.subtitle}
              onChange={(e) => handleNestedPageUpdate("whyWeStarted", "subtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={aboutData.whyWeStarted.title}
              onChange={(e) => handleNestedPageUpdate("whyWeStarted", "title", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Paragraph 1</label>
            <textarea
              value={aboutData.whyWeStarted.p1}
              onChange={(e) => handleNestedPageUpdate("whyWeStarted", "p1", e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Paragraph 2</label>
            <textarea
              value={aboutData.whyWeStarted.p2}
              onChange={(e) => handleNestedPageUpdate("whyWeStarted", "p2", e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <FileUploadInput
              label="Image/Video (URL or Upload)"
              value={aboutData.whyWeStarted.image || ""}
              onChange={(url) => handleNestedPageUpdate("whyWeStarted", "image", url)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quote</label>
            <textarea
              value={aboutData.whyWeStarted.quote}
              onChange={(e) => handleNestedPageUpdate("whyWeStarted", "quote", e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quote Author</label>
            <input
              type="text"
              value={aboutData.whyWeStarted.quoteAuthor}
              onChange={(e) => handleNestedPageUpdate("whyWeStarted", "quoteAuthor", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Vision & Mission</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Our Vision</h4>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Subtitle</label>
              <input
                type="text"
                value={aboutData.vision.subtitle}
                onChange={(e) => handleNestedPageUpdate("vision", "subtitle", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
              <input
                type="text"
                value={aboutData.vision.title}
                onChange={(e) => handleNestedPageUpdate("vision", "title", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
              <textarea
                value={aboutData.vision.description}
                onChange={(e) => handleNestedPageUpdate("vision", "description", e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Our Mission</h4>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Subtitle</label>
              <input
                type="text"
                value={aboutData.mission.subtitle}
                onChange={(e) => handleNestedPageUpdate("mission", "subtitle", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
              <input
                type="text"
                value={aboutData.mission.title}
                onChange={(e) => handleNestedPageUpdate("mission", "title", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
              <textarea
                value={aboutData.mission.description}
                onChange={(e) => handleNestedPageUpdate("mission", "description", e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {aboutData.stats.map((stat, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatUpdate(i, "label", e.target.value)}
                className="block w-full rounded-md border-gray-300 px-2 py-1 mb-2 text-sm border focus:border-blue-500"
              />
              <label className="block text-xs font-medium text-gray-500 mb-1">Number/Value</label>
              <input
                type="text"
                value={stat.number}
                onChange={(e) => handleStatUpdate(i, "number", e.target.value)}
                className="block w-full rounded-md border-gray-300 px-2 py-1 text-sm border focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 mb-4">Team & CTA Headings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Section Subtitle</label>
            <input
              type="text"
              value={aboutData.teamSubtitle || ""}
              onChange={(e) => handlePageUpdate("teamSubtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Section Title</label>
            <input
              type="text"
              value={aboutData.teamTitle || ""}
              onChange={(e) => handlePageUpdate("teamTitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Footer Call-to-Action (CTA) Title</label>
            <input
              type="text"
              value={aboutData.ctaTitle || ""}
              onChange={(e) => handlePageUpdate("ctaTitle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
          <button
            onClick={handleAddTeamMember}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
          >
            + Add Team Member
          </button>
        </div>
        
        {team.map((member) => (
          <div key={member.id} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 flex gap-6">
            <div className="w-32 h-40 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleTeamMemberUpdate(member.id, "name", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleTeamMemberUpdate(member.id, "role", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700">Bio</label>
                <textarea
                  value={member.bio}
                  onChange={(e) => handleTeamMemberUpdate(member.id, "bio", e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <FileUploadInput
                  label="Profile Image/Video (URL or Upload)"
                  value={member.image || ""}
                  onChange={(url) => handleTeamMemberUpdate(member.id, "image", url)}
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleDeleteTeamMember(member.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete Member
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminPageColors pageKey="about" />
    </div>
  );
}
