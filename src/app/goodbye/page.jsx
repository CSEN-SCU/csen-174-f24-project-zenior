import LoginCard from "@/components/LoginCard";

export default function Goodbye() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-white-100 text-gray-800 p-6">
      <h1 className="text-4xl font-bold mb-4">Goodbye!</h1>
      <p className="text-lg">You have successfully logged out.</p>

      <div className="mt-8 w-full max-w-md">
        <LoginCard />
      </div>
    </div>
  );
}
