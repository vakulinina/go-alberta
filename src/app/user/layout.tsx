import NavBar from '@/components/UserProfile/NavBar'
import SideBar from '@/components/UserProfile/Sidebar'

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden border-r md:block md:w-1/5">
        <div className="h-full w-full">
          <SideBar />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="md:hidden">
          <SideBar />
        </div>

        <div className="flex h-16 items-center border-b px-4">
          <NavBar />
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
