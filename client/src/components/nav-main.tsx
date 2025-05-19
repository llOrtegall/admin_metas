import { ChevronRight, FileText, type LucideIcon } from "lucide-react"
import { NavLink } from 'react-router'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/auth/AuthProvider"

export function NavMain({ items }: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {

  const { user } = useAuth()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <NavLink to={item.url} key={index + 1} className={({ isActive }) =>
            isActive ? "bg-muted text-foreground" : "text-muted-foreground"
          }>
            <SidebarMenuItem >
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </NavLink>
        ))}
        {
          user.sub_process === "Gerente" && (
            <NavLink to="/transacciones" className={({ isActive }) =>
              isActive ? "bg-muted text-foreground" : "text-muted-foreground"
            }>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Transacciones">
                  <FileText />
                  <span>Transacciones</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </NavLink>
          )
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}
