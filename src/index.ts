import { getWhatsAppBaseUrl, urlEncodeText } from './util';

export const shareTextToWhatsApp = (text: string, number: number): void => {
  window.location.href = `${getWhatsAppBaseUrl()}?phone=${number}&text=${urlEncodeText(text)}`;
};

export const getWhatsAppClickToChatLink = (text: string): string => {
  return `${getWhatsAppBaseUrl()}?text=${urlEncodeText(text)}`;
};

export const hasNativeSharingSupport = (): boolean => {
  if (navigator.share) {
    return true;
  }
  return false;
};

interface ShareData {
  text: string;
  title?: string;
  url?: string;
}

type Fallback = () => void; // fallback function if native sharing is not supported
export const shareTextViaNativeSharing = async (data: ShareData, fallbackFunction?: Fallback): Promise<void> => {
  try {
    await navigator.share!(data);
  } catch (err) {
    if (typeof fallbackFunction === 'function') {
      fallbackFunction();
    }
  }
};
