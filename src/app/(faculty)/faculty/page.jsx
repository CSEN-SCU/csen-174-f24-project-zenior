import AuthGuard from "@/components/AuthGuard";

const FacultyPage = () => {
  return (
    <AuthGuard requiredRole="faculty">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Faculty Dashboard</h1>
        <p>Access student projects, advise students, and view proposals.</p>
      </div>
    </AuthGuard>
  );
};

export default FacultyPage;
