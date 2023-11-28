import axios from "axios";

export async function CreateProduct(formData: FormData) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/products/create.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getProducts() {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/products/"
    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function DeleteProduct(productId: number) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/products/delete.php",
      { productId }
    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function UpdateCategory(formData: FormData) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/categories/update.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}
