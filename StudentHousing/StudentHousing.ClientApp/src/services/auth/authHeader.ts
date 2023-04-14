import { User } from "../../models/user";

export default function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: "Bearer " + JSON.parse(token) };
  } else {
    return { Authorization: "" };
  }
}
