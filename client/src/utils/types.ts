import { AsyncResource } from "async_hooks";

export enum HORIZONTAL_ALIGNMENT {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}

export enum VERTICAL_ALIGNMENT {
  TOP = "top",
  CENTER = "center",
  BOTTOM = "bottom"
}

export enum COLUMN_SIZE {
  ONE_THIRD = "one-third",
  ONE_HALF = "one-half",
  ONE_QUARTER = "one-quarter"
}

export enum SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

// PLAYFAB TYPES BEGIN

type EmailVerificationStatus = "Confirmed" | "Pending" | "Unverified";
type Platform =
  | "AndroidDevice"
  | "Custom"
  | "CustomServer"
  | "Facebook"
  | "FacebookInstantGames"
  | "GameCenter"
  | "GameServer"
  | "GooglePlay"
  | "IOSDevice"
  | "Kongregate"
  | "NintendoSwitch"
  | "OpenIdConnect"
  | "PSN"
  | "PlayFab"
  | "Steam"
  | "Twitch"
  | "Unknown"
  | "WindowsHello"
  | "XBoxLive";
export interface PlayerProfile {
  AdCampaignAttributions: {
    AttributedAt: string;
    CampaignId: string;
    Platform: string;
  };
  AvatarUrl: string;
  BannedUntil: string;
  ContactEmailAddresses: {
    EmailAddress: string;
    Name: string;
    VerificationStatus: EmailVerificationStatus;
  };
  Created: string;
  DisplayName: string;
  LastLogin: string;
  LinkedAccounts: {
    Email: string;
    Platform: Platform;
    PlatformUserId: string;
    Username: string;
  };
  Locations: {
    City: string;
    ContinentCode: "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
    CountryCode: string; // should be more specific
    Latitude: number;
    Longitude: number;
  };
  Memberships: any;
  Origination: any;
  PlayerId: string;
  PublisherId: string;
  PushNotificationRegistrations: any;
  Statistics: any;
  Tags: any;
  TitleId: string;
  TotalValueToDateInUSD: number;
  ValuesToDate: any;
}

// PLAYFAB TYPES END
