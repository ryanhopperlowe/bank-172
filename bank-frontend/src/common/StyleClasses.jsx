import React from 'react';
import { Block } from 'baseui/block';
import { styled } from 'baseui';
import { PinCode } from 'baseui/pin-code';

export const Container = (props) => {
  return (
    <Block 
      width="80%"
      margin="auto"
    >
      {props.children}
    </Block>
  );
};

export const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const MaskedPinInput = (props) => {
  return (
    <PinCode
      overrides={{
        Input: {
          props: {
            type: 'password',
            overrides: {
              MaskToggleButton: () => props.showPin || null
            }
          }
        }
      }}
      {...props}
    />
  );
}