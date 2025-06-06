export interface TemplateNode {
  tagName: string;
  attrs?: {
    className?: (string | Record<string, boolean>)[];
    [key: string]: any;
  };
  children?: TemplateNode[];
  text?: {
    editor?: boolean;
    tooltip?: any;
    source: {
      value: string;
      typeData: string;
    };
    placeholder?: string;
  };
  component?: string | string[];
}
