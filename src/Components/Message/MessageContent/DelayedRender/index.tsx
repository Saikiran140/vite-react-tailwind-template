import  useDelayedRender  from '~/hooks/useDelayedRender';

const DelayedRender = ({ delay, children }) => useDelayedRender(delay)(() => children);

export default DelayedRender;
