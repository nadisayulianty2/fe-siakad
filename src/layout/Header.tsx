export default function Header() {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow border-b">
      <div>
        <h2 className="text-xl font-semibold">👋 Selamat datang, Nadisa Yulianty!</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <img
        src="https://ui-avatars.com/api/?name=Esa+Fauzi"
        className="w-10 h-10 rounded-full"
        alt="avatar"
      />
    </header>
  );
}