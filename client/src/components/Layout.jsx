import React from "react";
import { SidebarProvider } from "./ui/sidebar";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { ModeToggle } from "./mode-toggle";
import { Spinner } from "./ui/spinner";

const Layout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="h-screen relative overflow-y-auto w-[calc(100vw-16rem)]">
        <header className="border-b-2 sticky top-0 bg-background w-full h-14 z-10 flex items-center justify-end px-5">
          <ModeToggle />
        </header>
        <div className="px-4 py-2 h-[calc(100vh-56px)]">
          <React.Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Spinner className={"h-7 w-7"} />
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
