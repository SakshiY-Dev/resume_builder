import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportToPDF(
  elementId: string,
  filename: string = "resume.pdf"
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // Get canvas with higher resolution
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };

    const imgRatio = imgProps.width / imgProps.height;
    const pdfWidth = pageWidth;
    const pdfHeight = pageWidth / imgRatio;

    let position = 0;
    let heightLeft = pdfHeight;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    alert("Failed to export PDF. Please try again.");
  }
}
