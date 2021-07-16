import styled from '@rocket.chat/styled';

import { sans } from '../helpers/tokenFontFamilies';

export const Wrapper = styled('div')`
  box-sizing: border-box;
  padding: 56px 16px 28px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: stretch;

  @media (min-width: 1440px) {
    flex-flow: row nowrap;
    padding-inline: 0;
    width: 100%;
    max-width: 1152px;
  }
`;

export const Aside = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-block-end: 16px;

  @media (min-width: 1440px) {
    align-items: flex-start;
    flex: 1 0 50%;
    padding-inline-end: 152px;
  }
`;

export const Content = styled('div')`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media (min-width: 1440px) {
    flex: 1 0 50%;
  }
`;

export const Logo = styled('div')`
  width: 144px;
  padding-block-end: 16px;

  @media (min-width: 768px) {
    width: 180px;
  }

  @media (min-width: 1440px) {
    padding-block-end: 32px;
  }
`;

export const Title = styled('div')`
  padding-block-end: 24px;
  font-size: ${String(40 / 16)}rem;
  font-family: ${sans};
  font-weight: 800;
  line-height: ${String(42 / 16)}rem;
  text-align: center;

  @media (min-width: 1440px) {
    text-align: start;
    font-size: ${String(52 / 16)}rem;
    line-height: ${String(62 / 16)}rem;
  }
`;

export const Subtitle = styled('div')`
  font-size: ${String(40 / 16)}rem;
  font-family: ${sans};
  line-height: ${String(42 / 16)}rem;
  text-align: center;

  @media (min-width: 1440px) {
    padding-block-end: 40px;
    text-align: start;
  }
`;

export const Description = styled('div')`
  display: none;
  font-family: ${sans};

  @media (min-width: 1440px) {
    display: unset;
  }
`;
