import { Card, Button, Badge, Typography } from 'antd';
import { Ruler, Package } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectSelectedSkip } from '../redux';

// Import skip images
import skip4Yard from '../assets/images/4yard.jpg';
import skip6Yard from '../assets/images/6yard.jpg';
import skip8Yard from '../assets/images/8yard.jpg';
import skip10Yard from '../assets/images/10yard.jpg';
import skip12Yard from '../assets/images/12yard.jpg';
import skip14Yard from '../assets/images/14yard.jpg';

const { Title, Text } = Typography;

// Image mapping function
const getSkipImage = (yards) => {
  const imageMap = {
    4: skip4Yard,
    6: skip6Yard,
    8: skip8Yard,
    10: skip10Yard,
    12: skip12Yard,
    14: skip14Yard,
  };
  return imageMap[yards] || skip4Yard; // fallback to 4yard image
};

const SkipCard = ({ skip, onSelect, hideMobileSelection = false }) => {
  const selectedSkip = useSelector(selectSelectedSkip);
  const isSelected = selectedSkip?.id === skip.id;

  const handleSelect = () => {
    onSelect(skip);
  };

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col
        ${isSelected && !hideMobileSelection
          ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 transform translate-y-[-2px]'
          : 'hover:shadow-lg hover:shadow-slate-700/30'
        }
        ${hideMobileSelection && isSelected ? 'md:ring-2 md:ring-blue-500 md:shadow-lg md:shadow-blue-500/20 md:transform md:translate-y-[-2px]' : ''}
        bg-slate-800/80 backdrop-blur-sm border-slate-700/60
        [&_.ant-card]:border-none [&]:border-none
      `}
      style={{
        height: '540px', // 520px → 540px (20px daha fazla alan)
        border: 'none'
      }}

      cover={
        <div className="relative">
          {/* Size Label Header - Above Image */}
          <div className="bg-slate-800/90 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
            <Title level={4} className="!text-white !mb-0 font-semibold">
              {skip.sizeLabel}
            </Title>
            {/* Popular Badge - In Header */}
            {skip.popular && (
              <Badge
                count="Popular"
                style={{
                  backgroundColor: '#3b82f6',
                  fontSize: '11px',
                  fontWeight: '500',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px'
                }}
              />
            )}
          </div>

          {/* Skip Image - Clean without overlays */}
          <div className="h-40 overflow-hidden">
            <img
              src={getSkipImage(skip.yards)}
              alt={skip.sizeLabel}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      }
    >
      {/* Card Content - Fixed Layout */}
      <div className="p-4 flex flex-col flex-1">
        {/* Skip Details - Responsive Layout */}
        <div className="mb-3" style={{ minHeight: '45px' }}>
          {/* Desktop/Tablet: Side by Side */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-400" />
              <Text className="text-slate-300 text-sm">
                {skip.dimensions}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-green-400" />
              <Text className="text-slate-300 text-sm">
                {skip.capacity}
              </Text>
            </div>
          </div>

          {/* Mobile: Stacked */}
          <div className="sm:hidden space-y-2">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-400" />
              <Text className="text-slate-300 text-sm">
                {skip.dimensions}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-green-400" />
              <Text className="text-slate-300 text-sm">
                {skip.capacity}
              </Text>
            </div>
          </div>
        </div>

        {/* Suitable For Tags - Fixed Height */}
        <div className="mb-3" style={{ minHeight: '75px' }}>
          <Text className="text-slate-400 text-xs mb-1 block">Suitable for:</Text>
          <div className="flex flex-wrap gap-1">
            {skip.suitableFor.slice(0, 2).map((use, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-700/70 text-slate-200 text-xs rounded-full border border-slate-600/50"
              >
                {use}
              </span>
            ))}
          </div>
        </div>

        {/* Price Section - Fixed Height */}
        <div className="mb-3" style={{ minHeight: '70px' }}>
          <div className="flex items-baseline justify-between">
            <Title level={3} className="!text-blue-400 !mb-0">
              £{skip.price}
            </Title>
            <div className="text-right">
              <Text className="text-slate-400 text-xs block">Max weight</Text>
              <Text className="text-slate-200 text-sm font-semibold">
                {skip.maxWeight}
              </Text>
            </div>
          </div>
          <Text className="text-slate-400 text-sm">
            {skip.hirePeriod}
          </Text>
        </div>

        {/* Action Button - Always at bottom */}
        <div className="mt-auto mb-2">
          <Button
            type={isSelected && !hideMobileSelection ? "primary" : "default"}
            size="large"
            onClick={handleSelect}
            block
            className={`
              transition-all duration-300
              ${isSelected && !hideMobileSelection
                ? '!bg-blue-600 !border-blue-600 !text-white hover:!bg-blue-700 shadow-lg shadow-blue-500/30'
                : 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:border-slate-500'
              }
              ${hideMobileSelection && isSelected ? 'md:!bg-blue-600 md:!border-blue-600 md:!text-white md:hover:!bg-blue-700 md:shadow-lg md:shadow-blue-500/30' : ''}
            `}
          >
            {isSelected && !hideMobileSelection ? '✓ Selected' : 'Select This Skip'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SkipCard;
