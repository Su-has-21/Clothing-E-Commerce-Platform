import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  handleAddressSelect,
  isSelected,
}) => {
  const handleCardClick = () => {
    setCurrentSelectedAddress(addressInfo);
    handleAddressSelect(addressInfo._id)
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? "border-gray-800 bg-gray-100" : "border-gray-300"
      } hover:bg-gray-200`}
    >
      <CardContent className="grid gap-2 p-2">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 p-2">
        <Button
          className="rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          className="rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
