import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { OwnData } from '@/lib/services/usersService';
import { Camera, LogOut, MapPin, Phone } from 'lucide-react';

const ProfileSideBar = async ({ user }: { user: OwnData }) => {
  console.log(user);
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full md:w-80">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.profileImageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback className="text-xl">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
            </div>
            <h2 className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm">
                {user.city}, {user.country}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex flex-col gap-2">
          <Button variant="outline" className="w-full" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSideBar;
