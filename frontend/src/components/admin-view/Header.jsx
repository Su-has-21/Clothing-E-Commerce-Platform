import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-background">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-grow"></div>
      <div className="relative flex items-center">
        <Button
          onClick={handleLogout}
          className="flex items-center gap-0 sm:gap-2"
        >
          <LogOut className="sm:block h-4 w-4" />
          <span className="hidden lg:block">Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
