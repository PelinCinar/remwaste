import React, { useState } from 'react';
import { Row, Col, Typography, Button, Modal, Checkbox } from 'antd';
import { ArrowLeft, Truck, Settings, X, Plus, Minus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import SkipCard from '../components/SkipCard';
import SkipSidebar from '../components/SkipSidebarMinimal';
import skipOptions from '../data/skipData';
import MainLayout from '../layouts/MainLayout';
import PageContainer from '../layouts/PageContainer';
import {
  setSelectedSkip,
  selectSelectedSkip,
  selectQuantity,
  selectExtendedHire,
  selectExtendedHirePrice,
  selectExtendedHireDays,
  selectCartTotal,
  incrementQuantity,
  decrementQuantity,
  toggleExtendedHire
} from '../redux';

const { Title, Text } = Typography;

const SkipSelection = () => {
  const dispatch = useDispatch();
  const selectedSkip = useSelector(selectSelectedSkip);
  const quantity = useSelector(selectQuantity);
  const extendedHire = useSelector(selectExtendedHire);
  const extendedHirePrice = useSelector(selectExtendedHirePrice);
  const extendedHireDays = useSelector(selectExtendedHireDays);
  const cartTotal = useSelector(selectCartTotal);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkipSelect = (skip) => {
    dispatch(setSelectedSkip(skip));
  };

  const handleContinue = () => {
    if (selectedSkip) {
      console.log('Selected skip:', selectedSkip);
      // Navigate to next step
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      dispatch(incrementQuantity());
    } else {
      dispatch(decrementQuantity());
    }
  };

  const handleExtendedHireToggle = () => {
    dispatch(toggleExtendedHire());
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen">
        {/* Main Content - Add right margin for fixed sidebar */}
        <div className="flex-1 md:mr-80">
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

        {/* Fixed Sidebar - Sadece desktop'ta görünür */}
        <SkipSidebar
          selectedSkip={selectedSkip}
          onContinue={handleContinue}
        />
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
                <Text className="!text-slate-400 font-semibold text-sm block">
                  {selectedSkip.sizeLabel} {quantity > 1 && `x ${quantity}`}
                </Text>
                <Text className="!text-slate-400 font-bold text-lg">
                  £{cartTotal}
                </Text>
                {extendedHire && (
                  <Text className="!text-slate-400 text-xs">
                    +{extendedHireDays} days extended
                  </Text>
                )}
              </div>
            </div>

            {/* Hire Period */}
            <div className="text-right">
              <Text className="!text-slate-400 text-xs">
                {selectedSkip.hirePeriod}
              </Text>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="large"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              onClick={() => setIsModalOpen(true)}
              icon={<Settings className="w-4 h-4" />}
            >
              Customize
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

      {/* Mobile Customization Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="mobile-customize-modal"
        styles={{
          content: {
            backgroundColor: '#1e293b',
            border: '1px solid #475569'
          }
        }}
      >
        <div className="p-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
            <Text className="!text-white text-lg font-semibold">Customize Your Order</Text>
            <Button
              type="text"
              icon={<X className="w-5 h-5" />}
              onClick={() => setIsModalOpen(false)}
              className="!text-slate-400 hover:!text-white"
            />
          </div>

          {/* Modal Content */}
          {selectedSkip && (
            <div className="space-y-4">
              {/* Selected Skip */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-center">
                <Text className="!text-white font-semibold text-lg block">
                  {selectedSkip.sizeLabel}
                </Text>
                {selectedSkip.popular && (
                  <div className="inline-flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium mt-1">
                    🔥 Popular
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <Text className="!text-slate-400 text-sm block mb-2">Quantity</Text>
                <div className="flex items-center justify-center gap-3 bg-slate-700/50 rounded-lg p-2">
                  <Button
                    size="small"
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center bg-slate-600 border-slate-500 text-white hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 rounded"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <div className="bg-slate-800 border border-slate-600 rounded px-3 py-1 min-w-[40px] text-center">
                    <span className="!text-slate-400 font-bold text-lg">
                      {quantity}
                    </span>
                  </div>
                  <Button
                    size="small"
                    onClick={() => handleQuantityChange('increment')}
                    disabled={quantity >= 10}
                    className="w-8 h-8 flex items-center justify-center bg-slate-600 border-slate-500 text-white hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 rounded"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Extended Hire */}
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3">
                <Checkbox
                  checked={extendedHire}
                  onChange={handleExtendedHireToggle}
                  className="text-slate-400 [&_.ant-checkbox]:bg-slate-700 [&_.ant-checkbox]:border-slate-500 [&_.ant-checkbox-checked]:bg-blue-600 [&_.ant-checkbox-checked]:border-blue-600"
                >
                  <div className="flex flex-col">
                    <Text className="!text-slate-400 font-medium text-sm">
                      Extended hire (+{extendedHireDays} days)
                    </Text>
                    <Text className="!text-slate-400 text-xs">
                      +£{extendedHirePrice}
                    </Text>
                  </div>
                </Checkbox>
              </div>

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <Text className="!text-slate-400">
                    {selectedSkip.sizeLabel} x {quantity}
                  </Text>
                  <Text className="!text-slate-400 font-semibold">
                    £{selectedSkip.price * quantity}
                  </Text>
                </div>

                {extendedHire && (
                  <div className="flex justify-between items-center text-sm">
                    <Text className="!text-slate-400">
                      Extended hire (+{extendedHireDays} days)
                    </Text>
                    <Text className="!text-slate-400 font-semibold">
                      £{extendedHirePrice}
                    </Text>
                  </div>
                )}

                {/* Total */}
                <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <Text className="!text-slate-400 font-semibold">Total</Text>
                    <Text className="!text-blue-400 text-xl font-bold">
                      £{cartTotal}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                type="primary"
                size="large"
                block
                onClick={() => {
                  setIsModalOpen(false);
                  handleContinue();
                }}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 h-12 mt-4"
              >
                Continue to Next Step
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </MainLayout>
  );
};

export default SkipSelection;
