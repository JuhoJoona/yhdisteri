"use client";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { useEffect } from "react";

export default async function Dashboard() {
  const { getToken } = useAuth();
  useEffect(() => {
    const getStuff = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = `${baseUrl}/users/organizations`;

      console.log(url, "url");
      const token = await getToken();
      console.log(token, "token");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const organizations = await response.json();
      console.log(organizations);
    };
    getStuff();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Your organizations</h1>
      {organizations.map((organization: any) => (
        <div key={organization.id}>{organization.name}</div>
      ))}
    </div>
  );
}
