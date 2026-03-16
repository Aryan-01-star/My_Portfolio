import { saveAs } from 'file-saver';

/**
 * Validates if a file at the given URL is a valid PDF
 * @param url - The URL of the PDF file to validate
 * @returns Promise<boolean> - True if valid PDF, false otherwise
 */
export const validatePDF = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob.type === 'application/pdf';
  } catch (error) {
    console.error('PDF validation failed:', error);
    return false;
  }
};

/**
 * Downloads a file from the given URL with the specified filename
 * @param url - The URL of the file to download
 * @param filename - The name to save the file as
 * @returns Promise<boolean> - True if download successful, false otherwise
 */
export const downloadFile = async (url: string, filename: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, filename);
    return true;
  } catch (error) {
    console.error('File download failed:', error);
    return false;
  }
};

/**
 * Downloads the resume PDF file
 * @returns Promise<boolean> - True if download successful, false otherwise
 */
export const downloadResume = async (): Promise<boolean> => {
  const resumePath = '/files/Aryan_Kumar_Pandey_Resume.pdf';
  const filename = 'Aryan_Kumar_Pandey_Resume.pdf';

  try {
    // Validate PDF before downloading
    const isValid = await validatePDF(resumePath);
    if (!isValid) {
      console.error('Invalid PDF file');
      return false;
    }

    // Download file
    return await downloadFile(resumePath, filename);
  } catch (error) {
    console.error('Resume download failed:', error);
    return false;
  }
};