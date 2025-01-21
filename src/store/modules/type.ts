export interface AppList {
  appName: string;
  appId: string;
  appIcon: string;
  appUrl: string;
  appDesc?: string;
}
export interface UserState {
  name?: string;
  avatar?: string;
  weChatUuid?: string;
  appList?: Array<AppList>;
  email?: string;
  lastUpdateTime?: number;
  lastBackupTime?: number;
}
