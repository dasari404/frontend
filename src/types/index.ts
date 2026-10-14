export interface User {
  id: number;
  email: string;
  role: 'customer' | 'guide' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Customer {
  id: number;
  customerToken: string;
  userId: number;
  fullName: string;
  mobile: string;
  ageGroup?: string;
  nationality?: string;
  preferredLanguage?: string;
  travelType?: string;
  budgetRange?: string;
  accessibilityNeeds?: string;
  preferredDestinations?: string;
  preferredExperiences?: string;
  foodPreferences?: string;
  travelStyle?: string;
  onboardingComplete: boolean;
  onboardingStep: number;
  createdAt: string;
  updatedAt: string;
}

export interface Guide {
  id: number;
  guideToken: string;
  userId: number;
  fullName: string;
  mobile: string;
  city: string;
  state: string;
  locationCode?: string;
  languages?: string;
  experienceYears?: number;
  bio?: string;
  specializations?: string;
  govtIdType?: string;
  govtIdNumber?: string;
  dailyRate?: number;
  availability?: string;
  avatarUrl?: string;
  guideLevel?: string;
  rating?: number;
  reviewCount: number;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  onboardingComplete: boolean;
  onboardingStep: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  bookingToken: string;
  customerId: number;
  guideId: number;
  destination: string;
  startDate: string;
  endDate: string;
  meetingPoint?: string;
  people: number;
  specialRequests?: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse extends Booking {
  customerName: string;
  customerToken: string;
  guideName: string;
  guideToken: string;
  guideCity: string;
}

export interface Review {
  id: number;
  bookingId: number;
  customerId: number;
  guideId: number;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ReviewResponse {
  rating: number;
  comment?: string;
  createdAt: string;
  customerName: string;
}

export interface TravelRecord {
  id: number;
  travelToken: string;
  bookingId: number;
  customerId: number;
  guideId: number;
  placesVisited?: string;
  guideNotes?: string;
  customerNotes?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  portalToken?: string;
  onboardingComplete?: boolean;
  verificationStatus?: string;
}

export interface UserProfileResponse {
  user: {
    id: number;
    email: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
  };
  profile: Customer | Guide | null;
}

export interface GuidePublicResponse {
  id: number;
  guideToken: string;
  fullName: string;
  mobile: string;
  city: string;
  state: string;
  locationCode?: string;
  languages?: string;
  experienceYears?: number;
  bio?: string;
  specializations?: string;
  dailyRate?: number;
  availability?: string;
  avatarUrl?: string;
  guideLevel?: string;
  rating?: number;
  reviewCount: number;
  verificationStatus: string;
  onboardingComplete: boolean;
}

export interface DashboardStats {
  totalCustomers: number;
  totalGuides: number;
  pendingGuides: number;
  approvedGuides: number;
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalRevenue: number;
}

export interface AuditLogEntry {
  id: number;
  userId: number;
  userEmail: string;
  action: string;
  entity: string;
  entityId: string;
  ipAddress?: string;
  createdAt: string;
}

export interface AdminDashboardResponse {
  stats: DashboardStats;
  recentActivity: AuditLogEntry[];
}

export interface CreateBookingRequest {
  guideId: number;
  destination: string;
  startDate: string;
  endDate: string;
  meetingPoint?: string;
  people: number;
  specialRequests?: string;
}

export interface CompleteBookingRequest {
  placesVisited: string[];
  guideNotes?: string;
  customerNotes?: string;
}

export interface CreateReviewRequest {
  bookingId: number;
  rating: number;
  comment?: string;
}

export interface VerifyGuideRequest {
  action: 'approve' | 'reject';
  adminNotes?: string;
}

export interface UpdateBookingStatusRequest {
  status: string;
}

export interface OnboardingStepRequest {
  [key: string]: any;
}
