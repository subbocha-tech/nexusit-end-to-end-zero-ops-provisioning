import { IndexedEntity } from "./core-utils";
import type { User, AppEntry, ProvisioningRequest, License } from "@shared/types";
import { MOCK_USERS, MOCK_APPS, MOCK_REQUESTS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export class AppEntity extends IndexedEntity<AppEntry> {
  static readonly entityName = "app";
  static readonly indexName = "apps";
  static readonly initialState: AppEntry = { 
    id: "", 
    name: "", 
    category: "productivity", 
    icon: "", 
    description: "", 
    monthlyCost: 0 
  };
  static seedData = MOCK_APPS;
}
export class RequestEntity extends IndexedEntity<ProvisioningRequest> {
  static readonly entityName = "request";
  static readonly indexName = "requests";
  static readonly initialState: ProvisioningRequest = {
    id: "",
    appId: "",
    appName: "",
    userId: "",
    userName: "",
    department: "",
    status: "pending",
    justification: "",
    createdAt: "",
    updatedAt: ""
  };
  static seedData = MOCK_REQUESTS;
}
export class LicenseEntity extends IndexedEntity<License> {
  static readonly entityName = "license";
  static readonly indexName = "licenses";
  static readonly initialState: License = {
    id: "",
    appId: "",
    userId: "",
    userName: "",
    appName: "",
    status: "active",
    seatType: "Standard",
    monthlyCost: 0,
    grantedAt: ""
  };
}