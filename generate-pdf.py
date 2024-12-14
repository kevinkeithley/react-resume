import json
import os
import subprocess
import re
import shutil

# Setup I/Os
in_json = "test"  # JSON file in folder json-files
out_file = "test123"  # Name for final pdf

# Load JSON data
with open(f"json-files/{in_json}.json", encoding="utf-8") as f:
    data = json.load(f)


# Function to escape LaTeX special characters
def latex_escape(text):
    if not isinstance(text, str):
        return text
    conv = {
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\^{}",
        "\\": r"\textbackslash{}",
        "<": r"\textless{}",
        ">": r"\textgreater{}",
        "\n": r"\\",
    }
    regex = re.compile("|".join(re.escape(key) for key in conv.keys()))
    return regex.sub(lambda match: conv[match.group()], text)


# Begin building the LaTeX document
latex_content = r"""
\documentclass[11pt,a4paper,roman]{moderncv}
\moderncvstyle{classic}
\moderncvcolor{blue}
\usepackage[utf8]{inputenc}
\usepackage[scale=0.75]{geometry}

% Personal data
\name{{first_name}}{{last_name}}
\title{{title}}
\address{{address_1}}{{address_2}}{}
\phone[mobile]{{mobile}}
\email{{email}}
\social[github]{{github}}

\begin{document}
\makecvtitle

% Education Section
\section{Education}
{education}

% Experience Section
\section{Experience}
{experience}

\end{document}
"""

# Replace placeholders with JSON data
latex_content = latex_content.replace(
    "{{first_name}}", f"{{{latex_escape(data['personal_information']['first_name'])}}}"
)
latex_content = latex_content.replace(
    "{{last_name}}", f"{{{latex_escape(data['personal_information']['last_name'])}}}"
)
latex_content = latex_content.replace(
    "{{title}}", f"{{{latex_escape(data['personal_information']['title'])}}}"
)
latex_content = latex_content.replace(
    "{{address_1}}",
    f"{{{latex_escape(data['personal_information'].get('address_1', ''))}}}",
)
latex_content = latex_content.replace(
    "{{address_2}}",
    f"{{{latex_escape(data['personal_information'].get('address_2', ''))}}}",
)
latex_content = latex_content.replace(
    "{{mobile}}", f"{{{latex_escape(data['personal_information']['mobile'])}}}"
)
latex_content = latex_content.replace(
    "{{email}}", f"{{{latex_escape(data['personal_information']['email'])}}}"
)
latex_content = latex_content.replace(
    "{{github}}", f"{{{latex_escape(data['personal_information']['github'])}}}"
)

# Add education entries
education_entries = []
for edu in data["education"]:
    education_entries.append(
        r"\cventry{{{start_year}--{end_year}}}{{{degree}}}{{{institution}}}{{{city}}}{{{grade}}}{{{description}}}".format(
            start_year=edu["start_year"],
            end_year=edu["end_year"],
            degree=latex_escape(edu["degree"]),
            institution=latex_escape(edu["institution"]),
            city=latex_escape(edu["city"]),
            grade=latex_escape(edu["grade"]),
            description=latex_escape(edu["description"]),
        )
    )
latex_content = latex_content.replace("{education}", "\n".join(education_entries))

# Add experience entries
experience_entries = []
for exp in data["experience"]:
    # Start with the base description
    description_text = latex_escape(exp.get("description", ""))

    # Handle achievements by building an itemize block
    if "achievements" in exp and exp["achievements"]:
        achievement_items = []
        for ach in exp["achievements"]:
            if "subAchievements" in ach and ach["subAchievements"]:
                # If there are sub-achievements, nest another itemize
                sub_items = "\n".join(
                    r"\item {}".format(latex_escape(sub["text"]))
                    for sub in ach["subAchievements"]
                )
                achievement_items.append(
                    rf"\item {latex_escape(ach['text'])}\begin{itemize}\n{sub_items}\n\end{itemize}"
                )
            else:
                achievement_items.append(r"\item {}".format(latex_escape(ach["text"])))

        # Add achievements to the description
        if description_text.strip():
            description_text += r"\newline{}Detailed achievements:" + "\n"
        else:
            description_text += "Detailed achievements:\n"

        description_text += r"\begin{itemize}" + "\n"
        description_text += "\n".join(achievement_items) + "\n"
        description_text += r"\end{itemize}"

    exp_entry = r"\cventry{{{start_year}--{end_year}}}{{{job_title}}}{{{employer}}}{{{city}}}{{}}{{{description}}}".format(
        start_year=exp["start_year"],
        end_year=exp["end_year"],
        job_title=latex_escape(exp["job_title"]),
        employer=latex_escape(exp["employer"]),
        city=latex_escape(exp["city"]),
        description=description_text,
    )

    experience_entries.append(exp_entry)

latex_content = latex_content.replace("{experience}", "\n".join(experience_entries))

# Ensure directories exist
os.makedirs("tmp", exist_ok=True)
os.makedirs("pdfs", exist_ok=True)

# Write out the .tex file to tmp directory
output_tex = f"tmp/{out_file}.tex"
with open(output_tex, "w", encoding="utf-8") as f:
    f.write(latex_content)

print(f"LaTeX file written to {output_tex}")


# Run pdflatex with output in ./tmp
subprocess.run(["pdflatex", "-output-directory", "tmp", output_tex])

# Move the final PDF into the pdfs folder
shutil.move(f"tmp/{out_file}.pdf", f"pdfs/{out_file}.pdf")
