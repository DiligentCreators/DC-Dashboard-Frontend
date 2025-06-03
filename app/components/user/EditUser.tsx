'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/app/components/shared/Input';
import FieldError from '@/app/components/Validation/FieldError';
import { useUserStore } from '@/app/store/useAdminUserStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserType } from '@/app/types/UserType';

type EditUserProps = {
  user: UserType | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const EditUser = ({ user, open, onClose, onSuccess }: EditUserProps) => {
  const { AdminUpdateUser, loading } = useUserStore();
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    is_active: true,
    password: '', // Simplified to non-optional for consistency
    password_confirmation: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        is_active: Boolean(user.is_active),
        password: '', // Reset password fields on user change
        password_confirmation: '',
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof typeof form, value: string) => {
    if (field === 'password') {
      setForm({
        ...form,
        password: value,
        password_confirmation: value, // Auto-sync confirmation with password
      });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleActiveChange = (value: string) => {
    setForm({ ...form, is_active: value === '1' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Create payload, excluding password fields if password is empty
    const submitData: Partial<typeof form> = {
      name: form.name,
      username: form.username,
      email: form.email,
      is_active: form.is_active,
    };

    if (form.password && form.password.trim() !== '') {
      submitData.password = form.password;
      submitData.password_confirmation = form.password_confirmation;
    }

    try {

      const isSuccess = await AdminUpdateUser(user.id, submitData);
      if (isSuccess) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Update failed:', error);
      // Dialog stays open to show validation errors
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information and save changes. Leave password fields blank to keep the current password.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              name="name"
              label="Name"
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <FieldError field="name" />

            <Input
              id="username"
              name="username"
              label="Username"
              type="text"
              value={form.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
            <FieldError field="username" />

            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <FieldError field="email" />

            <Input
              id="password"
              name="password"
              label="New Password (optional)"
              type="password"
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <FieldError field="password" />


            <Select
              value={form.is_active ? '1' : '0'}
              onValueChange={handleActiveChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Active Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <FieldError field="is_active" />

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;