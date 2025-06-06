export interface AppState {
  page: Page | null;
  theme: Theme | null;
  blockDefinitions: BlockDefinition[];
  layouts: Layout[];
  loading: boolean;
}
export interface BlockInstance {
  blockDefId: string;
  instanceId: string;
  layoutId: string;
  content: Record<string, any>; // Can include text, style, media etc.
  position: number;
}

export interface Page {
  id: string;
  themeId: string;
  name: string;
  slug: string;
  blocks: BlockInstance[];
  metadata: PageMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface PageMetadata {
  title: string;
  description: string;
}

export interface Layout {
  id: string;
  blockType: string; // e.g., "CardBlock"
  name: string;
  description: string;
  htmlStructure: string; // e.g., "<div>{{content}}</div>"
  defaultConfig: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BlockDefinition {
  id: string;
  name: string;
  layout_id: string;
  settings: {
    paddings: {
      top: number;
      bottom: number;
    };
    background: {
      type: string;
      backgroundColorId: string | null;
    };
  };
  data: Record<string, any>;
  access: {
    duplicate: boolean;
    delete: boolean;
    sortable: boolean;
  };
  unique: boolean;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  id: string;
  name: string;
  globalStyles: GlobalStyles;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalStyles {
  [key: string]: any;
}
