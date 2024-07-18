import DashboardNav from "@/components/dashboard-ui";
import SideNav from "@/components/side-nav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    return (
      <div className="grid grid-cols-9 min-h-screen">
        <div className="col-span-2 h-full">
          <SideNav />
        </div>
        <div className="col-span-7">{children}</div>
      </div>
    );
  }
}
