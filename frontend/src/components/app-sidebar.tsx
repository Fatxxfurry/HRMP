import * as React from "react"
import {
  AudioWaveform,
  CalendarCheck2 ,
  Users ,
  Rocket ,
  Command,
  GalleryVerticalEnd,
  Settings2,
  PanelsTopLeft ,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Chấm công",
      url: "#",
      icon: CalendarCheck2,
      isActive: true,
      items: [
        {
          title: "Tình trạng",
          url: "/status",
        }
      ],
    },
    {
      title: "Nhân viên",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Yêu cầu, góp ý",
          url: "/request",
        },
        {
          title: "Thông tin nhân viên",
          url: "/employeeinfo",
        },
        {
          title: "Chính sách công ty",
          url: "/policies",
        },
        {
          title: "Lương, thưởng",
          url: "/payment",
        },
      ],
    },
    {
      title: "Quản lí",
      url: "/management",
      icon: Rocket ,
      items: [
        {
          title: "Quản lí dự án",
          url: "/project-management",
        },
        {
          title: "Assign tasks",
          url: "/tasks-management",
        },
        {
          title: "Thông báo",
          url: "/notification",
        },
        {
          title: "Lịch",
          url: "/calendar",
        },
        {
          title: "Thông tin",
          url: "/information",
        },
      ],
    },
    {
      title: "Cài đặt",
      url: "/settings",
      icon: Settings2
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
