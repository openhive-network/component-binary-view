export const isShadowRoot = (binaryViewComponent: null | HTMLElement): boolean => {
  return binaryViewComponent !== null
    && "ShadowRoot" in window
    && binaryViewComponent.parentNode !== null
    && binaryViewComponent.parentNode instanceof window.ShadowRoot
    && (binaryViewComponent.parentNode as any).host instanceof HTMLElement;
};
export const getHost = (binaryViewComponent: null | HTMLElement): HTMLElement | null => {
  if (isShadowRoot(binaryViewComponent))
    return (binaryViewComponent!.parentNode! as any).host;

  return null;
}