'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/app/components/shared/Input';
import FieldError from '@/app/components/Validation/FieldError';
import { useRoleStore } from '@/app/store/useRolesStore'; // assuming roles here

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { RoleType } from '@/app/types/RoleType';

type EditUserProps = {
  role: RoleType | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const EditUser = ({ role, open, onClose, onSuccess }: EditUserProps) => {
  const { AdminUpdateRole, loading } = useRoleStore(); // assumed store function
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    if (role) {
      setForm({ name: role.name || '' });
    }
  }, [role]);

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    try {
      const isSuccess = await AdminUpdateRole(role.id, form); // correctly passing form
      if (isSuccess) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>
            Update role information and save changes.
          </DialogDescription>
        </DialogHeader>

        {role && (
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
