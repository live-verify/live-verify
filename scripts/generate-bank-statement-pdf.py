#!/usr/bin/env python3
"""Generate a realistic single-page bank statement PDF for Live Verify demo."""

from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=False)

# Bank name header
pdf.set_font("Helvetica", "B", 18)
pdf.cell(0, 12, "Meridian National Bank", new_x="LMARGIN", new_y="NEXT", align="C")

pdf.set_font("Helvetica", "", 12)
pdf.cell(0, 8, "Statement of Account", new_x="LMARGIN", new_y="NEXT", align="C")

pdf.ln(8)

# Account details
pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 6, "Account Holder: James R. Whitfield", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 6, "Account Number: 7294-0038-4821", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 6, "Routing Number: 091000019", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 6, "Statement Period: 1 March 2025 - 31 March 2025", new_x="LMARGIN", new_y="NEXT")

pdf.ln(6)

# Opening balance
pdf.set_font("Helvetica", "B", 10)
pdf.cell(130, 6, "Opening Balance:")
pdf.cell(0, 6, "$12,450.30", align="R", new_x="LMARGIN", new_y="NEXT")

pdf.ln(4)

# Column positions for vertical rules (drawn as PDF lines, not text)
COL1_X = 10    # left edge
COL2_X = 32    # after Date
COL3_X = 155   # before Amount
COL4_X = 200   # right edge

# Table header
pdf.set_font("Helvetica", "B", 10)
table_top = pdf.get_y()
pdf.cell(20, 7, "Date")
pdf.cell(2, 7, "")   # gap for rule
pdf.cell(108, 7, "Description")
pdf.cell(0, 7, "Amount", align="R", new_x="LMARGIN", new_y="NEXT")

# Horizontal line under header
pdf.set_draw_color(180, 180, 180)
pdf.line(COL1_X, pdf.get_y(), COL4_X, pdf.get_y())
pdf.ln(2)

# Transactions
transactions = [
    ("01/03", "Direct Deposit - Employer", "$4,200.00"),
    ("05/03", "Electric Company Payment", "-$142.50"),
    ("08/03", "Grocery Store", "-$87.23"),
    ("12/03", "Online Transfer In", "$500.00"),
    ("15/03", "Insurance Premium", "-$325.00"),
    ("18/03", "Restaurant", "-$64.80"),
    ("22/03", "ATM Withdrawal", "-$200.00"),
    ("25/03", "Subscription Service", "-$14.99"),
    ("28/03", "Gas Station", "-$52.15"),
    ("31/03", "Interest Earned", "$8.42"),
]

pdf.set_font("Helvetica", "", 10)
for date, desc, amount in transactions:
    pdf.cell(20, 6, date)
    pdf.cell(2, 6, "")   # gap for rule
    pdf.cell(108, 6, desc)
    pdf.cell(0, 6, amount, align="R", new_x="LMARGIN", new_y="NEXT")

# Horizontal line under transactions
pdf.ln(2)
table_bottom = pdf.get_y()
pdf.line(COL1_X, table_bottom, COL4_X, table_bottom)
pdf.ln(4)

# Draw vertical column rules (graphic lines — invisible to text selection)
pdf.set_draw_color(200, 200, 200)
pdf.line(COL2_X, table_top, COL2_X, table_bottom)
pdf.line(COL3_X, table_top, COL3_X, table_bottom)

# Closing balance
pdf.set_font("Helvetica", "B", 10)
pdf.cell(130, 6, "Closing Balance:")
pdf.cell(0, 6, "$16,272.05", align="R", new_x="LMARGIN", new_y="NEXT")

pdf.ln(16)

# Verify line
pdf.set_font("Courier", "", 9)
pdf.cell(0, 6, "verify:meridian-national.bank.us/statements", new_x="LMARGIN", new_y="NEXT", align="C")

# Bank footer
pdf.ln(20)
pdf.set_draw_color(180, 180, 180)
pdf.line(10, pdf.get_y(), 200, pdf.get_y())
pdf.ln(4)
pdf.set_font("Helvetica", "", 7)
pdf.set_text_color(160, 160, 160)
pdf.cell(0, 4, "Meridian National Bank  |  Member FDIC  |  Equal Housing Lender  |  NMLS #48217", new_x="LMARGIN", new_y="NEXT", align="C")
pdf.cell(0, 4, "P.O. Box 7700, Meridian, ID 83680  |  1-800-555-0199  |  meridian-national.bank.us", new_x="LMARGIN", new_y="NEXT", align="C")

import shutil

output_path = "public/examples/bank-statement.pdf"
pdf.output(output_path)
print(f"Generated: {output_path}")

# Copy to simulated-integration-tests fixtures (served by Caddy in test environment)
fixtures_copy = "simulated-integration-tests/fixtures/bank-statement.pdf"
shutil.copy2(output_path, fixtures_copy)
print(f"Copied to: {fixtures_copy}")
