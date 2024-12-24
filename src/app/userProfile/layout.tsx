import NavBar from '@/components/UserProfile/NavBar'
import SideBar from '@/components/UserProfile/SideBar'

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* 左侧边栏 - 固定宽度 */}
      <div className="min-h-screen w-64 border-r">
        <SideBar />
      </div>

      {/* 右侧内容区域 */}
      <div className="flex flex-1 flex-col">
        {/* 顶部导航栏 - 固定高度 */}
        <div className="h-16 border-b">
          <NavBar />
        </div>

        {/* 主要内容区域 - 自适应高度 */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
