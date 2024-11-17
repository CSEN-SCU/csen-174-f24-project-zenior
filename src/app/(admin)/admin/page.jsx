import AuthGuard from "@/components/AuthGuard";

const AdminPage = () => {
  return (
    <AuthGuard requiredRole="admin">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Manage users, view reports, and access admin tools.</p>
      </div>
    </AuthGuard>
  );
};

export default AdminPage;
