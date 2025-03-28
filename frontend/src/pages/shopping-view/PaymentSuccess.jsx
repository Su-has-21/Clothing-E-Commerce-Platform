import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-10 shadow-lg text-center">
        <CardHeader className="p-0">
          <CardTitle className="text-4xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-5 text-lg">Thank you for your purchase.</p>
          <Button
            className="mt-5 w-full"
            onClick={() => navigate("/shop/account")}
          >
            View Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
