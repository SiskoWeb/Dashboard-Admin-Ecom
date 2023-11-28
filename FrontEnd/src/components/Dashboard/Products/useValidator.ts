export const validateForm = ({
  file,
  name,
  category,
  quantity,
  min_quantity,
  price,
  price_off,
}: any) => {
  if (!name) return "Name is required";
  if (!category) return "Category is required";
  if (quantity === null || isNaN(quantity) || quantity <= 0)
    return "Invalid quantity";
  if (min_quantity === null || isNaN(min_quantity) || min_quantity <= 0)
    return "Invalid minimum quantity";
  if (price === null || isNaN(price) || price <= 0) return "Invalid price";
  if (price_off === null || isNaN(price_off) || price_off < 0)
    return "Invalid discount price";


  return "";
};
