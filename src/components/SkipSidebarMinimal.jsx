import React from 'react';
import { Typography, Button, Checkbox } from "antd";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import {
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

const SkipSidebar = ({ onContinue }) => {
  const dispatch = useDispatch();
  const selectedSkip = useSelector(selectSelectedSkip);
  const quantity = useSelector(selectQuantity);
  const extendedHire = useSelector(selectExtendedHire);
  const extendedHirePrice = useSelector(selectExtendedHirePrice);
  const extendedHireDays = useSelector(selectExtendedHireDays);
  const cartTotal = useSelector(selectCartTotal);

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
    <div className="hidden md:flex w-80 bg-slate-800/50 backdrop-blur-sm border-l border-slate-700/50 flex-col fixed right-0 top-[140px] bottom-0 z-40">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Selected Skip - Minimal */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-center mb-4">
          <Text className="text-white font-semibold text-lg block">
            {selectedSkip ? selectedSkip.sizeLabel : '8 Yard Skip'}
          </Text>
          {(selectedSkip?.popular || !selectedSkip) && (
            <div className="inline-flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium mt-1">
              🔥 Popular
            </div>
          )}
        </div>

        {/* Quantity - Compact */}
        <div className="mb-4">
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

        {/* Extended Hire - Compact */}
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
      </div>

      {/* Fixed Bottom - Price Summary */}
      <div className="bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 p-4">
        {/* Price Lines */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <Text className="!text-slate-400">
              {selectedSkip ? selectedSkip.sizeLabel : '8 Yard Skip'} x {quantity}
            </Text>
            <Text className="!text-slate-400 font-semibold">
              £{selectedSkip ? selectedSkip.price * quantity : 325 * quantity}
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
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <Text className="!text-slate-400 font-semibold">Total</Text>
            <Title level={4} className="!text-slate-400 !mb-0">
              £{selectedSkip ? cartTotal : 325}
            </Title>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={onContinue}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600 h-12"
        >
          Continue to Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SkipSidebar;
