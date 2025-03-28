import {
  BadgeCheck,
  ChartNoAxesCombined,
  FileSliders,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            className="flex ml-1 cursor-pointer items-center gap-2  rounded-md px-3 py-2"
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
          >
            <div
              className="w-full ml- 2 flex text-xl border rounded-md px-3 py-2
          text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {menuItem.icon}
              <span className="ml-3">{menuItem.label}</span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-80"
          style={{ marginRight: "100px" }}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="justify-center mt-10">
              <SheetTitle className="border-b flex gap-2 p-2 items-center justify-center mr-2">
                <LayoutDashboard />
                <h1 className="text-2xl font-medium">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2  ml-2 rounded-md px-3 py-2 border-b"
        >
          <FileSliders />
          <h1 className="text-2xlfont-medium">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
