"use server";

export async function getUsername(formData: FormData) {
  const rawFormData = {
    userName: formData.get("userName"),
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${rawFormData.userName}`
    );
    return response.json();
  } catch (err) {
    return null;
  }
}
