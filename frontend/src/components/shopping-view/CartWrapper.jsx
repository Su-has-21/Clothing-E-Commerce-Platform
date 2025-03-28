import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./CartItemsContent";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md max-w-full h-full max-h-screen 
    overflow-y-auto px-4 sm:px-6 pb-6 sm:pb-8">
      <SheetHeader>
      <SheetTitle className="text-lg sm:text-xl">CART</SheetTitle>
      </SheetHeader>
      <div className="mt-6 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 sm:mt-8"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
