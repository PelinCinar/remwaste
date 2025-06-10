import { useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowLeft, Truck } from 'lucide-react';
import SkipCard from '../components/SkipCard';
import SkipSidebar from '../components/SkipSidebar';
import skipOptions from '../data/skipData';
import MainLayout from '../layouts/MainLayout';
import PageContainer from '../layouts/PageContainer';

const { Title, Text } = Typography;

const SkipSelection = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      console.log('Selected skip:', selectedSkip);
      // Navigate to next step
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1">
          <PageContainer>
            {/* Header Section */}
            {/* <div className="text-center mb-8">
              <Title level={1} className="!text-white !mb-4">
                Choose Your Skip Size
              </Title>
              <Text className="text-slate-300 text-lg">
                Select the skip size that best suits your needs
              </Text>
            </div> */}

            {/* Skip Cards Grid - Mobile: 1 per row, Tablet: 2 per row, Desktop: 3 per row */}
            <Row gutter={[16, 16]} className="mb-20 md:mb-8"> {/* Mobilde alt sticky bar için extra margin */}
              {skipOptions.map((skip) => (
                <Col key={skip.id} xs={24} sm={12} lg={8}>
                  <SkipCard
                    skip={skip}
                    onSelect={handleSkipSelect}
                    isSelected={selectedSkip?.id === skip.id}
                    hideMobileSelection={true} // Mobilde seçim görünümünü gizle
                  />
                </Col>
              ))}
            </Row>

            {/* Navigation Buttons - Sadece desktop'ta görünür */}
            <div className="hidden md:flex justify-between items-center">
              <Button
                size="large"
                icon={<ArrowLeft className="w-4 h-4" />}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Back
              </Button>
            </div>
          </PageContainer>
        </div>

        {/* Sidebar - Sadece desktop'ta görünür */}
        <div className="hidden md:block">
          <SkipSidebar
            selectedSkip={selectedSkip}
            onContinue={handleContinue}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar - Sadece mobilde ve skip seçiliyse görünür */}
      {selectedSkip && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            {/* Skip Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <Text className="text-white font-semibold text-sm block">
                  {selectedSkip.sizeLabel}
                </Text>
                <Text className="text-blue-400 font-bold text-lg">
                  £{selectedSkip.price}
                </Text>
              </div>
            </div>

            {/* Hire Period */}
            <div className="text-right">
              <Text className="text-slate-400 text-xs">
                {selectedSkip.hirePeriod}
              </Text>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="large"
              className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              View Details
            </Button>
            <Button
              type="primary"
              size="large"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleContinue}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default SkipSelection;
