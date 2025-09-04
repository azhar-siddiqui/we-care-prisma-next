import InventoryManagementImg from '../../../public/images/InventoryManagementDashboard.jpg';
import patientReportGenerationImg from '../../../public/images/PatientReportGeneration.jpg';
import SassItegrationImg from '../../../public/images/sass-ntegration.jpg';

import {
  Clock,
  Cloud,
  FileText,
  Heart,
  Hospital,
  Microscope,
  Package,
  RefreshCw,
  Shield,
  Stethoscope,
  TrendingUp,
  User,
  UserCog,
  Users,
} from 'lucide-react';

export const benefitsData = [
  {
    id: 1,
    icon: Clock, // Reference the Lucide Clock component
    title: 'Save up to 40% of administrative time',
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Increase accuracy by eliminating manual data entry',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Enhance data security with role-based access',
  },
  {
    id: 4,
    icon: RefreshCw,
    title: 'Real-time inventory updates and alerts',
  },
  {
    id: 5,
    icon: Users,
    title: 'Improve patient satisfaction with faster results',
  },
];

export const trustedData = [
  { icon: Hospital, name: 'MedCenter' },
  { icon: Stethoscope, name: 'HealthPlus' },
  { icon: Microscope, name: 'BioLabs' },
  { icon: Heart, name: 'VitaCare' },
  { icon: Stethoscope, name: 'MediTrust' },
];

export const featuresData = [
  {
    icon: FileText,
    title: 'Patient Report Generation',
    description:
      'Create professional, customizable reports with automated data integration and easy sharing options.',
    image: patientReportGenerationImg,
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description:
      'Track supplies, set reorder points, and manage expiration dates with our intuitive inventory system.',
    image: InventoryManagementImg,
  },
  {
    icon: Cloud,
    title: 'SAAS Integration',
    description:
      'Seamlessly connect with other healthcare systems through our secure API and integration tools.',
    image: SassItegrationImg,
  },
];

// export const productData = [
//   {
//     title: "Patient Report Generation",
//     description:
//       "Create comprehensive reports with customizable templates and automated data population.",
//     image: PatientReportGenerationImg,
//   },
//   {
//     title: "Inventory Management Dashboard",
//     description:
//       "Track supplies, manage stock levels, and receive alerts for low inventory items.",
//     image: InventoryManagementDashboardImg,
//   },
//   {
//     title: "Patient Management System",
//     description:
//       "Efficiently manage patient records, test history, and communication all in one place.",
//     image: PatientManagementSystemImg,
//   },
// ];

export const testimonialsData = [
  {
    id: 1,
    quote:
      "LabFlow has reduced our report generation time by 65% and virtually eliminated data entry errors. It's been a game-changer for our busy pathology lab.",
    name: 'Dr. Sarah Johnson',
    role: 'Lab Director, MedCenter Hospital',
    avatar: UserCog,
    rating: 3.5,
  },
  {
    id: 2,
    quote:
      'The inventory management system has saved us thousands in expired reagents. We now have perfect visibility into our supplies and can plan accordingly.',
    name: 'Michael Chen',
    role: 'Lab Operations Manager, BioLabs Inc.',
    avatar: User,
    rating: 4.5,
  },
  {
    id: 3,
    quote:
      'Integration with our existing hospital systems was seamless. Patient data flows automatically, and our staff can focus on analysis rather than paperwork.',
    name: 'Dr. Emily Rodriguez',
    role: 'Chief Pathologist, HealthPlus Network',
    avatar: UserCog,
    rating: 5,
  },
  {
    id: 4,
    quote:
      'LabFlow’s real-time alerts have drastically improved our workflow. We can now address issues instantly, ensuring no delays in patient diagnostics.',
    name: 'Dr. James Patel',
    role: 'Senior Pathologist, VitaCare Clinics',
    avatar: UserCog,
    rating: 4.0,
  },
  {
    id: 5,
    quote:
      'The user-friendly interface made onboarding our team a breeze. Even our less tech-savvy staff were up and running in no time.',
    name: 'Lisa Nguyen',
    role: 'Lab Supervisor, MediTrust Labs',
    avatar: User,
    rating: 4.2,
  },
  {
    id: 6,
    quote:
      'With LabFlow, we’ve cut down on administrative costs significantly. The automated reporting tools are both powerful and easy to customize.',
    name: 'Dr. Rachel Kim',
    role: 'Medical Director, BioHealth Solutions',
    avatar: UserCog,
    rating: 3.8,
  },
  {
    id: 7,
    quote:
      'The secure API integration has allowed us to connect with third-party systems effortlessly, improving our data-sharing capabilities across departments.',
    name: 'Robert Sullivan',
    role: 'IT Manager, HealthPlus Network',
    avatar: User,
    rating: 4.7,
  },
  {
    id: 8,
    quote:
      'LabFlow’s inventory tracking has eliminated stockouts in our lab. We always know what’s on hand and when to reorder critical supplies.',
    name: 'Dr. Maria Gonzalez',
    role: 'Lab Operations Lead, MedCenter Hospital',
    avatar: UserCog,
    rating: 4.3,
  },
];

export const faqData = [
  {
    id: 1,
    question: 'How easy is it to migrate from our current system?',
    answer:
      'We offer comprehensive migration services to ensure a smooth transition. Our team will work with you to import your existing data and provide training for your staff.',
  },
  {
    id: 2,
    question: 'Is the system compliant with healthcare regulations?',
    answer:
      'Yes, our platform is fully compliant with HIPAA, GDPR, and other relevant healthcare regulations to ensure patient data security and privacy.',
  },
  {
    id: 3,
    question: 'Can I customize the reports to match our branding?',
    answer:
      'Absolutely! Our Professional and Enterprise plans offer extensive customization options including logos, color schemes, and custom templates.',
  },
  {
    id: 4,
    question: 'How does the inventory management system work?',
    answer:
      'Our inventory system tracks usage, expiration dates, and stock levels. You can set reorder points to receive automatic notifications when supplies run low.',
  },
  {
    id: 5,
    question: 'What kind of support do you offer?',
    answer:
      'We provide email support for all plans, with phone support for Professional and Enterprise plans. Enterprise customers also receive 24/7 premium support and a dedicated account manager.',
  },
  {
    id: 6,
    question: 'Can I integrate with our existing hospital management system?',
    answer:
      'Yes, our API allows for integration with most major hospital and healthcare management systems. Custom integrations are available for Enterprise customers.',
  },
];
