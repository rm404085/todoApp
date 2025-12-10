import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const DashboardSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-8">

      {/* Page Title */}
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            placeholder="Email Address"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            placeholder="Username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Security</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="New Password"
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Email Notifications</span>
            <Switch
              checked={notifications.email}
              onCheckedChange={(v) =>
                setNotifications({ ...notifications, email: v })
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>SMS Notifications</span>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(v) =>
                setNotifications({ ...notifications, sms: v })
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Push Notifications</span>
            <Switch
              checked={notifications.push}
              onCheckedChange={(v) =>
                setNotifications({ ...notifications, push: v })
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="px-6 py-2" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default DashboardSettings;

