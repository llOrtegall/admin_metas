import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

export default function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="-ml-1 absolute right-2 top-2" />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors position="top-right" visibleToasts={3} />
    </>
  )
}
