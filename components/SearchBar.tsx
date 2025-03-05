import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchBarProps = {
  onSearch: (value: string) => void;
  onFilter: (filter: string) => void;
  className?: string;
  searchTerm?: string;
  status?: string;
};

export function SearchBar({ 
  onSearch, 
  onFilter, 
  className = "", 
  searchTerm = "", 
  status = "all" 
}: SearchBarProps) {

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="Search members by name, email..."
          className="w-full pl-10 pr-4"
          defaultValue={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <div className="p-2 text-sm font-medium">Status</div>
              <DropdownMenuRadioGroup
                value={status}
                onValueChange={onFilter}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">
                  Active
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="inactive">
                  Inactive
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">
                  Pending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="p-2 text-sm font-medium">Role</div>
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="admin">
                  Administrator
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="moderator">
                  Moderator
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="member">
                  Member
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => onSearch(searchTerm)}>Search</Button>
      </div>
    </div>
  );
}

export default SearchBar;
