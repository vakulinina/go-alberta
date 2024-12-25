import NavBar from '@/components/UserProfile/NavBar'
import SideBar from '@/components/UserProfile/SideBar'

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="min-h-screen w-1/6 border-r">
        <SideBar />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="h-16 border-b">
          <NavBar />
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
