import Sidebar from "@/components/layout/Sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black min-h-screen text-white">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        {children}

      </main>

    </div>
  );
}