import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const EditProfileDialog = ({ profile, onSave }) => {
  const [formData, setFormData] = useState({
    name: "Tuhin Poddar",
    bio: "B.Tech CS '27 | 3⭐ @GeeksforGeeks(Max: 1689) | 400+ @LeetCode(Max: 1606) | Full-Stack Web Dev | Next.js | TypeScript | @Hack4Bengal 3.0 Runner up",
    email: "tuhin.poddar@example.com", // Replace with your actual email
    location: "Kolkata, West Bengal, India",
    website: "https://linktr.ee/Tuhin114",
    linkedin: "https://www.linkedin.com/in/tuhin114/",
    twitter: "https://twitter.com/4334Tuhin",
    instagram: "https://www.instagram.com/tuhin.poddar", // Replace with your actual Instagram link
    facebook: "https://www.facebook.com/tuhin.poddar", // Replace with your actual Facebook link
    banner: "https://your-banner-image-url.com/banner.jpg", // Replace with the actual banner image URL
    avatar: "https://your-avatar-image-url.com/avatar.jpg",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        {/* Banner & Profile Image */}
        <div className="space-y-2">
          <label>Banner Image URL</label>
          <Input
            name="banner"
            value={formData.banner}
            onChange={handleChange}
          />
          <label>Profile Image URL</label>
          <Input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <label>Name</label>
          <Input name="name" value={formData.name} onChange={handleChange} />
          <label>Bio</label>
          <Textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <label>Email</label>
          <Input name="email" value={formData.email} onChange={handleChange} />
          <label>Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <label>Website</label>
          <Input
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        {/* Social Links */}
        <div className="space-y-2">
          <label>LinkedIn</label>
          <Input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <label>X (Twitter)</label>
          <Input
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
          <label>Instagram</label>
          <Input
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
          <label>Facebook</label>
          <Input
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        <Button onClick={() => onSave(formData)}>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
