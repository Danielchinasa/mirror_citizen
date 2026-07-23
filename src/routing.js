export const basename = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

export const withBasePath = (path = "/") => {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basename}${normalizedPath}`;
};

export const absoluteAppUrl = (path = "/") => {
  return `${window.location.origin}${withBasePath(path)}`;
};
