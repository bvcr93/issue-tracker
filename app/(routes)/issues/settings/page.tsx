import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="maincol mt-20">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>

        <div className="flex items-center mb-4">
          <label className="w-1/3">Notification Preferences:</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Email</SelectItem>
              <SelectItem value="dark">Push Notification</SelectItem>
              <SelectItem value="system">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3">Default Project:</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Project 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Project 1</SelectItem>
              <SelectItem value="dark">Project 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3">Timezone:</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Timezone 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Timezone 1</SelectItem>
              <SelectItem value="dark">Timezone 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3">Language:</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">English</SelectItem>
              <SelectItem value="dark">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white mt-6 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>

        <div className="flex items-center mb-4">
          <label className="w-1/3">Theme:</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Light" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center mb-4">
          <label className="w-1/3">Font Size:</label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Small" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Small</SelectItem>
              <SelectItem value="dark">Meidum</SelectItem>
              <SelectItem value="system">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Add more sections for additional settings as needed */}
    </div>
  );
}
