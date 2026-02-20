import SidebarMenu from './SidebarMenu';
import SidebarLogotype from './SidebarLogotype';
import SidebarUserDisplayWidget from './SidebarUserDisplayWidget';

export default function Sidebar() {
    return(
        <aside className="min-h-screen w-64 flex flex-col bg-white justify-between h-screen fixed left-0 top-0 z-40">
            <div>
                <div className="px-6 py-4 text-xl font-bold">
                    <SidebarLogotype />
                </div>
                <nav className="mt-4">
                    <SidebarMenu />
                </nav>
            </div> 
            <SidebarUserDisplayWidget />
        </aside>
    );
}