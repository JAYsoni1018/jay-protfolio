export const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank"); // fallback: at least open it
  }
};

export const getExtension = (url) => {
  const match = url?.match(/\.(\w+)(?:\?|$)/);
  return match ? match[1] : "pdf";
};

export const slugifyFilename = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
