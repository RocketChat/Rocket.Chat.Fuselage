if (process.env.VERSION) {
  console.log(`fuselage-ui-kit version: ${process.env.VERSION}`);
}

export const UiKitComponent = ({ render, blocks }) => render(blocks);

export * from './surfaces/banner';
export * from './surfaces/message';
export * from './surfaces/modal';
export * from './hooks';
