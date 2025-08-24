import { Grid3X3, List, Package } from "lucide-react";
import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductsList = ({ products, onEdit = null }) => {
  const [viewMode, setViewMode] = React.useState("grid");
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {products.length} products
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list"
                ? "btn btn-primary btn-sm"
                : "btn btn-ghost btn-sm"
            }
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={
              viewMode === "grid"
                ? "btn btn-primary btn-sm"
                : "btn btn-ghost btn-sm"
            }
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <GridView products={products} onEdit={onEdit} />
      ) : (
        <ListView products={products} onEdit={onEdit} />
      )}
    </div>
  );
};
export default ProductsList;
