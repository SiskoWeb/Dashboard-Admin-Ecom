import axios from "axios";

export async function CreateCategory(formData: FormData) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/categories/create.php",
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

export async function getCategories() {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/categories/"
    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}


export async function DeleteCategory(categoryId: number) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/categories/delete.php",
      {categoryId},

    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}