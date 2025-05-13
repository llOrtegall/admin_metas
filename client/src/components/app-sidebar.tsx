import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Moon,
  Settings2,
  SquareTerminal,
  Sun,
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
  useSidebar,
} from '@/components/ui/sidebar'
import { useTheme } from '@/contexts/theme-provider'
import { Button } from './ui/button'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  companys: [
    {
      name: 'Multired',
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
  const { theme, setTheme } = useTheme()
  const { open } = useSidebar()

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher companys={data.companys} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2" // Asegura que el contenido esté centrado
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {open && <span>Cambiar Tema</span>}
        </Button>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
