import { FC, useState } from 'react';
// import Navbar from './navbar';
import { Sidebar } from './Sidebar'
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        console.log(page)
        if (page === 'dashboard') {
        setCurrentPage('dashboard');
        }
    };

    const handleLogout = () => {
        setCurrentPage('tenant-selection');
        setCurrentPage('dashboard');
    };
  return (
    <div className="flex h-screen bg-slate-100">
        <Sidebar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLogout={handleLogout}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
            <Header
                onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                tenantName={''}
                userName="Tannous Geagea"
            />

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export default Layout;