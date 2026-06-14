import React from 'react';
import renderer from 'react-test-renderer';
import LoadingOverlay from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders nothing when not visible', () => {
    const tree = renderer.create(<LoadingOverlay visible={false} />).toJSON();
    expect(tree).toBeNull();
  });

  it('renders a spinner when visible', () => {
    const tree = renderer.create(<LoadingOverlay visible={true} />).toJSON();
    expect(tree).not.toBeNull();
  });
});
