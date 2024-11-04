import AuthGuard from "@/components/AuthGuard";

const SuperAdminPage = () => {
  return (
    <AuthGuard requiredRole="super_admin">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Super Admin Tools</h1>
        <p>Access system-wide settings and advanced management options.</p>
      </div>
    </AuthGuard>
  );
};

export default SuperAdminPage;
