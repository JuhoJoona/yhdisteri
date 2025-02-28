"use client";
import { SignUp } from "@clerk/nextjs";
import { Card, CardHeader } from "@/components/ui/card";


export default function Page() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      
      
      <Card className="w-full max-w-md justify-center items-center">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md bg-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary font-semibold text-xl">Y</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <SignUp />
      </Card>
    </div>
  );
}
