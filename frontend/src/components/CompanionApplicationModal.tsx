import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import BACKEND_CONFIG from "../config/backend";

interface CompanionApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSuccess: () => void;
}

export function CompanionApplicationModal({ isOpen, onClose, user, onSuccess }: CompanionApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    title: "",
    bio: "",
    experience: "",
    location: "",
    languages: "",
    specialties: "",
    whyJoin: "",
    hourlyRate: "",
    callRate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    for (const key of Object.keys(formData)) {
      if (!formData[key as keyof typeof formData] && key !== 'phone') {
        toast.error(`Please fill in all required fields.`);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/companions/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          callRate: Number(formData.callRate),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      toast.success("Application submitted successfully!");
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#1a5d47]" style={{ fontFamily: "'Cinzel', serif" }}>
            Join as a Companion
          </DialogTitle>
          <DialogDescription>
            Submit your details to become a wellness companion on Nirvaha. Our admin team will review your application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name *</label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Email *</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Phone Number</label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Professional Title *</label>
              <Input name="title" placeholder="e.g. Meditation Coach" value={formData.title} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Short Bio *</label>
            <textarea
              name="bio"
              className="w-full min-h-[80px] p-3 rounded-md border border-gray-200 bg-white"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Professional Experience *</label>
            <textarea
              name="experience"
              className="w-full min-h-[80px] p-3 rounded-md border border-gray-200 bg-white"
              placeholder="Your relevant experience, years in practice..."
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Location *</label>
              <Input name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Languages *</label>
              <Input name="languages" placeholder="English, Hindi..." value={formData.languages} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Specialties *</label>
              <Input name="specialties" placeholder="Anxiety, Reiki..." value={formData.specialties} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Hourly Rate for Video (₹) *</label>
              <Input type="number" name="hourlyRate" min="0" placeholder="e.g. 1500" value={formData.hourlyRate} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Hourly Rate for Chat (₹) *</label>
              <Input type="number" name="callRate" min="0" placeholder="e.g. 800" value={formData.callRate} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Why do you want to join Nirvaha? *</label>
            <textarea
              name="whyJoin"
              className="w-full min-h-[80px] p-3 rounded-md border border-gray-200 bg-white"
              placeholder="Your motivation..."
              value={formData.whyJoin}
              onChange={handleChange}
              required
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
