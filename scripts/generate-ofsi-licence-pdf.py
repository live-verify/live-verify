#!/usr/bin/env python3
"""Generate a realistic OFSI sanctions licence PDF for Live Verify demo."""

from fpdf import FPDF
import shutil

pdf = FPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=False)

# HM Treasury / OFSI header
pdf.set_fill_color(26, 35, 126)  # dark navy
pdf.set_text_color(255, 255, 255)
pdf.rect(10, 10, 190, 22, "F")
pdf.set_font("Helvetica", "B", 14)
pdf.set_xy(15, 13)
pdf.cell(0, 8, "HM TREASURY - OFSI")
pdf.set_font("Helvetica", "", 10)
pdf.set_xy(15, 21)
pdf.cell(0, 8, "Office of Financial Sanctions Implementation")

# Reset text colour
pdf.set_text_color(0, 0, 0)
pdf.set_xy(10, 40)

# Title
pdf.set_font("Helvetica", "B", 11)
pdf.cell(0, 8, "LICENCE UNDER THE RUSSIA (SANCTIONS) (EU EXIT) REGULATIONS 2019",
         new_x="LMARGIN", new_y="NEXT")

pdf.ln(4)

# Licence details
pdf.set_font("Helvetica", "", 10)
details = [
    ("Licence Reference:", "INT/2026/1847293"),
    ("Date of Issue:", "14 March 2026"),
    ("Licence Holder:", "Albion Capital Management LLP"),
    ("Designated Person:", "[Name redacted - see restricted annex]"),
]

for label, value in details:
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(45, 6, label)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 6, value, new_x="LMARGIN", new_y="NEXT")

pdf.ln(6)

# Authorised activity box
box_y = pdf.get_y()
pdf.set_fill_color(245, 245, 255)
pdf.set_draw_color(57, 73, 171)
pdf.rect(10, box_y, 190, 36, "DF")

pdf.set_xy(15, box_y + 4)
pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 6, "Authorised Activity:")

pdf.set_xy(15, box_y + 11)
pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 6, "Payment of legal fees to Clifford Chance LLP")

pdf.set_xy(15, box_y + 18)
pdf.set_font("Helvetica", "B", 10)
pdf.cell(33, 6, "Maximum Amount: ")
pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 6, "GBP 75,000.00")

pdf.set_xy(15, box_y + 25)
pdf.set_font("Helvetica", "B", 10)
pdf.cell(16, 6, "Expiry:")
pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 6, "14 June 2026")

pdf.set_xy(10, box_y + 40)

pdf.ln(4)

# Footer notes
pdf.set_font("Helvetica", "", 9)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 5, "Subject to conditions in the attached annex.",
         new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 5, "Issued by: Financial Sanctions Officer, OFSI",
         new_x="LMARGIN", new_y="NEXT")

pdf.ln(16)

# Verify line
pdf.set_text_color(85, 85, 85)
pdf.set_font("Courier", "", 9)
pdf.cell(0, 6, "verify:ofsi.hm-treasury.gov.uk/licences",
         new_x="LMARGIN", new_y="NEXT", align="C")

# Official footer (also ensures verify line is fully selectable in Chrome)
pdf.ln(20)
pdf.set_draw_color(180, 180, 180)
pdf.line(10, pdf.get_y(), 200, pdf.get_y())
pdf.ln(4)
pdf.set_font("Helvetica", "", 7)
pdf.set_text_color(160, 160, 160)
pdf.cell(0, 4, "HM Treasury  |  Office of Financial Sanctions Implementation  |  ofsi@hmtreasury.gov.uk",
         new_x="LMARGIN", new_y="NEXT", align="C")
pdf.cell(0, 4, "1 Horse Guards Road, London SW1A 2HQ  |  gov.uk/ofsi",
         new_x="LMARGIN", new_y="NEXT", align="C")

output_path = "public/examples/ofsi-licence.pdf"
pdf.output(output_path)
print(f"Generated: {output_path}")

# Copy to simulated-integration-tests fixtures
fixtures_copy = "simulated-integration-tests/fixtures/ofsi-licence.pdf"
shutil.copy2(output_path, fixtures_copy)
print(f"Copied to: {fixtures_copy}")
