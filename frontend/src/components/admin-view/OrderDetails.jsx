import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto p-4 scrollbar-hidden">
      <div className="grid gap-6 p-3  rounded-lg">
        <div className="grid gap-1 p-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex flex-col sm:flex-row mt-1 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex flex-col sm:flex-row mt-1 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex flex-col sm:flex-row mt-1 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex flex-col sm:flex-row mt-1 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex flex-col sm:flex-row mt-1 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "Confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "Rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="font-semibold text-lg">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between border p-2 rounded-lg"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium ml-2">
                          Title: {item.title}
                        </span>
                        <span className="font-medium ml-2">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium ml-2">
                          Price: ${item.price}
                        </span>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
          {orderDetails?.addressInfo ? (
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <span className="font-medium text-gray-800">Name:</span>
                <span className="ml-2">{user.username}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">Address:</span>
                <span className="ml-2">{orderDetails.addressInfo.address}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">City:</span>
                <span className="ml-2">{orderDetails.addressInfo.city}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">Pincode:</span>
                <span className="ml-2">{orderDetails.addressInfo.pincode}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-800">Phone:</span>
                <span className="ml-2">{orderDetails.addressInfo.phone}</span>
              </div>
              {orderDetails.addressInfo.notes && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">Notes:</span>
                  <span className="ml-2">{orderDetails.addressInfo.notes}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No shipping details available.</p>
          )}
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "Pending", label: "Pending" },
                  { id: "In Process", label: "In Process" },
                  { id: "In Shipping", label: "In Shipping" },
                  { id: "Delivered", label: "Delivered" },
                  { id: "Rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
            className="mt-6"
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
