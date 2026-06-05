import { Heart, UserCheck, Building2 } from "lucide-react";

export const DEFAULT_URLS = {
  customer: import.meta.env.VITE_CUSTOMER_URL || "http://localhost:3000",
  practitioner: import.meta.env.VITE_PRACTITIONER_URL || "http://localhost:3002",
  clinic: import.meta.env.VITE_CLINIC_URL || "http://localhost:3001",
};

export const PORTALS_DATA = [
  {
    id: "customer",
    title: "Customer Portal",
    subtitle: "For Patients & Clients",
    description:
      "Search and book therapy sessions with certified practitioners. Access your personal dashboard, intake forms, wellness resources, and billing history in one secure place.",
    benefits: [
      "Browse & book certified therapists",
      "Secure online payments via Stripe",
      "Confidential intake & health forms",
      "Wellness blog & educational content",
    ],
    icon: Heart,
    badge: "Client Access",
    accentBorder: "border-t-4 border-t-green-500",
    iconBg: "bg-green-100 text-green-600",
    darkIconBg: "bg-green-900 text-green-300",
    themeClass: "portal-card--green",
  },
  {
    id: "practitioner",
    title: "Practitioner Portal",
    subtitle: "For Licensed Therapists",
    description:
      "Manage your clinical practice from one dashboard. Handle appointments, patient EMR records, earnings reports, and customize your public practitioner profile listing.",
    benefits: [
      "Patient appointment scheduling",
      "EMR records & session notes",
      "Earnings reports & invoicing",
      "Profile & SEO management",
    ],
    icon: UserCheck,
    badge: "Practitioner Access",
    accentBorder: "border-t-4 border-t-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
    darkIconBg: "bg-blue-900 text-blue-300",
    themeClass: "portal-card--navy",
  },
  {
    id: "clinic",
    title: "Clinic Portal",
    subtitle: "For Clinics & Institutions",
    description:
      "A powerful management console for healthcare institutions. Onboard multiple practitioners, coordinate bookings, run analytics reports, and manage staff access roles.",
    benefits: [
      "Multi-practitioner onboarding",
      "Clinic-wide booking management",
      "Analytics & performance reports",
      "Staff roles & access control",
    ],
    icon: Building2,
    badge: "Enterprise Access",
    accentBorder: "border-t-4 border-t-cyan-500",
    iconBg: "bg-cyan-100 text-cyan-600",
    darkIconBg: "bg-cyan-900 text-cyan-300",
    themeClass: "portal-card--teal",
  },
];
