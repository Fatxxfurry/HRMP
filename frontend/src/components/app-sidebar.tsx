"use client"
import * as React from "react"
import {
  AudioWaveform,
  CalendarCheck2,
  Users,
  Rocket,
  Command,
  GalleryVerticalEnd,
  Settings2,
  PanelsTopLeft,
} from "lucide-react"
import { useState } from "react"
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
import { useAuth } from "@/context/AuthContext"
// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading, logout } = useAuth()
  const Admindata = {
  user: {
    name: "shadcn",
    avatar: user?.avatar || "/avatars/default.jpg",
  },
  teams: [
    {
      name: "Công Ty TNHH MotMinhToi",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
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
          url: "/admin/timekeeping",
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
          url: "/admin/request",
        },
        {
          title: "Thông tin nhân viên",
          url: "/admin/employeeinfo",
        },
        {
          title: "Chính sách công ty",
          url: "/admin/policies",
        },
        {
          title: "Lương, thưởng",
          url: "/admin/payment",
        },
      ],
    },
    {
      title: "Quản lí",
      url: "#",
      icon: Rocket,
      items: [
        {
          title: "Quản lí dự án",
          url: "/admin/project-management",
        },
        {
          title: "Phân công công việc",
          url: "/admin/tasks-management",
        },
        {
          title: "Thông báo",
          url: "/admin/notification",
        },
        {
          title: "Lịch",
          url: "/admin/calendar",
        },

      ],
    },
    {
     title: "Cài đặt",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Cài đặt chung",
          url: "setting",
        }
      ]
    },
  ],
}
const Userdata = {
  user: {
    name: "shadcn",
    avatar: user?.avatar || "/avatars/default.jpg",
  },
  teams: [
    {
      name: "Công Ty TNHH MotMinhToi",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
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
          url: "/user/timekeeping",
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
          url: "/user/request",
        },
        {
          title: "Thông tin nhân viên",
          url: "/user/employeeinfo",
        },
        {
          title: "Chính sách công ty",
          url: "/user/policies",
        },
        {
          title: "Lương, thưởng",
          url: "/user/payment",
        },
      ],
    },
    {
      title: "Quản lí",
      url: "#",
      icon: Rocket,
      items: [
        {
          title: "Quản lí dự án",
          url: "/user/project-management",
        },
        {
          title: "Phân công công việc",
          url: "/user/tasks-management",
        },
        {
          title: "Thông báo",
          url: "/user/notification",
        },
        {
          title: "Lịch",
          url: "/user/calendar",
        },

      ],
    },
    {
      title: "Cài đặt",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Cài đặt chung",
          url: "setting",
        }
      ]
    },
  ],
}
  if (loading) return null // hoặc loading spinner

  const navData = user?.role === "admin" ? {
    ...Admindata,
    user: {
      name: user?.name || "Người dùng",
      avatar:  user?.avatar || "/avatars/default.jpg",
    }
  } : {
    ...Userdata,
    user: {
      name: user?.name || "Người dùng",
      avatar: user?.avatar || "/avatars/default.jpg",
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
