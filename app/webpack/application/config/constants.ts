const fetchMetaAttributeByName = (name: string): string | null => {
  const element = document.querySelector(`meta[name='${name}']`);
  if (element) {
    return element.getAttribute('content') || null;
  } else {
    return null;
  }
};

export const ACTION_CABLE_URL = fetchMetaAttributeByName('action-cable-url');
export const CSRF_TOKEN = fetchMetaAttributeByName('csrf-token');
