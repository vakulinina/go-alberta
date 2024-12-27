import NavBar from '@/components/UserProfile/NavBar'
import SideBar from '@/components/UserProfile/Sidebar'

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="h-10 w-full border-b md:min-h-screen md:w-1/6 md:border-r">
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
