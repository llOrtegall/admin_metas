import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  companys: [
    {
      name: 'Mulitred',
      logo: GalleryVerticalEnd,
      plan: 'Grupo Empresarial',
    },
    {
      name: 'Servired',
      logo: AudioWaveform,
      plan: 'Grupo Empresarial',
    }
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Sugeridos',
      url: '/sugeridos',
      icon: Bot
    },
    {
      title: 'Usuarios Logeados',
      url: '/logueados',
      icon: BookOpen
    },
    {
      title: 'Sucursales',
      url: '/sucursales',
      icon: Settings2
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher companys={data.companys} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
