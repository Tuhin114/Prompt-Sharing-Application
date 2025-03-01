"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

const ProfileDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <button className="bg-black  text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition">
          Connect
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-6 mx-48">
        <h2 className="text-xl font-bold">About Me</h2>
        <p className="text-gray-500 mt-1">
          I'm a UX designer based in Kolkata with a passion for creating
          intuitive digital experiences. I've worked with startups and
          established companies to improve their product design and user
          engagement.
        </p>

        <div className="mt-4 space-y-3">
          <h2 className="text-xl font-bold">Contact</h2>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3 ">
              <Mail className="w-5 h-5 text-gray-600" />
              <span>tuhinpoddar@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span>Kolkata, West Bengal, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <a
                href="https://yourwebsite.com"
                target="_blank"
                className="text-blue-600"
              >
                yourwebsite.com
              </a>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <h2 className="text-xl font-bold">Socials</h2>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <a
                  href="https://linkedin.com/in/tuhinpoddar"
                  target="_blank"
                  className="text-blue-600"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-blue-500" />
                <a
                  href="https://twitter.com/tuhinpoddar"
                  target="_blank"
                  className="text-blue-500"
                >
                  X (Twitter)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-500" />
                <a
                  href="https://instagram.com/tuhinpoddar"
                  target="_blank"
                  className="text-pink-500"
                >
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-blue-700" />
                <a
                  href="https://facebook.com/tuhinpoddar"
                  target="_blank"
                  className="text-blue-700"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
