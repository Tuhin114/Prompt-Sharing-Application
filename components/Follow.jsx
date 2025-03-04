"use client";

import Image from "@node_modules/next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Follow = () => {
  return (
    <Card className="rounded-xl">
      <CardContent>
        <RecentSales />
      </CardContent>
    </Card>
  );
};

export default Follow;

const RecentSales = () => {
  const followers = [
    {
      id: 1,
      name: "John Doe",
      bio: "Tech Enthusiast & Blogger",
      profileImage: "/avatars/01.png",
    },
    {
      id: 2,
      name: "Jane Doe",
      bio: "AI Researcher & Data Scientist",
      profileImage: "/avatars/02.png",
    },
    {
      id: 3,
      name: "Bob Smith",
      bio: "Web Developer & Freelancer",
      profileImage: "/avatars/03.png",
    },
    {
      id: 4,
      name: "Alice Johnson",
      bio: "UX Designer & Illustrator",
      profileImage: "/avatars/04.png",
    },
    {
      id: 5,
      name: "Michael Brown",
      bio: "Cloud Engineer & Speaker",
      profileImage: "/avatars/05.png",
    },
    {
      id: 6,
      name: "Emily Davis",
      bio: "Cybersecurity Expert",
      profileImage: "/avatars/06.png",
    },
    {
      id: 7,
      name: "Daniel Wilson",
      bio: "Blockchain & Crypto Enthusiast",
      profileImage: "/avatars/07.png",
    },
  ];

  return (
    <div className="">
      {followers.map((follower) => (
        <div
          key={follower.id}
          className="flex items-center justify-between hover:bg-gray-50 transition px-2"
        >
          <div className="flex items-center gap-4 p-2 ">
            <Image
              src="https://cdn.vectorstock.com/i/500p/97/32/man-silhouette-profile-picture-vector-2139732.jpg"
              width={30}
              height={30}
              className="rounded-full"
              alt="Profile Image"
            ></Image>
            <div className="ml-4 space-y-1">
              <p className="font-medium leading-none">{follower.name}</p>
              <p className="text-sm text-muted-foreground">{follower.bio}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="primary" className="px-4 py-1 text-sm">
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="px-4 py-1 text-sm hover:bg-black hover:text-white"
            >
              Follow Back
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
