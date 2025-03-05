"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { createUserAction } from "./actions"

export default function SetupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [organizationTab, setOrganizationTab] = useState<"join" | "create">("join")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    // Get form element and create FormData from it
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    console.log("Form elements:", Array.from(form.elements));
    console.log("FormData entries:", Array.from(formData.entries()));
    
    // Add required validation for organization fields based on selected tab
    if (organizationTab === "join" && !formData.get("organizationCode")) {
      setError("Organization code is required")
      setIsLoading(false)
      return
    }
    
    if (organizationTab === "create" && !formData.get("organizationName")) {
      setError("Organization name is required")
      setIsLoading(false)
      return
    }
    
    formData.set("organizationTab", organizationTab)
    console.log("FormData entries:", Array.from(formData.entries()));
    
    try {
      const result = await createUserAction(formData)
      console.log("Action result:", result)
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push("/dashboard") // Redirect to dashboard on success
      }
    } catch (err) {
      console.error("Action error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
        <CardDescription className="text-center">Enter your information to get started with Yhdisteri</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="+1234567890" required />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>Organization</Label>
            <Tabs
              value={organizationTab}
              onValueChange={(value) => setOrganizationTab(value as "join" | "create")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="join">Join Existing</TabsTrigger>
                <TabsTrigger value="create">Create New</TabsTrigger>
              </TabsList>

              <TabsContent value="join" className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="organizationCode">Organization Code (6 characters)</Label>
                  <Input
                    id="organizationCode"
                    name="organizationCode"
                    placeholder="AB1234"
                    className="uppercase"
                    maxLength={6}
                    required={organizationTab === "join"}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-character code provided by your organization.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input 
                    id="organizationName" 
                    name="organizationName" 
                    placeholder="Acme Inc." 
                    required={organizationTab === "create"}
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll receive a code to invite others once your organization is created.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

