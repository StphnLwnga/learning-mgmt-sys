import Sidebar from "./_components/sidebar";

/**
 * Render a dashboard layout with a sidebar and children components.
 *
 * @param {Object} props - The props for the DashboardLayout component.
 * @param {React.ReactNode} props.children - The children components to render inside the layout.
 * @return {JSX.Element} The rendered dashboard layout.
 */
const DashboardLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;