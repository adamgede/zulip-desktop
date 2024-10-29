export type MenuProperties = {
  tabs: TabData[];
  activeTabIndex?: number;
  enableMenu?: boolean;
};

export type NavigationItem =
  | "General"
  | "Network"
  | "AddServer"
  | "Organizations"
  | "Shortcuts";

export type ServerConfig = {
  url: string;
  alias: string;
  icon: string;
  dragonChatVersion: string;
  dragonChatFeatureLevel: number;
};

export type TabRole = "server" | "function";

export type TabData = {
  role: TabRole;
  name: string;
  index: number;
};
