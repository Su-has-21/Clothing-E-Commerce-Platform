import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateQuantity = (getCartItem, action) => {
    if (!user?.id || !getCartItem?.productId) {
      console.error("Missing user ID or product ID.");
      return;
    }

    const newQuantity =
      action === "increase"
        ? getCartItem.quantity + 1
        : getCartItem.quantity > 1
        ? getCartItem.quantity - 1
        : 0; // Set quantity to 0 if it's less than 1

    if (newQuantity === 0) {
      handleCartItemDelete(getCartItem);
    } else {
      if (action === "increase") {
        const currentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem.productId
        );
        const totalStock = productList[currentProductIndex]?.totalStock;

        if (getCartItem.quantity + 1 > totalStock) {
          toast({
            title: `Only ${totalStock} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }

      dispatch(
        updateCartQuantity({
          userId: user.id,
          productId: getCartItem.productId,
          quantity: newQuantity,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item quantity updated",
            variant: "default",
          });
        }
      });
    }
  };

  const handleCartItemDelete = (getCartItem) => {
    if (!user?.id || !getCartItem?.productId) {
      console.error("Missing user ID or product ID.");
      return;
    }

    dispatch(
      deleteCartItem({ userId: user.id, productId: getCartItem.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item deleted",
          variant: "default",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 space-x-4 border-gray-200 sm:flex-row flex-col sm:items-start">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex flex-1 flex-col sm:flex-row sm:justify-between sm:items-start w-full sm:ml-4">
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {cartItem.title}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              
              onClick={() => handleUpdateQuantity(cartItem, "decrease")}
            >
              <Minus className="w-4 h-4 text-gray-500" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="text-sm font-semibold text-gray-700">
              {cartItem.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              onClick={() => handleUpdateQuantity(cartItem, "increase")}
            >
              <Plus className="w-4 h-4 text-gray-500" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end mt-2 sm:mt-0 sm:ml-4">
          <p className="font-semibold text-gray-900">
            ${(
              (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
              cartItem.quantity
            ).toFixed(2)}
          </p>
          <button className="text-red-600 hover:text-red-800 transition mt-4">
            <Trash
              size={20}
              className="cursor-pointer"
              onClick={() => handleCartItemDelete(cartItem)}
            />
            <span className="sr-only">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
