"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Setup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationTab, setOrganizationTab] = useState<"join" | "create">(
    "join"
  );
  const { getToken } = useAuth();
  const [organizationCode, setOrganizationCode] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const { user } = useUser();

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user?.emailAddresses[0].emailAddress, "starting submission");

    if (organizationTab === "join" && organizationCode.length !== 6) {
      toast({
        title: "Invalid organization code",
        description: "Organization code must be 6 characters.",
        variant: "destructive",
      });
      return;
    }
    if (organizationTab === "create" && !organizationName) {
      toast({
        title: "Organization name required",
        description: "Please provide a name for your organization.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    console.log(user?.emailAddresses[0].emailAddress, "starting again");
    try {
      const organizationInfo =
        organizationTab === "join"
          ? { type: "join" as const, code: organizationCode }
          : { type: "create" as const, name: organizationName };
      console.log(organizationInfo, "organizationInfo");

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = `${baseUrl}/users/me/create`;

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
        body: JSON.stringify({
          user: {
            externalId: user?.id,
            firstName,
            lastName,
            organizationInfo,
            email: user?.emailAddresses[0].emailAddress,
            phone,
          },
        }),
      });
      console.log(response, "response");
      if (response.ok) {
        toast({
          title: "Registration successful",
          description:
            organizationTab === "join"
              ? "You've joined the organization successfully!"
              : "Your organization has been created successfully!",
        });

        const data = await response.json();
        console.log(data);
        if (organizationTab === "create") {
          router.push("/plans");
        } else {
          router.push(`/dashboard/${data.user.organizationId}`);
        }
      } else {
        console.log(response, "response");
        toast({
          title: "Registration failed",
          description:
            "This email may already be in use or the organization code is invalid.",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Registration error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary font-semibold text-xl">Y</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to create a Yhdisteri account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="+1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label>Organization</Label>
              <Tabs
                defaultValue="join"
                value={organizationTab}
                onValueChange={(value: "join" | "create") =>
                  setOrganizationTab(value)
                }
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="join">Join Existing</TabsTrigger>
                  <TabsTrigger value="create">Create New</TabsTrigger>
                </TabsList>

                <TabsContent value="join" className="space-y-4 my-2">
                  <div className="space-y-2">
                    <Label htmlFor="organizationCode">
                      Organization Code (6 characters)
                    </Label>
                    <Input
                      id="organizationCode"
                      type="text"
                      placeholder="AB1234"
                      value={organizationCode}
                      onChange={(e) =>
                        setOrganizationCode(
                          e.target.value.toUpperCase().slice(0, 6)
                        )
                      }
                      className="uppercase"
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground ">
                      Enter the 6-character code provided by your organization.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="create" className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      type="text"
                      placeholder="Acme Inc."
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      You&apos;ll receive a code to invite others once your
                      organization is created.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  {organizationTab === "join" ? (
                    <>Join Organization</>
                  ) : (
                    <>Create Organization</>
                  )}
                </>
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
