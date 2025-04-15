import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/contexts/theme-provider"

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="-ml-1 absolute right-2 top-2" />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors position="top-right" visibleToasts={3} />
    </ThemeProvider>
  )
}
