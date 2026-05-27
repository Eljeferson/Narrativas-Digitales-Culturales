import docx

doc_path = r"C:\Users\USER\Desktop\doc\interim-layout.docx"
doc = docx.Document(doc_path)

with open("docx_structure.txt", "w", encoding="utf-8") as f:
    f.write("=== PARAGRAPHS ===\n")
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip():
            f.write(f"P{i}: {p.text}\n")

    f.write("\n=== TABLES ===\n")
    for t_idx, table in enumerate(doc.tables):
        f.write(f"\nTable {t_idx}:\n")
        for r_idx, row in enumerate(table.rows):
            # To avoid duplicates if cells are merged, we can just print them
            cells_text = [cell.text.strip().replace('\n', ' ') for cell in row.cells]
            f.write(f"  Row {r_idx}: {cells_text}\n")
print("Done writing docx_structure.txt")
