import axios from "@/lib/axios";

export async function uploadFile(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error from uploadFile: ", error);
    throw error;
  }
}
