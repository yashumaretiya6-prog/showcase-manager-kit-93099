import { LayoutDashboard, Package, ShoppingCart, BarChart3, Users, FileText, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const AdminSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Users, label: "Users & Content", path: "/admin/users" },
    { icon: FileText, label: "Data Management", path: "/admin/data" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
      </div>
      <nav className="px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            activeClassName="bg-secondary text-foreground font-medium"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
