export interface UserType {
  id: string;
  created: string;
  updated: string;
  email: string;
  verified: boolean;
  lastResetSentAt: string;
  lastVerificationSentAt: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  created: string;
  updated: string;
  "@collectionId": string;
  "@collectionName": string;
  avatar: string;
  avatarUrl: string;
  name: string;
  userId: string;
  "@expand":{};
}


