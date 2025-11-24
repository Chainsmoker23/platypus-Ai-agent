import React from 'react';
import TabsBar from './TabsBar';
import CodeWindow from './CodeWindow';

interface EditorPanelProps {
  tabs: string[];
  activeTab: string | null;
  onTabSelect: (path: string) => void;
  onTabClose: (path: string) => void;
  fileContent: React.ReactNode | null;
  rawFileContent: string;
  isLoading: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = (props) => {
  return (
    <div className="flex-grow flex flex-col bg-[#1e1e1e] overflow-hidden">
      <TabsBar
        tabs={props.tabs}
        activeTab={props.activeTab}
        onTabSelect={props.onTabSelect}
        onTabClose={props.onTabClose}
      />
      <CodeWindow
        content={props.fileContent}
        rawContent={props.rawFileContent}
        isLoading={props.isLoading}
      />
    </div>
  );
};

export default EditorPanel;
