'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PlusCircle, Copy, Check, Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const CopyCodeToClipboard = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const url = `${window.location.origin}/join/${code}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Copy invite link
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium">Organization Code</h4>
              <p className="text-sm text-muted-foreground">
                Share this code with team members you want to invite
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input value={url} readOnly className="pl-8 pr-12 text-sm" />
              </div>
              <Button
                size="sm"
                onClick={handleCopy}
                className={cn(
                  'transition-all',
                  copied ? 'bg-green-600 hover:bg-green-700' : ''
                )}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CopyCodeToClipboard;
