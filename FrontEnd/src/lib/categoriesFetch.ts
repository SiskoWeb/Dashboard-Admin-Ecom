import axios from "axios";

export async function CreateCategory(data: FormData) {
    try {
      const response = await axios.post(
        "http://localhost/adminDashboard/Backend/categories/create.php",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
        "http://localhost/adminDashboard/Backend/categories/create.php",
     
       
      );
  
      console.log(response);
      return response.data; // Return the response data directly
    } catch (error: any) {
      return { error: error.message };
    }
  }