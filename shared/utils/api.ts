export async function fetchUserData() {
  const response = await fetch("http://localhost:3000/api/user")
  if (!response.ok) {
    throw new Error("Failed to fetch user data")
  }
  return response.json()
}