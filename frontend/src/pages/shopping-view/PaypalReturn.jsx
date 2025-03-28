import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Please wait!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>Your payment is being processed. You will be redirected soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
