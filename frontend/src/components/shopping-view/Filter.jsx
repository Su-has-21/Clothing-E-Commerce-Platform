import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Filter } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg  p-4">
      <div className="border-b pb-4 mb-4">
        <h2 className="flex gap-3 items-center text-xl font-semibold">
          <Filter className="text-primary" /> Filters
        </h2>
      </div>
      <div className="space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="shadow-md p-4 rounded-lg bg-white">
              <h3 className="text-base font-semibold mb-2">{keyItem}</h3>
              <div className="grid gap-3">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        filters[keyItem] &&
                        filters[keyItem].includes(option.id)
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="rounded-full"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
           
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
