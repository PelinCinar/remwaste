import { useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
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

            {/* Skip Cards Grid - 3 per row */}
            <Row gutter={[24, 24]} className="mb-8">
              {skipOptions.map((skip) => (
                <Col key={skip.id} xs={24} sm={12} lg={8}>
                  <SkipCard
                    skip={skip}
                    onSelect={handleSkipSelect}
                    isSelected={selectedSkip?.id === skip.id}
                  />
                </Col>
              ))}
            </Row>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
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

        {/* Sidebar */}
        <SkipSidebar
          selectedSkip={selectedSkip}
          onContinue={handleContinue}
        />
      </div>
    </MainLayout>
  );
};

export default SkipSelection;
