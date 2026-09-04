import { useState } from "react";
import { Plus, X, FileSpreadsheet } from "lucide-react";

interface Tab {
  id: string;
  title: string;
}

interface ExcelTabsProps {
  initialTabs?: Tab[];
  onTabChange?: (tabId: string) => void;
}

export default function ExcelTabs({
  initialTabs = [
    { id: "sheet1", title: "Sheet1" },
    { id: "sheet2", title: "Sheet2" },
    { id: "sheet3", title: "Sheet3" },
  ],
  onTabChange,
}: ExcelTabsProps) {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState<string>(initialTabs[0]?.id || "");

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    if (onTabChange) onTabChange(id);
  };

  const handleAddTab = () => {
    const newId = `sheet${tabs.length + 1}`;
    const newTab = { id: newId, title: `Sheet${tabs.length + 1}` };
    setTabs([...tabs, newTab]);
    handleSelectTab(newId);
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Prevent closing the last tab

    const filteredTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(filteredTabs);

    if (activeTabId === id) {
      const nextActive = filteredTabs[filteredTabs.length - 1].id;
      handleSelectTab(nextActive);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-gray-100">
      {/* Content Area */}
      <div className="flex-1 p-6 bg-white border-b border-gray-300 shadow-inner">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Active Workspace: {tabs.find((t) => t.id === activeTabId)?.title}
        </h2>
        <p className="text-gray-600">
          Content for <span className="font-semibold">{activeTabId}</span> goes here.
        </p>
      </div>

      {/* Excel Bottom Tab Bar */}
      <div className="flex items-center bg-gray-200 border-t border-gray-300 px-2 pt-1 overflow-x-auto select-none">
        {/* Ready Indicator Icon */}
        <div className="flex items-center gap-1 text-xs font-semibold text-green-700 px-3 py-1.5 border-r border-gray-300 mr-1">
          <FileSpreadsheet className="w-4 h-4" />
          <span>READY</span>
        </div>

        {/* Tab Items */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-1.5 text-xs font-medium cursor-pointer rounded-t border-t border-x transition-colors ${
                  isActive
                    ? "bg-white border-gray-300 text-green-700 border-t-2 border-t-green-600 -mb-[1px] font-semibold"
                    : "bg-gray-200 border-transparent text-gray-600 hover:bg-gray-300 hover:text-gray-800"
                }`}
              >
                <span>{tab.title}</span>

                {/* Close Button */}
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-gray-300 text-gray-500 hover:text-red-600 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Add New Sheet Button */}
        <button
          onClick={handleAddTab}
          className="ml-2 p-1.5 rounded-full hover:bg-gray-300 text-gray-600 transition-colors"
          title="Insert Worksheet"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}