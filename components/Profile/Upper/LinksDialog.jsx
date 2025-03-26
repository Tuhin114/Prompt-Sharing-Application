import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Linkedin, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export function LinksDialog({ profile }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Links</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-center">Social Links</DialogTitle>
          <DialogDescription className="text-center">
            Click on the icons to visit the social profiles.
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex justify-between animate-fade-up px-16 py-4"
          style={{ animationDelay: "0.4s" }}
        >
          {profile?.socialLinks?.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {profile?.socialLinks?.instagram && (
            <a
              href={profile.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Instagram className="h-6 w-6" />
            </a>
          )}
          {profile?.socialLinks?.facebook && (
            <a
              href={profile.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Facebook className="h-6 w-6" />
            </a>
          )}
          {profile?.socialLinks?.twitter && (
            <a
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Twitter className="h-6 w-6" />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="social-icon">
              <Mail className="h-6 w-6" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
