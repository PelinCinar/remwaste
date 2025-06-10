import { Card, Typography, Button } from "antd";
import { ArrowRight } from "lucide-react";

const { Title, Text } = Typography;

const SkipSidebar = () => {
  return (
    <div className="w-80 bg-slate-800/50 backdrop-blur-sm border-l border-slate-700/50 p-6 min-h-screen">
      {/* Selected Skip Header */}
      <div className="mb-6">
        <Title level={3} className="!text-white !mb-2">
          Selected Skip
        </Title>
      </div>

      {/* Selected Skip Content - Always show placeholder */}
      <div className="text-center py-12">
        <Text className="text-slate-400">Select a skip to see details</Text>
      </div>
    </div>
  );
};

export default SkipSidebar;
