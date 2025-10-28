import { FaUserCircle } from "react-icons/fa";

export default function ProfileHeader({ email }: { email: string }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
      <FaUserCircle className="text-5xl text-theme-600" />
      <div>
        <h2 className="text-xl font-semibold">Thông tin người dùng</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
}