import os


def clean_tmp():
    tmp_dir = "tmp"
    if os.path.exists(tmp_dir):
        # Remove all files in tmp, but not the folder itself
        for filename in os.listdir(tmp_dir):
            file_path = os.path.join(tmp_dir, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
        print("Temporary files removed from tmp/ directory.")
    else:
        print("tmp/ directory does not exist, nothing to clean.")


def clean_pdfs():
    pdfs_dir = "pdfs"
    if os.path.exists(pdfs_dir):
        # Remove all PDF files
        for filename in os.listdir(pdfs_dir):
            if filename.lower().endswith(".pdf"):
                file_path = os.path.join(pdfs_dir, filename)
                os.remove(file_path)
        print("All PDFs removed from pdfs/ directory.")
    else:
        print("pdfs/ directory does not exist, nothing to clean.")


if __name__ == "__main__":
    # Clean up tmp files
    clean_tmp()

    # If you also want to clean PDFs (uncomment below):
    # clean_pdfs()
